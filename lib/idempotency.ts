/**
 * Idempotency-key generation.
 *
 * 01-frontend-architecture.md §4.4 / 07-frontend-security.md §22.4: every
 * mutating, credit-affecting request carries a fresh key per logical
 * submission (never per render, never reused across a genuinely new
 * submission). Uses the standard Web Crypto UUID generator — no custom
 * ID scheme, no dependency on anything token-derived.
 */
export function createIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Extremely defensive fallback for non-standard runtimes; not expected
  // to be exercised in any supported browser (06-responsive-design.md §42).
  return `idk_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
