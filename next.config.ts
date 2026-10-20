import type { NextConfig } from "next";

/**
 * SAKFLY — Next.js configuration.
 *
 * Security headers (07-frontend-security.md §26–28):
 * - Content-Security-Policy: restricts script sources, disallows framing.
 *   'unsafe-inline' is required in script-src for the Next.js App Router
 *   inline hydration scripts (self.__next_f.push RSC payload and bootstrap)
 *   and the next-themes inline theme script. Without it the browser blocks
 *   them and hydration fails, leaving a blank page. A nonce-based CSP set
 *   via middleware can replace 'unsafe-inline' later.
 * - X-Frame-Options: DENY — clickjacking prevention (§28).
 * - Referrer-Policy / X-Content-Type-Options: standard hardening.
 *
 * These headers are frontend-delivery configuration only — no backend
 * behavior is implemented here.
 */
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
