"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { primaryNavItems } from "@/features/dashboard/nav-items";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

/**
 * AppSidebar — 03-pages-and-layouts.md §19.1, 06-responsive-design.md §8.
 *
 * Desktop/Laptop+: expanded (264px) by default, user-togglable to
 * collapsed. Active-item indication uses `--primary-subtle` background +
 * `--primary` text/icon (never border-only), per §19.3.
 *
 * Feature-tile daily-remaining numerals (per-item quota indicator) are a
 * Sprint 2+ data-bearing enhancement — this sprint's sidebar renders the
 * fixed nav structure with no live entitlement figures, since no backend
 * is connected yet. The layout reserves the correct slot so that
 * enhancement is additive, not a redesign.
 */
export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <aside
      className={cn(
        "hidden h-screen flex-col border-r border-border bg-surface-raised transition-all lg:flex",
        collapsed ? "w-[72px]" : "w-[264px]",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && <BrandMark />}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-sm p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground"
        >
          {collapsed ? (
            <ChevronsRight className="size-4" aria-hidden="true" />
          ) : (
            <ChevronsLeft className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Primary">
        {primaryNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-body transition-colors",
                isActive
                  ? "bg-primary-subtle text-primary-subtle-foreground"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground",
                collapsed && "justify-center",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
