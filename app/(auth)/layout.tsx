import { BrandMark } from "@/components/layout/brand-mark";

/**
 * Auth shell — 03-pages-and-layouts.md §2, 04-component-library.md §3.4
 * (`AuthShellTemplate`). Centered auth-card, brand mark only, no nav —
 * minimizes distraction during registration/login.
 *
 * 06-responsive-design.md §32: card fixed at 400px from Tablet up,
 * fills available width minus gutter on Mobile.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-10">
      <div className="mb-8">
        <BrandMark />
      </div>
      <div className="w-full max-w-[400px] rounded-md border border-border bg-surface-raised p-6 shadow-elevation-2 sm:p-8">
        {children}
      </div>
    </div>
  );
}
