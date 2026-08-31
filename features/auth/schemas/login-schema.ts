import { z } from "zod";

/**
 * Login form schema.
 *
 * 07-frontend-security.md §5.1: login validation never distinguishes
 * "unknown email" from "wrong password" — that distinction is exclusively
 * a server-side concern surfaced via the generic INVALID_CREDENTIALS
 * error. Client-side validation here checks *shape* only (is this a
 * plausible email, is a password present), per 02-design-system.md §13.2's
 * on-blur validation timing.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
