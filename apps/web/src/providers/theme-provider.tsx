import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { usePreferencesStore } from "@/store/preferences-store";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = usePreferencesStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && systemDark);

    root.classList.toggle("dark", isDark);
  }, [theme]);

  return children;
};
