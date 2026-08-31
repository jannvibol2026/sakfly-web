/**
 * Centralized environment access.
 *
 * Per 07-frontend-security.md §11.1 and 01-frontend-architecture.md §1.5,
 * the browser never talks to `api.sakfly.com` directly — every client-side
 * call goes through this app's own same-origin BFF route. `API_BASE_URL`
 * is therefore a **server-only** variable (never `NEXT_PUBLIC_*`), read
 * only inside the BFF route handler and Server Components.
 *
 * Sprint 1 ships with no backend yet (per this deliverable's constraints),
 * so `API_BASE_URL` is intentionally allowed to be unset — see
 * `lib/api-client.ts` for how that absence is surfaced honestly rather
 * than papered over with mock data.
 */

export const env = {
  /** Server-only. Base URL of `api.sakfly.com`. Unset in Sprint 1. */
  apiBaseUrl: process.env.API_BASE_URL ?? "",

  /** Public. Used only for canonical URL / metadata generation. */
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  isProduction: process.env.NODE_ENV === "production",
} as const;
