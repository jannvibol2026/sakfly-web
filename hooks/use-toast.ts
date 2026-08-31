"use client";

import { useToastStore, type ToastItem } from "@/store/toast-store";

/**
 * useToast() — the only sanctioned way for feature code to raise a toast
 * (04-component-library.md §12.1). Never instantiate a queue locally.
 */
export function useToast() {
  const push = useToastStore((state) => state.push);
  const dismiss = useToastStore((state) => state.dismiss);

  return {
    toast: (toast: Omit<ToastItem, "id">) => push(toast),
    dismiss,
  };
}
