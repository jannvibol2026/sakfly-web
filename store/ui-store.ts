"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Global UI-chrome store — theme preference and sidebar collapse state.
 *
 * 01-frontend-architecture.md §4 / 04-component-library.md §21: Zustand
 * owns client/UI state only, never server-derived data (balance, plan,
 * quota). Theme and sidebar-collapsed are exactly the class of state this
 * store is meant for — genuinely local, persisted preferences with no
 * security or financial meaning.
 *
 * 07-frontend-security.md §30: theme is the one preference explicitly
 * permitted in `localStorage`; nothing else is ever added to this store's
 * persisted slice without revisiting that rule.
 */
interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
    }),
    {
      name: "sakfly.web.ui-preferences",
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    },
  ),
);
