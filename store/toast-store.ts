"use client";

import { create } from "zustand";

/**
 * Toast queue store — 02-design-system.md §16.2/§17.1,
 * 04-component-library.md §12.1/§21.6.
 *
 * A single shared Zustand store consumed via `useToast()` — no component
 * instantiates its own toast queue (04-component-library.md §21.6). Max 3
 * stacked, older ones compressed behind (design system §16.2).
 */
export type ToastVariant = "success" | "warning" | "danger" | "info";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastState {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const MAX_STACKED_TOASTS = 3;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (toast) =>
    set((state) => ({
      toasts: [
        { ...toast, id: crypto.randomUUID() },
        ...state.toasts,
      ].slice(0, MAX_STACKED_TOASTS),
    })),
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

/** Auto-dismiss timing: 6s for danger/warning, 4s for info/success (§16.2). */
export function getAutoDismissMs(variant: ToastVariant): number {
  return variant === "danger" || variant === "warning" ? 6000 : 4000;
}
