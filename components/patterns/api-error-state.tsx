import * as React from "react";
import { Button } from "@/components/ui/button";
import { resolveErrorCopy } from "@/lib/error-copy-registry";
import { cn } from "@/lib/utils";
import type { ApiErrorCode } from "@/types/api";

/**
 * ApiErrorState organism — 04-component-library.md §15.1.
 *
 * The single component consuming the centralized error-copy lookup
 * (lib/error-copy-registry.ts). No consuming page ever passes its own
 * icon/color/copy for a known error code — this is the mechanical
 * enforcement point for the non-conflation rule between
 * DAILY_QUOTA_EXCEEDED / MONTHLY_QUOTA_EXCEEDED / INSUFFICIENT_CREDITS
 * (01-frontend-architecture.md §6.2, 02-design-system.md §16.1).
 *
 * Replaces the form entirely (never layered as a toast over it), per
 * 01-frontend-architecture.md §6.2.
 */
export interface ApiErrorStateProps {
  code: ApiErrorCode;
  /** Interpolated into the copy template — e.g. { feature: "Chat", limit: 100 }. */
  interpolations?: Record<string, string | number>;
  onRetry?: () => void;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  className?: string;
}

function interpolate(template: string, values: Record<string, string | number> = {}) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function ApiErrorState({
  code,
  interpolations,
  onRetry,
  onPrimaryAction,
  primaryActionLabel,
  className,
}: ApiErrorStateProps) {
  const entry = resolveErrorCopy(code);
  const Icon = entry.icon;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex flex-col gap-3 rounded-md border p-6",
        entry.variant === "warning" && "border-warning/30 bg-warning-subtle",
        entry.variant === "danger" && "border-danger/30 bg-danger-subtle",
        entry.variant === "info" && "border-info/30 bg-info-subtle",
        className,
      )}
    >
      <div className="flex gap-3">
        <Icon
          className={cn(
            "mt-0.5 size-6 shrink-0",
            entry.variant === "warning" && "text-warning",
            entry.variant === "danger" && "text-danger",
            entry.variant === "info" && "text-info",
          )}
          aria-hidden="true"
        />
        <div className="flex flex-col gap-1">
          <p className="text-body font-semibold text-foreground">{entry.title}</p>
          <p className="text-body-sm text-muted-foreground">
            {interpolate(entry.bodyTemplate, interpolations)}
          </p>
        </div>
      </div>
      {(onRetry || onPrimaryAction) && (
        <div className="flex gap-3 pl-9">
          {onPrimaryAction && entry.primaryAction !== "none" && (
            <Button size="sm" onClick={onPrimaryAction}>
              {primaryActionLabel ?? "Continue"}
            </Button>
          )}
          {onRetry && entry.primaryAction === "retry" && (
            <Button size="sm" variant="secondary" onClick={onRetry}>
              Try again
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
