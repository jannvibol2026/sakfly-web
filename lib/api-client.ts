import "server-only";
import { env } from "@/lib/env";
import { ApiError, type ApiErrorEnvelope, type ApiSuccessEnvelope } from "@/types/api";

/**
 * Server-only fetch wrapper for `api.sakfly.com`.
 *
 * Per 01-frontend-architecture.md §1.5/§5.1 and 07-frontend-security.md
 * §11.2, this module is called only from Server Components and the BFF
 * route handler (`app/api/bff/[...path]/route.ts`) — never imported into
 * a Client Component. It performs no business logic of its own; it is a
 * transport detail that attaches the verified session's bearer token
 * (read from the httpOnly cookie by its caller) and forwards the request.
 *
 * Sprint 1 has no live backend to call (per this deliverable's explicit
 * "No backend implementation" constraint). This client is provided so the
 * transport contract is fully typed and ready — Sprint 2+ wires real
 * calls through it without changing any consuming code. No fetch call in
 * this file is exercised by Sprint 1's UI; the auth feature's placeholder
 * services (features/auth/services) intentionally do not call this yet.
 */

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  accessToken?: string;
  idempotencyKey?: string;
  signal?: AbortSignal;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!env.apiBaseUrl) {
    // Honest failure per lib/errors.ts's rationale — never fabricate a
    // successful response when there is nothing to call.
    throw new ApiError(
      {
        code: "CONFIG_ERROR",
        message: "API_BASE_URL is not configured for this environment.",
        requestId: "local-dev-no-backend",
      },
      503,
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }
  if (options.idempotencyKey) {
    headers["Idempotency-Key"] = options.idempotencyKey;
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  const json = (await response.json().catch(() => null)) as
    | ApiSuccessEnvelope<T>
    | ApiErrorEnvelope
    | null;

  if (!response.ok || !json || "error" in json) {
    const errorBody = json && "error" in json ? json.error : null;
    throw new ApiError(
      errorBody ?? {
        code: "CONFIG_ERROR",
        message: "An unexpected error occurred.",
        requestId: "unknown",
      },
      response.status,
    );
  }

  return json.data;
}
