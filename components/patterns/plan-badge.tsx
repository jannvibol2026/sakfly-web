import type { PlanCode } from "@/types/user";
import { cn } from "@/lib/utils";

/**
 * PlanBadge molecule — 02-design-system.md §2.7/§11.1.
 * Fixed mapping, no `variant` prop — appearance is entirely determined by
 * `plan`, so no call site can accidentally opt a different badge into the
 * Pro+ gradient treatment (04-component-library.md §11.1).
 */
const planLabels: Record<PlanCode, string> = {
  free: "Free",
  pro: "Pro",
  pro_plus: "Pro+",
  enterprise: "Enterprise",
};

export function PlanBadge({ plan }: { plan: PlanCode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-semibold",
        plan === "free" && "bg-surface text-muted-foreground",
        plan === "pro" && "bg-primary-subtle text-primary-subtle-foreground",
        plan === "pro_plus" && "bg-gradient-brand text-white",
        plan === "enterprise" && "bg-foreground text-background",
      )}
    >
      {planLabels[plan]}
    </span>
  );
}
