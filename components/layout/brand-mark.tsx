import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * SAKFLY wordmark — 02-design-system.md §1.3.
 * Mark + wordmark lockup; standalone usage would substitute an SVG glyph,
 * omitted here since Sprint 1 has no supplied brand asset — the wordmark
 * alone satisfies §1.3's primary lockup requirement at this stage.
 */
export function BrandMark({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "font-display text-display-sm font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      SAKFLY
    </Link>
  );
}
