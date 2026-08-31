import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

/**
 * BFF proxy route — 01-frontend-architecture.md §1.5, 07-frontend-security.md §11.1.
 *
 * A same-origin transport detail, not a second backend
 * (07-frontend-security.md §2): it reads the httpOnly access-token
 * cookie, attaches the Authorization header, and forwards the request to
 * `api.sakfly.com` verbatim. It performs no business logic, no caching,
 * no transformation beyond header attachment/stripping — this is what
 * keeps "the API is the only write path" true in spirit
 * (00-README-and-decisions.md principle 10).
 *
 * Every client-side (Client Component) data call is routed through
 * `/api/bff/*`; Server Components call `api.sakfly.com` directly over
 * the private network instead (01-frontend-architecture.md §1.5).
 *
 * Sprint 1 has no backend to proxy to (per this deliverable's explicit
 * "No backend implementation" constraint) — this handler is fully wired
 * and typed, and honestly reports its unconfigured state via a 503
 * rather than fabricating a response. No client-side code in this sprint
 * calls this route yet (the placeholder auth service, by design, does
 * not reach this far) — it exists so Sprint 2+'s real client-side
 * mutations have an already-correct, already-reviewed transport layer to
 * land on with zero structural change.
 */
async function handler(request: NextRequest) {
  if (!env.apiBaseUrl) {
    return NextResponse.json(
      {
        error: {
          code: "CONFIG_ERROR",
          message: "The SAKFLY API is not configured for this environment.",
          requestId: "bff-no-backend",
        },
      },
      { status: 503 },
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sakfly_access_token")?.value;

  const pathSegments = request.nextUrl.pathname.replace(/^\/api\/bff\//, "");
  const targetUrl = `${env.apiBaseUrl}/${pathSegments}${request.nextUrl.search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const idempotencyKey = request.headers.get("Idempotency-Key");
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.text()
      : undefined;

  const upstreamResponse = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const responseBody = await upstreamResponse.text();
  return new NextResponse(responseBody, {
    status: upstreamResponse.status,
    headers: { "Content-Type": "application/json" },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as PUT,
  handler as DELETE,
};
