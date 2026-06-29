import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

type PreferencesState = {
  theme: ThemeMode;
  language: string;
  notifications: boolean;
  lastViewedPage: string;
  filters: Record<string, string>;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
  setLastViewedPage: (page: string) => void;
  setFilter: (key: string, value: string) => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "system",
      language: "en",
      notifications: true,
      lastViewedPage: "/dashboard",
      filters: {},
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setNotifications: (notifications) => set({ notifications }),
      setLastViewedPage: (lastViewedPage) => set({ lastViewedPage }),
      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value
          }
        }))
    }),
    {
      name: "koinx-preferences"
    }
  )
);
