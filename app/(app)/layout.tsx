import { redirect } from "next/navigation";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { MobileNav } from "@/features/dashboard/components/mobile-nav";
import { Topbar } from "@/features/dashboard/components/topbar";
import { getVerifiedSession } from "@/features/auth/services/session-service";
import { ApiError } from "@/types/api";

/**
 * AppShellTemplate — 03-pages-and-layouts.md §3, 04-component-library.md §3.4.
 *
 * This is the AUTHORITATIVE protected-route check (layer 2 of
 * 07-frontend-security.md §12.1's three-layer strategy) — a Server
 * Component that calls the session-verification service and redirects
 * BEFORE any protected content renders, closing off the "flash of
 * protected content" failure mode (07-frontend-security.md §12.2).
 *
 * Every quota/credit/plan figure this shell's children need is fetched
 * server-side, per request, per 01-frontend-architecture.md §2.4 — never
 * cached at build time. Sprint 1 has no backend, so this layout's only
 * live behavior is the redirect-on-missing-session path; once
 * `getVerifiedSession` is backed by a real API, this file does not
 * change.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let session;
  try {
    session = await getVerifiedSession();
  } catch (error) {
    if (error instanceof ApiError && error.code === "UNAUTHORIZED") {
      redirect("/login");
    }
    throw error;
  }

  return (
    <div className="flex min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar user={session.user} planCode={session.subscription.effectivePlanCode} />
        <main id="main-content" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
