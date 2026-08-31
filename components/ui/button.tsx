import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Button primitive — 02-design-system.md §7 / 04-component-library.md §4.
 *
 * A single component with a `variant`/`size` prop, never separate
 * components per variant (04-component-library.md §1 Principle 6). Every
 * variant token below is sourced from the Tailwind theme extension in
 * tailwind.config.ts, itself sourced from the design system.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-body font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        "primary-gradient":
          "bg-gradient-brand text-white hover:opacity-90 active:opacity-95",
        secondary:
          "bg-surface-raised border border-border-strong text-foreground hover:bg-surface",
        ghost: "text-foreground hover:bg-surface",
        outline: "border border-border-strong text-foreground hover:bg-surface",
        destructive: "bg-danger text-white hover:opacity-90 active:opacity-95",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-10 px-4",
        lg: "h-12 px-5 text-body-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** 04-component-library.md §4.3 — retains label text, sets aria-busy. */
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    // Radix `Slot` requires exactly one child element. When `asChild` is
    // used (e.g. wrapping a `Link`), the icon/loading decoration is
    // skipped and `children` is passed through as the sole child —
    // `asChild` usage in this system always wraps a single interactive
    // element that owns its own content.
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          leadingIcon
        )}
        {children}
        {!isLoading && trailingIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
