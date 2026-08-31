"use client";

import * as React from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToasterProvider } from "@/components/patterns/toaster-provider";

/**
 * Single composed provider tree, mounted once in the root layout.
 *
 * Mirrors the provider ordering fixed in 01-frontend-architecture.md §4.1:
 * Theme -> QueryClient -> Toaster -> Tooltip. Zustand stores are module-
 * scoped hooks, not Context providers (per §4.1), so they are not nested
 * here.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToasterProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ToasterProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
