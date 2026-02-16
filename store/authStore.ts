import { UserData } from "@/types";
import { create } from "zustand";

export interface AuthStore {
  token: string | null;
  user: UserData | null;
  setAuth: (token: string, user: UserData) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  setAuth: (token: string, user: UserData) => set({ token, user }),
}));
