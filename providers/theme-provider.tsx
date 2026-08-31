"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Dark mode provider.
 *
 * 02-design-system.md §21.3: default theme is `system` (follows OS
 * preference) with an explicit user override — never forced to one mode
 * platform-wide. Theme switching is instant (no cross-fade on the color
 * values themselves, §21.3), which `next-themes`' class-swap approach
 * satisfies natively.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
