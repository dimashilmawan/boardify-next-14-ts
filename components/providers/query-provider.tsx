"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

////////////////////////////////////
// works
// const queryClient = new QueryClient({
//   defaultOptions: { queries: { staleTime: 60 * 1000 } },
// });

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  /////////////////////////////////////////
  // not works
  // const queryClient = new QueryClient({
  //   defaultOptions: { queries: { staleTime: 60 * 1000 } },
  // });

  // works
  ///////////////////////////////////
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
