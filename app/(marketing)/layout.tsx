import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";

/**
 * MarketingShellTemplate — 03-pages-and-layouts.md §1, 04-component-library.md §3.4.
 * Header + content + footer regions; guest-accessible, no session required
 * (01-frontend-architecture.md §1.2).
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <MarketingHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
