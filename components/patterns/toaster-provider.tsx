"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { useToastStore, getAutoDismissMs, type ToastVariant } from "@/store/toast-store";
import { cn } from "@/lib/utils";

const icons: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  info: Info,
};

/**
 * Renders the toast queue — 02-design-system.md §16.2/§17.1/§20.2.
 * Entrance: slideUpFade. Exit: fade + slight scale-down. Bottom-right on
 * desktop, bottom-center full-width on mobile handled via responsive
 * container classes (06-responsive-design.md §28).
 */
export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  React.useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => dismiss(toast.id), getAutoDismissMs(toast.variant)),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismiss]);

  return (
    <>
      {children}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 p-4 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-96"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const Icon = icons[toast.variant];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-start gap-3 rounded-md border-l-4 bg-surface-raised p-4 shadow-elevation-5",
                  toast.variant === "success" && "border-success",
                  toast.variant === "warning" && "border-warning",
                  toast.variant === "danger" && "border-danger",
                  toast.variant === "info" && "border-info",
                )}
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-5 shrink-0",
                    toast.variant === "success" && "text-success",
                    toast.variant === "warning" && "text-warning",
                    toast.variant === "danger" && "text-danger",
                    toast.variant === "info" && "text-info",
                  )}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="text-body font-medium text-foreground">{toast.title}</p>
                  {toast.description && (
                    <p className="text-body-sm text-muted-foreground">
                      {toast.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(toast.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
