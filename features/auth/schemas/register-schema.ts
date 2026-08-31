import { z } from "zod";

/**
 * Registration form schema.
 *
 * Minimum password length (10 characters) mirrors the doc-locked rule
 * (01-requirements.md FR-ID-1, 07-frontend-security.md §6.1) — enforced
 * here as a client-side courtesy only; the server remains the actual
 * enforcer (03-frontend-security.md §3.5 / 07-frontend-security.md §6.1).
 *
 * No plan-selection or payment field exists on this schema, by design
 * (07-frontend-security.md §6.3) — registration is uniformly Free-first.
 */
const passwordField = z
  .string()
  .min(10, "Password must be at least 10 characters")
  .max(128, "Password must be 128 characters or fewer");

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(120, "Name must be 120 characters or fewer"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Password strength scoring — presentation-only, feeds the strength meter
 * (02-design-system.md §13.2's keystroke-level positive-affordance
 * exception). This is *not* the validation rule itself; a weak-scored
 * password may still pass `registerSchema` if it meets the length floor.
 */
export type PasswordStrength = "empty" | "weak" | "fair" | "strong";

export function scorePasswordStrength(password: string): PasswordStrength {
  if (password.length === 0) return "empty";

  let score = 0;
  if (password.length >= 10) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return "weak";
  if (score <= 3) return "fair";
  return "strong";
}
