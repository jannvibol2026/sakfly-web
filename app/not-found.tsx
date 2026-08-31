import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/patterns/empty-state";

/**
 * NotFoundState — 03-pages-and-layouts.md §13.1, 07-frontend-security.md §15.
 *
 * Renders identically for genuinely missing routes AND for resources the
 * current subject cannot see — the app never distinguishes these two
 * cases in copy, closing off the indistinguishability requirement.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <EmptyState
        icon={FileQuestion}
        heading="Page not found"
        body="The page you're looking for doesn't exist or you don't have access to it."
        action={
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        }
      />
    </div>
  );
}
