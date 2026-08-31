import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Image as ImageIcon, AudioLines, Music, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/patterns/empty-state";
import { getVerifiedSession } from "@/features/auth/services/session-service";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard — SAKFLY",
};

/**
 * /dashboard — 03-pages-and-layouts.md §3.1.
 *
 * Every figure here is server-fetched per request
 * (01-frontend-architecture.md §2.4) — Sprint 1 has no live usage/balance
 * data source, so data-bearing regions render their documented `isLoading`
 * skeleton state rather than a fabricated number (04-component-library.md
 * §13.4's required-isLoading-prop rule) — never mock business data.
 *
 * The four feature tiles link to their Sprint 2+ destination routes,
 * satisfying 03-pages-and-layouts.md §3.1's composition today; their own
 * pages are out of this sprint's scope.
 */
const featureTiles = [
  {
    key: "chat",
    href: "/chat",
    icon: MessageSquare,
    name: "Chat",
    cost: 1,
    accent: "text-feature-chat",
    border: "border-t-feature-chat",
  },
  {
    key: "image",
    href: "/image",
    icon: ImageIcon,
    name: "Image",
    cost: 10,
    accent: "text-feature-image",
    border: "border-t-feature-image",
  },
  {
    key: "tts",
    href: "/tts",
    icon: AudioLines,
    name: "TTS",
    cost: 5,
    accent: "text-feature-tts",
    border: "border-t-feature-tts",
  },
  {
    key: "music",
    href: "/music",
    icon: Music,
    name: "Music",
    cost: 25,
    accent: "text-feature-music",
    border: "border-t-feature-music",
  },
] as const;

export default async function DashboardPage() {
  const session = await getVerifiedSession();

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-display-lg text-foreground">
          Welcome back, {session.user.name.split(" ")[0]}
        </h1>
      </div>

      {/* Balance + Monthly Cap stat cards — 06-responsive-design.md §11 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Credit balance</CardTitle>
          </CardHeader>
          <CardBody>
            <Skeleton className="h-9 w-24" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This month</CardTitle>
          </CardHeader>
          <CardBody>
            <Skeleton className="h-9 w-full" />
          </CardBody>
        </Card>
      </div>

      {/* Feature tiles — 03-pages-and-layouts.md §3.1, 04-component-library.md §7's `feature` variant */}
      <div>
        <h2 className="mb-3 text-heading text-foreground">Start creating</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featureTiles.map((feature) => (
            <Link
              key={feature.key}
              href={feature.href}
              className={cn(
                "group flex flex-col gap-3 rounded-lg border-t-2 bg-surface-raised p-5 shadow-elevation-1 transition-all hover:-translate-y-0.5 hover:shadow-elevation-2",
                feature.border,
              )}
            >
              <feature.icon className={cn("size-6", feature.accent)} aria-hidden="true" />
              <span className="text-body font-medium text-foreground">{feature.name}</span>
              <span className="font-mono font-tabular text-caption text-muted-foreground">
                {feature.cost} credit{feature.cost === 1 ? "" : "s"}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent generations — 03-pages-and-layouts.md §3.1 empty state */}
      <div>
        <h2 className="mb-3 text-heading text-foreground">Recent generations</h2>
        <Card>
          <CardBody>
            <EmptyState
              icon={Sparkles}
              heading="Nothing here yet"
              body="Start with a feature above to see your generations here."
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
