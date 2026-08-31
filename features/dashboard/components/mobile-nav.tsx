"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { mobileBottomNavItems, primaryNavItems } from "@/features/dashboard/nav-items";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

/**
 * MobileNav — 03-pages-and-layouts.md §15/§19.1, 06-responsive-design.md §8.1.
 * Bottom navigation bar (5 slots max) with a feature-switcher entry that
 * opens a sheet listing Chat/Image/TTS/Music
 * (05-user-flows-ui.md §35 — a two-tap gesture, same destinations as desktop).
 */
const featureItems = primaryNavItems.filter((item) => item.isFeature);

export function MobileNav() {
  const pathname = usePathname();
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  return (
    <>
      {mobileNavOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose a feature"
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            className="rounded-t-lg border-t border-border bg-surface-raised p-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-strong" />
            <p className="mb-3 px-2 text-caption font-semibold uppercase text-muted-foreground">
              AI Features
            </p>
            <div className="grid grid-cols-2 gap-3">
              {featureItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="flex flex-col items-center gap-2 rounded-md border border-border p-4 text-body text-foreground"
                >
                  <item.icon className="size-6" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-border bg-surface-raised lg:hidden"
      >
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-haspopup="dialog"
          className="flex flex-1 flex-col items-center gap-0.5 py-2 text-body-sm text-muted-foreground"
        >
          <Sparkles className="size-5" aria-hidden="true" />
          Create
        </button>
        {mobileBottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2 text-body-sm",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
