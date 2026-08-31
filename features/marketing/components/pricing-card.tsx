import Link from "next/link";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanLimitRow } from "@/features/marketing/components/plan-limit-row";
import type { PlanDefinition } from "@/features/marketing/plans-data";
import { cn } from "@/lib/utils";

/**
 * Pricing Card — 04-component-library.md §7 (Pricing Card variant),
 * 03-pages-and-layouts.md §1.2. Pro+ uses the gradient plan-badge
 * treatment (02-design-system.md §2.7) and a subtle elevation lift.
 */
export function PricingCard({ plan }: { plan: PlanDefinition }) {
  const isProPlus = plan.code === "pro_plus";

  return (
    <Card
      className={cn(
        "flex flex-col",
        isProPlus && "border-primary shadow-elevation-2 ring-1 ring-primary/20",
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{plan.name}</CardTitle>
          {isProPlus && (
            <span className="rounded-full bg-gradient-brand px-2.5 py-0.5 text-caption font-semibold text-white">
              Popular
            </span>
          )}
        </div>
        <p className="font-mono font-tabular text-metric-lg text-foreground">
          {plan.isCustom
            ? "Custom"
            : plan.priceCents === 0
              ? "$0"
              : `$${(plan.priceCents! / 100).toFixed(0)}`}
          {!plan.isCustom && plan.priceCents !== 0 && (
            <span className="text-body text-muted-foreground">/mo</span>
          )}
        </p>
        <p className="text-body-sm text-muted-foreground">
          {plan.isCustom
            ? "Negotiated limits for your organization."
            : `${plan.monthlyCreditGrant.toLocaleString()} credits granted monthly`}
        </p>
      </CardHeader>
      <CardBody className="flex-1">
        {plan.isCustom ? (
          <p className="text-body-sm text-muted-foreground">
            Contact us for custom daily/monthly limits across all four AI features.
          </p>
        ) : (
          <div className="flex flex-col">
            {plan.limits.map((limit) => (
              <PlanLimitRow
                key={limit.featureKey}
                limit={limit}
                daysAtMaxDailyUse={plan.daysAtMaxDailyUse[limit.featureKey]}
              />
            ))}
          </div>
        )}
      </CardBody>
      <CardFooter className="justify-stretch">
        <Button
          asChild
          variant={isProPlus ? "primary-gradient" : "primary"}
          className="w-full"
        >
          <Link href={plan.isCustom ? "/contact" : "/register"}>
            {plan.isCustom ? "Contact us" : "Get Started"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
