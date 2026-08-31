import { NextResponse, type NextRequest } from "next/server";

/**
 * Route protection — fast-path middleware.
 *
 * 01-frontend-architecture.md §5.2 / 07-frontend-security.md §4.2:
 * this check is PRESENCE-ONLY, never claim-inspecting. It decides whether
 * to *attempt* rendering an authenticated route based on whether a
 * plausible session cookie exists — it never decodes or trusts the
 * cookie's contents (it cannot: the cookie is httpOnly and opaque to
 * this middleware too, by design).
 *
 * The AUTHORITATIVE check happens in `(app)/layout.tsx`'s Server
 * Component, which calls the session-verification service and redirects
 * before any protected content renders if that check fails
 * (07-frontend-security.md §12.1's layered strategy). This middleware is
 * the first, fastest, least-trusted layer only.
 *
 * Cookie name is a placeholder identifier — Sprint 1 has no backend
 * issuing this cookie yet (per this deliverable's constraints). Once the
 * real BFF/session layer lands, only this constant changes.
 */
const SESSION_COOKIE_NAME = "sakfly_session";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ONLY_PREFIXES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);

  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const isAuthOnlyRoute = AUTH_ONLY_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtectedRoute && !hasSessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthOnlyRoute && hasSessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
