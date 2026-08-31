import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AlertBanner organism — 02-design-system.md §16.1/§17.2,
 * 04-component-library.md §12.2.
 *
 * Inline, non-corner-anchored, never auto-dismisses. Used for form-level
 * errors and any always-explicitly-placed notice. Icon + color are always
 * paired with text (never color alone), per 02-design-system.md §2.4's
 * non-conflation rule and 04-component-library.md §11.3.
 */
const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  info: Info,
} as const;

export interface AlertBannerProps {
  variant: "success" | "warning" | "danger" | "info";
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function AlertBanner({
  variant,
  title,
  description,
  action,
  className,
}: AlertBannerProps) {
  const Icon = icons[variant];
  return (
    <div
      role={variant === "danger" || variant === "warning" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "flex gap-3 rounded-md border p-4",
        variant === "success" && "border-success/30 bg-success-subtle",
        variant === "warning" && "border-warning/30 bg-warning-subtle",
        variant === "danger" && "border-danger/30 bg-danger-subtle",
        variant === "info" && "border-info/30 bg-info-subtle",
        className,
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-5 shrink-0",
          variant === "success" && "text-success",
          variant === "warning" && "text-warning",
          variant === "danger" && "text-danger",
          variant === "info" && "text-info",
        )}
        aria-hidden="true"
      />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-body font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-body-sm text-muted-foreground">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
