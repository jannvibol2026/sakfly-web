/**
 * Safe post-login redirect handling.
 *
 * 07-frontend-security.md §12.5: the `next` parameter is validated to be a
 * same-origin, relative path only. A `next` value pointing at an external
 * origin is discarded and the default authenticated landing page is used
 * instead. This closes the open-redirect vector described there.
 */

const DEFAULT_AUTHENTICATED_PATH = "/dashboard";

export function resolveSafeNextPath(next: string | null | undefined): string {
  if (!next) return DEFAULT_AUTHENTICATED_PATH;

  // Must start with exactly one "/" (relative) and never "//" (protocol-relative,
  // which browsers treat as an external origin) or contain a scheme.
  const isRelative = next.startsWith("/") && !next.startsWith("//");
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(next);

  if (!isRelative || hasScheme) {
    return DEFAULT_AUTHENTICATED_PATH;
  }

  return next;
}

export { DEFAULT_AUTHENTICATED_PATH };
