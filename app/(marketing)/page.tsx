import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { featureHighlights } from "@/features/marketing/feature-highlights";
import { plans } from "@/features/marketing/plans-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SAKFLY — Premium AI Chat, Image, Voice & Music Generation",
  description:
    "SAKFLY is a modern AI SaaS platform for chat, image generation, text-to-speech, and music generation — with transparent, honest usage limits.",
};

/**
 * Landing page — 03-pages-and-layouts.md §1.1, 05-user-flows-ui.md §3.1.
 * Hero -> four feature cards -> plan teaser -> footer (in the layout).
 * No modal, no popup, no exit-intent interstitial (05-user-flows-ui.md §3.1).
 */
export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-brand-soft px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-display-lg text-foreground sm:text-display-xl">
            One platform. Four AI superpowers.
          </h1>
          <p className="max-w-xl text-body-lg text-muted-foreground">
            Generate stunning images, natural speech, original music, and
            have real conversations with AI — all under one transparent
            credit system.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="primary-gradient">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureHighlights.map((feature) => (
            <Link
              key={feature.key}
              href={{ pathname: "/pricing", hash: feature.key }}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-surface-raised p-5 shadow-elevation-1 transition-shadow hover:shadow-elevation-2"
            >
              <feature.icon className={cn("size-6", feature.accentClassName)} aria-hidden="true" />
              <h3 className="text-display-sm text-foreground">{feature.name}</h3>
              <p className="text-body-sm text-muted-foreground">{feature.description}</p>
              <span className="font-mono font-tabular text-caption text-muted-foreground">
                {feature.creditCost} credit{feature.creditCost === 1 ? "" : "s"} per use
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Plan teaser */}
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="text-display-md text-foreground">Plans for every stage</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {plans.map((plan) => (
              <span
                key={plan.code}
                className={cn(
                  "rounded-full px-4 py-1.5 text-body-sm font-medium",
                  plan.code === "pro_plus"
                    ? "bg-gradient-brand text-white"
                    : plan.code === "enterprise"
                      ? "bg-foreground text-background"
                      : "bg-primary-subtle text-primary-subtle-foreground",
                )}
              >
                {plan.name}
              </span>
            ))}
          </div>
          <Button asChild variant="secondary">
            <Link href="/pricing">View plans</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
