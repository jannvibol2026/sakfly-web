import { Menu } from "lucide-react";
import { PlanBadge } from "@/components/patterns/plan-badge";
import { CreditBalancePill } from "@/components/patterns/credit-balance-pill";
import { UserMenu } from "@/features/dashboard/components/user-menu";
import type { AuthenticatedUser, PlanCode } from "@/types/user";

/**
 * AppTopBar — 03-pages-and-layouts.md §20.1, 06-responsive-design.md §9.
 *
 * Plan badge and credit balance pill are always present — this is the
 * persistent entitlement chrome that survives every responsive decision
 * (06-responsive-design.md §1 Principle 3). Sprint 1 renders the balance
 * pill in its loading state since no backend supplies a real figure yet
 * (see CreditBalancePill's isLoading path) — never a fabricated number.
 */
export function Topbar({
  user,
  planCode,
}: {
  user: AuthenticatedUser;
  planCode: PlanCode;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        aria-label="Open navigation menu"
        className="rounded-sm p-2 text-muted-foreground hover:bg-surface lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <PlanBadge plan={planCode} />
        <CreditBalancePill isLoading />
        <UserMenu name={user.name} email={user.email} />
      </div>
    </header>
  );
}
