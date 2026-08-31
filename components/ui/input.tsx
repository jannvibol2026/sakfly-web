import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Text input primitive — 02-design-system.md §8.1.
 * States (default/hover/focus/error/disabled) are handled via standard
 * pseudo-classes plus an explicit `aria-invalid`-driven error style.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={hasError || undefined}
        className={cn(
          "flex h-10 w-full rounded-sm border border-border-strong bg-surface-raised px-3 py-2.5 text-body text-foreground placeholder:text-muted-foreground-subtle transition-colors",
          "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          hasError && "border-danger bg-danger-subtle/40 focus-visible:border-danger focus-visible:ring-danger/20",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
