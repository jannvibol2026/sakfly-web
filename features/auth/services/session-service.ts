import "server-only";
import { cookies } from "next/headers";
import { ApiError } from "@/types/api";
import type { CurrentUserResponse } from "@/types/user";

/**
 * Server-only session resolution — the authoritative check.
 *
 * 01-frontend-architecture.md §5.2 / 07-frontend-security.md §12.1:
 * called exclusively from `(app)/layout.tsx` (a Server Component) to
 * decide whether protected content may render, BEFORE any protected DOM
 * is committed. This is layer 2 of the three-layer protected-route
 * strategy (fast middleware presence-check -> this authoritative
 * check -> per-request server re-validation on every subsequent call).
 *
 * Sprint 1 ships no backend, so this always resolves to "no valid
 * session" — which is the correct, fail-closed behavior
 * (07-frontend-security.md §1.3), not a workaround. The moment a real
 * `api.sakfly.com` exists, this function's body becomes a call through
 * `lib/api-client.ts`'s `apiRequest<CurrentUserResponse>("/users/me", {
 * accessToken })`, reading the token from the httpOnly cookie exactly as
 * planned — no consuming layout/page changes.
 */
export async function getVerifiedSession(): Promise<CurrentUserResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sakfly_access_token")?.value;

  if (!accessToken) {
    throw new ApiError(
      { code: "UNAUTHORIZED", message: "No active session.", requestId: "no-session" },
      401,
    );
  }

  // Backend not yet connected in this build — fail closed rather than
  // fabricate a session (lib/errors.ts's rationale, applied to auth).
  throw new ApiError(
    {
      code: "UNAUTHORIZED",
      message: "Session verification is not available in this build.",
      requestId: "local-dev-no-backend",
    },
    401,
  );
}
