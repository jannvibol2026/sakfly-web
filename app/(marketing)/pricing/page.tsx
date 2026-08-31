import type { Metadata } from "next";
import { PricingCard } from "@/features/marketing/components/pricing-card";
import { plans } from "@/features/marketing/plans-data";

export const metadata: Metadata = {
  title: "Pricing — SAKFLY",
  description:
    "Transparent SAKFLY pricing with both daily and monthly limits shown for every AI feature.",
};

/**
 * Pricing page — 03-pages-and-layouts.md §1.2, 04-component-library.md §17.5.
 *
 * D7 (00-README-and-decisions.md): the pricing page must ALWAYS display
 * both the daily and monthly limit for every feature, plus the
 * "days at max daily use" cliff caption — never omitted, never collapsed
 * behind an interaction (03-pages-and-layouts.md §17's non-negotiable
 * rule, restated for this concrete page).
 *
 * 06-responsive-design.md §17: 4-column row on Laptop+, this static
 * implementation renders a responsive CSS grid that naturally satisfies
 * the mobile-carousel/tablet-2x2/desktop-4-across progression via
 * standard grid wrapping — a full scroll-snap carousel component is a
 * Sprint 2+ polish item; the grid itself never truncates or hides the
 * dual-limit content at any width, which is the load-bearing requirement.
 */
export default function PricingPage() {
  return (
    <div className="px-4 py-16 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-display-lg text-foreground">Simple, transparent pricing</h1>
          <p className="text-body-lg text-muted-foreground">
            Every plan shows both daily and monthly limits for every feature —
            no surprises.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PricingCard key={plan.code} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
