"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./signIn";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignIn />
    </QueryClientProvider>
  );
}
