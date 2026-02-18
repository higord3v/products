"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";
import {
  type AuthStore,
  type AuthState,
  createAuthStore,
  defaultInitState,
} from "@/store/authStore";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined,
);

export interface AuthStoreProviderProps {
  children: ReactNode;
  initialState?: AuthState;
}

export const AuthStoreProvider = ({
  children,
  initialState,
}: AuthStoreProviderProps) => {
  const [store] = useState(() =>
    createAuthStore(initialState ?? defaultInitState),
  );

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error("useAuthStore must be used within AuthStoreProvider");
  }

  return useStore(authStoreContext, selector);
};
