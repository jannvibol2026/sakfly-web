/**
 * Centralized React Query key factory.
 *
 * 01-frontend-architecture.md §4.3: all query keys are centralized here as
 * a typed factory — no ad hoc array literals in feature code — so
 * invalidation can never miss a key due to a typo. Sprint 1 ships only the
 * keys needed for the auth/session surfaces; later sprints extend this
 * file, they never bypass it.
 */
export const queryKeys = {
  me: () => ["me"] as const,
  subscription: () => ["subscription"] as const,
} as const;
