import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * EmptyState organism — 02-design-system.md §15.1, 04-component-library.md §14.1.
 * Configured per use via props; the catalogue's per-page copy lives in
 * each consuming page, never hardcoded here.
 */
export interface EmptyStateProps {
  icon: LucideIcon;
  heading: string;
  body: string;
  action?: React.ReactNode;
  /** 02-design-system.md §15.3 — locked/unavailable variant uses a
   * desaturated icon treatment, distinct from the "just empty" default. */
  variant?: "empty" | "locked";
  className?: string;
}

export function EmptyState({
  icon: Icon,
  heading,
  body,
  action,
  variant = "empty",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 py-10 text-center sm:py-12 lg:py-16",
        className,
      )}
    >
      <Icon
        className={cn(
          "size-8 text-muted-foreground",
          variant === "locked" && "opacity-40",
        )}
        aria-hidden="true"
      />
      <h3 className="text-display-sm text-foreground">{heading}</h3>
      <p className="max-w-sm text-body text-muted-foreground">{body}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
