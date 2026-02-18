import { UserData } from "@/types";
import { createStore } from "zustand/vanilla";

export interface AuthState {
  token: string | null;
  user: UserData | null;
}

export interface AuthActions {
  setAuth: (token: string, user: UserData) => void;
}

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  token: null,
  user: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setAuth: (token: string, user: UserData) => set({ token, user }),
  }));
};
