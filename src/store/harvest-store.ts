import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HarvestSelection, Holding } from "@/types/api";

type HarvestState = {
  selected: Record<string, HarvestSelection>;
  toggleHolding: (holding: Holding, checked?: boolean) => void;
  setSellQuantity: (holdingId: string, sellQuantity: number) => void;
  setSelections: (holdings: Holding[]) => void;
  clearSelection: () => void;
};

export const useHarvestStore = create<HarvestState>()(
  persist(
    (set, get) => ({
      selected: {},
      toggleHolding: (holding, checked) => {
        const selected = { ...get().selected };
        const shouldSelect = checked ?? !selected[holding.id];

        if (shouldSelect) {
          selected[holding.id] = {
            holdingId: holding.id,
            sellQuantity: selected[holding.id]?.sellQuantity ?? holding.totalHolding
          };
        } else {
          delete selected[holding.id];
        }

        set({ selected });
      },
      setSellQuantity: (holdingId, sellQuantity) =>
        set((state) => ({
          selected: {
            ...state.selected,
            [holdingId]: {
              holdingId,
              sellQuantity
            }
          }
        })),
      setSelections: (holdings) => {
        const selected = holdings.reduce<Record<string, HarvestSelection>>((acc, holding) => {
          acc[holding.id] = {
            holdingId: holding.id,
            sellQuantity: holding.totalHolding
          };
          return acc;
        }, {});
        set({ selected });
      },
      clearSelection: () => set({ selected: {} })
    }),
    {
      name: "koinx-selected-holdings"
    }
  )
);

export const selectedArray = (selected: Record<string, HarvestSelection>) => Object.values(selected);
