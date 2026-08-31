"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/patterns/empty-state";

/**
 * RouteErrorBoundary — 03-pages-and-layouts.md §13.2, 07-frontend-security.md §32.
 *
 * No stack trace, internal path, or credential-shaped string is ever
 * rendered — only a request-correlatable id (§32.2), shown collapsed by
 * default. `error.digest` is Next.js's own safe correlation identifier.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <EmptyState
        icon={AlertTriangle}
        heading="Something went wrong"
        body="We've been notified. You can try again or head back to your dashboard."
        action={
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => reset()}>
                Reload
              </Button>
              <Button asChild>
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
            </div>
            {error.digest && (
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="text-body-sm text-muted-foreground underline"
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>
            )}
            {showDetails && error.digest && (
              <p className="font-mono text-caption text-muted-foreground-subtle">
                Reference: {error.digest}
              </p>
            )}
          </div>
        }
      />
    </div>
  );
}
