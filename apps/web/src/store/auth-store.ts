import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/api";

type AuthState = {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "mock-token",
      user: {
        id: "mock-user-1",
        email: "demo@koinx.com",
        name: "Demo User",
        preferredCurrency: "INR",
        decimalPrecision: 2
      },
      setSession: (token, user) => set({ token, user }),
      setUser: (user) => set({ user }),
      logout: () => {}
    }),
    {
      name: "koinx-auth"
    }
  )
);
