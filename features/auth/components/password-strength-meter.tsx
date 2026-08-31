"use client";

import { cn } from "@/lib/utils";
import { scorePasswordStrength, type PasswordStrength } from "@/features/auth/schemas/register-schema";

/**
 * 02-design-system.md §13.2 — the one keystroke-level validation
 * exception. Real-time positive feedback; never blocks typing, never
 * itself gates submission (the 10-char minimum, checked on blur/submit,
 * is the actual gate — 07-frontend-security.md §7.1).
 */
const labels: Record<PasswordStrength, string> = {
  empty: "",
  weak: "Weak",
  fair: "Fair",
  strong: "Strong",
};

const colors: Record<PasswordStrength, string> = {
  empty: "bg-border",
  weak: "bg-danger",
  fair: "bg-warning",
  strong: "bg-success",
};

const fillWidth: Record<PasswordStrength, string> = {
  empty: "w-0",
  weak: "w-1/3",
  fair: "w-2/3",
  strong: "w-full",
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = scorePasswordStrength(password);
  if (strength === "empty") return null;

  return (
    <div className="flex items-center gap-2" aria-live="polite">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
        <div
          className={cn("h-full rounded-full transition-all", colors[strength], fillWidth[strength])}
        />
      </div>
      <span className="text-body-sm text-muted-foreground">{labels[strength]}</span>
    </div>
  );
}
