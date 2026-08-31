"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth-service";
import type { LoginFormValues } from "@/features/auth/schemas/login-schema";

/**
 * 01-frontend-architecture.md §4.4: every credit/session-affecting
 * mutation goes through a mutation hook, never a raw fetch inside a
 * component. `retry: false` is inherited from the QueryClient default
 * (providers/query-provider.tsx) — a login failure is never blindly
 * retried by the client.
 */
export function useLogin() {
  return useMutation({
    mutationFn: (values: LoginFormValues) => authService.login(values),
  });
}
