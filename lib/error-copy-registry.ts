import type { LucideIcon } from "lucide-react";
import {
  AlertOctagon,
  AlertTriangle,
  CalendarClock,
  Clock,
  Info,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import type { ApiErrorCode } from "@/types/api";

/**
 * The single, centralized lookup every `ApiErrorState`-consuming component
 * reads from — no component is permitted to author its own copy/icon for
 * these codes (04-component-library.md §15.1).
 *
 * This is the mechanical enforcement point for the platform's most
 * important UX rule: DAILY_QUOTA_EXCEEDED and MONTHLY_QUOTA_EXCEEDED must
 * never share an icon or a default action (02-database-schema.v4.md §6.1,
 * 02-design-system.md §16.1, 05-user-flows-ui.md §41.1/§43).
 */

export type ErrorAction = "retry" | "upgrade" | "topup" | "wait" | "none";

export interface ErrorCopyEntry {
  icon: LucideIcon;
  variant: "warning" | "danger" | "info";
  title: string;
  /** `{feature}`, `{limit}`, `{resetsAtLocal}` are interpolated by the
   * consuming component from the error's `details` payload — this
   * registry only owns the copy template, never live data. */
  bodyTemplate: string;
  primaryAction: ErrorAction;
}

export const errorCopyRegistry: Partial<Record<ApiErrorCode, ErrorCopyEntry>> = {
  DAILY_QUOTA_EXCEEDED: {
    icon: Clock,
    variant: "warning",
    title: "Daily limit reached",
    bodyTemplate:
      "You've used today's {feature} allowance ({limit}/day). Resets {resetsAtLocal}.",
    primaryAction: "wait",
  },
  MONTHLY_QUOTA_EXCEEDED: {
    icon: CalendarClock,
    variant: "danger",
    title: "Monthly limit reached",
    bodyTemplate:
      "You've reached this month's {feature} limit ({limit}/month). Waiting until tomorrow will not help — this resets on the 1st ({resetsAtLocal}).",
    primaryAction: "upgrade",
  },
  INSUFFICIENT_CREDITS: {
    icon: Wallet,
    variant: "danger",
    title: "Not enough credits",
    bodyTemplate: "Not enough credits ({balance} available, {required} needed).",
    primaryAction: "topup",
  },
  FEATURE_DISABLED: {
    icon: Info,
    variant: "info",
    title: "Temporarily unavailable",
    bodyTemplate: "{feature} is temporarily unavailable.",
    primaryAction: "none",
  },
  MODERATION_BLOCKED: {
    icon: ShieldAlert,
    variant: "warning",
    title: "This request couldn't be completed",
    bodyTemplate: "This request couldn't be completed. Your credits were not charged.",
    primaryAction: "retry",
  },
  PROVIDER_ERROR: {
    icon: AlertTriangle,
    variant: "danger",
    title: "Generation failed",
    bodyTemplate: "Generation failed — your credits were not charged. Try again.",
    primaryAction: "retry",
  },
  PROVIDER_TIMEOUT: {
    icon: AlertTriangle,
    variant: "danger",
    title: "Generation failed",
    bodyTemplate: "Generation failed — your credits were not charged. Try again.",
    primaryAction: "retry",
  },
  DUPLICATE_OPEN_REQUEST: {
    icon: AlertOctagon,
    variant: "info",
    title: "Request already pending",
    bodyTemplate: "You already have a pending request. Please wait for admin review.",
    primaryAction: "none",
  },
  RATE_LIMITED: {
    icon: Clock,
    variant: "warning",
    title: "Too many requests",
    bodyTemplate: "Too many requests — please wait {retryAfterSeconds}s.",
    primaryAction: "wait",
  },
};

export const genericErrorCopy: ErrorCopyEntry = {
  icon: AlertTriangle,
  variant: "danger",
  title: "Something went wrong",
  bodyTemplate: "Something went wrong. We've been notified.",
  primaryAction: "retry",
};

export function resolveErrorCopy(code: ApiErrorCode): ErrorCopyEntry {
  return errorCopyRegistry[code] ?? genericErrorCopy;
}
