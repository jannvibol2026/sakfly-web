"use client";

import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ApiError } from "@/types/api";

/**
 * React Query client configuration.
 *
 * 01-frontend-architecture.md §4.2: `staleTime: 0` as the default is
 * intentional — server truth (balance, quota, plan) is fetched fresh on
 * mount, mechanically enforcing "entitlement is always re-resolved live"
 * (07-frontend-security.md §1.2) at the client layer. Mutations never
 * retry automatically (07-frontend-security.md §21's "no mutation is
 * ever retried blindly").
 *
 * A 401 is never retried by React Query's own retry logic — session
 * recovery is handled once, explicitly, by the BFF layer
 * (01-frontend-architecture.md §5.1), not by a generic retry policy that
 * could obscure how many attempts actually happened.
 */
function isRetryableError(error: unknown): boolean {
  if (!(error instanceof ApiError)) return true;
  const nonRetryableCodes = new Set([
    "UNAUTHORIZED",
    "FORBIDDEN",
    "NOT_FOUND",
    "VALIDATION_ERROR",
    "INVALID_CREDENTIALS",
  ]);
  return !nonRetryableCodes.has(error.code);
}

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: true,
        retry: (failureCount, error) =>
          isRetryableError(error) && failureCount < 2,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (isServer) {
    // Server: always make a new query client.
    return createQueryClient();
  }
  // Browser: reuse a single instance across renders.
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
