"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
      mutations: {
        // Disable retries for mutations by default
        retry: 0,
      },
    },
  }));
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
