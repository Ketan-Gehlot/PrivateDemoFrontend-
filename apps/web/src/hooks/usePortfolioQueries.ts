import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { portfolioApi } from "@/services/api";
import type { HarvestSelection } from "@/types/api";

export const queryKeys = {
  holdings: ["holdings"] as const,
  capitalGains: ["capital-gains"] as const,
  dashboard: (selected: string[]) => ["dashboard", selected] as const,
  charts: ["charts"] as const,
  harvest: (selected: HarvestSelection[]) => ["harvest", selected] as const,
  searchCoins: (query: string) => ["market-search", query] as const
};

export const useHoldings = () =>
  useQuery({
    queryKey: queryKeys.holdings,
    queryFn: portfolioApi.holdings
  });

export const useCapitalGains = () =>
  useQuery({
    queryKey: queryKeys.capitalGains,
    queryFn: portfolioApi.capitalGains
  });

export const useDashboard = (selected: string[] = []) =>
  useQuery({
    queryKey: queryKeys.dashboard(selected),
    queryFn: () => portfolioApi.dashboard(selected)
  });

export const useCharts = () =>
  useQuery({
    queryKey: queryKeys.charts,
    queryFn: portfolioApi.charts
  });

export const useHarvestPreview = (selected: HarvestSelection[]) =>
  useQuery({
    queryKey: queryKeys.harvest(selected),
    queryFn: () => portfolioApi.calculateHarvest(selected),
    enabled: selected.length > 0,
    staleTime: 15_000
  });

export const useAddHolding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: portfolioApi.addHolding,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.holdings }),
        queryClient.invalidateQueries({ queryKey: queryKeys.capitalGains }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: queryKeys.charts })
      ]);
      toast.success("Holding imported");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Could not import holding");
    }
  });
};

export const useCoinSearch = (query: string) =>
  useQuery({
    queryKey: queryKeys.searchCoins(query),
    queryFn: () => portfolioApi.searchCoins(query),
    enabled: query.trim().length >= 2,
    staleTime: 5 * 60_000
  });
