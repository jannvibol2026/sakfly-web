import type { FeatureLimit } from "@/features/marketing/plans-data";

/**
 * Renders one feature's daily AND monthly limit as two distinct figures —
 * never merged into one number (02-design-system.md §2.4/§9.3,
 * 03-pages-and-layouts.md §1.2's non-negotiable dual-limit display).
 */
export function PlanLimitRow({
  limit,
  daysAtMaxDailyUse,
}: {
  limit: FeatureLimit;
  daysAtMaxDailyUse: number | null | undefined;
}) {
  const isUnavailable = limit.daily === 0 && limit.monthly === 0;

  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-2 last:border-b-0">
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-foreground">{limit.label}</span>
        {isUnavailable ? (
          <span className="text-body-sm text-muted-foreground-subtle">Not included</span>
        ) : (
          <span className="font-mono font-tabular text-body-sm text-foreground">
            {limit.daily}/day · {limit.monthly}/mo
          </span>
        )}
      </div>
      {daysAtMaxDailyUse != null && !isUnavailable && (
        <p className="text-caption text-muted-foreground">
          {daysAtMaxDailyUse} days of max daily use per month
        </p>
      )}
    </div>
  );
}
