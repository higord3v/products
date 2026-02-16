"use client";

import { useAuthStore } from "@/store/authStore";
import { UserData } from "@/types";
import { useEffect, useRef } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
  initialState: {
    token: string | null;
    user: UserData | null;
  };
};

export default function AuthProvider({
  children,
  initialState,
}: AuthProviderProps) {
  useEffect(() => {
    useAuthStore.setState(initialState);
  }, [initialState]);

  return <>{children}</>;
}
