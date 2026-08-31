import { Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * CreditBalancePill molecule — 02-design-system.md §2.4/§9.3,
 * 04-component-library.md §16.3.
 *
 * Structurally distinct from DualLimitBar: this component has no `limit`
 * prop at all, so a cap figure can never be passed here by mistake
 * (04-component-library.md §1 Principle 5's type-level non-conflation
 * guarantee). It never computes or estimates its own value — `balance` is
 * always the most recent server-confirmed figure the caller supplies.
 *
 * Sprint 1 has no live balance source (no backend); the Dashboard shell
 * renders this in its `isLoading` state until a real fetch exists.
 */
export interface CreditBalancePillProps {
  balance?: number;
  isLoading?: boolean;
  className?: string;
}

export function CreditBalancePill({ balance, isLoading, className }: CreditBalancePillProps) {
  if (isLoading || balance === undefined) {
    return (
      <div className={cn("flex items-center gap-2 rounded-full bg-surface px-3 py-1.5", className)}>
        <Wallet className="size-4 text-muted-foreground" aria-hidden="true" />
        <Skeleton variant="text" className="w-10" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full bg-surface px-3 py-1.5",
        className,
      )}
    >
      <Wallet className="size-4 text-muted-foreground" aria-hidden="true" />
      <span className="font-mono font-tabular text-body-sm font-medium text-foreground">
        {balance.toLocaleString()}
      </span>
      <span className="hidden text-body-sm text-muted-foreground sm:inline">credits</span>
    </div>
  );
}
