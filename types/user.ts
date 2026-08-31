/**
 * Core user/entitlement types.
 *
 * These shapes mirror the API contracts already fixed upstream
 * (04-api-specification.md — referenced transitively via
 * 01-frontend-architecture.md) and the plan/role vocabulary locked in
 * 00-README-and-decisions.md §5 and 01-requirements.md §4.
 *
 * No business logic lives here — these are data contracts only.
 */

export type PlanCode = "free" | "pro" | "pro_plus" | "enterprise";

/**
 * Mirrors `subscriptions.status` exactly (02-database-schema.v4.md §5).
 * The client never infers entitlement from `planCode` alone — always from
 * this status, resolved server-side (01-frontend-architecture.md §5.1's
 * effective-entitlement rule, restated for the type layer).
 */
export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "paused"
  | "pending_approval"
  | "canceled"
  | "incomplete"
  | "expired";

export interface Plan {
  code: PlanCode;
  name: string;
  isCustom: boolean;
}

export interface Subscription {
  planCode: PlanCode;
  /** The plan the account is actually entitled to right now — never the
   * requested plan while `pending_approval` (03-pages-and-layouts.md §10.1). */
  effectivePlanCode: PlanCode;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  graceEndsAt: string | null;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

/**
 * The minimal, presentation-only session shape the frontend ever holds.
 * Per 07-frontend-security.md §4.1 this is always re-derived from the most
 * recent server response — never cached as a long-lived source of truth
 * for an authorization decision.
 */
export interface CurrentUserResponse {
  user: AuthenticatedUser;
  subscription: Subscription;
}
