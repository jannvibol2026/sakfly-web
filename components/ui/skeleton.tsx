import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton primitive — 02-design-system.md §14.1.
 * Shape-matched rectangles/circles only — never placeholder Latin text.
 * Uses a static opacity pulse (motion-safe respects prefers-reduced-motion
 * automatically via Tailwind's `motion-safe:` variant, §20.5).
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect";
}

function Skeleton({ className, variant = "rect", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "motion-safe:animate-pulse bg-surface",
        variant === "circle" && "rounded-full",
        variant === "text" && "rounded-xs h-4",
        variant === "rect" && "rounded-sm",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export { Skeleton };
