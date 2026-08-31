import { ServiceNotImplementedError } from "@/lib/errors";
import type { LoginFormValues } from "@/features/auth/schemas/login-schema";
import type { RegisterFormValues } from "@/features/auth/schemas/register-schema";
import type { CurrentUserResponse } from "@/types/user";

/**
 * Placeholder authentication service.
 *
 * This is the ONLY module UI code (`features/auth/components`,
 * `hooks/use-*`) is permitted to call for auth operations, per
 * 01-frontend-architecture.md §8.6's api-client boundary. It defines the
 * exact typed contract Sprint 2+'s real implementation must satisfy
 * (request shape in, `CurrentUserResponse`/`void` out, `ApiError` thrown
 * on failure) — and every method currently throws
 * `ServiceNotImplementedError` rather than fabricating a fake success.
 *
 * This is intentional and required by this deliverable's constraints:
 * "No backend implementation" and "No mock business logic" mean this
 * layer must not pretend a login succeeded, must not invent a session,
 * and must not grant an entitlement that no server has actually decided.
 * Every consuming component (LoginForm, RegisterForm) is written exactly
 * as it will be once these methods call the real BFF-proxied API — only
 * this file's method bodies change when that lands.
 */
export interface AuthService {
  login(values: LoginFormValues): Promise<CurrentUserResponse>;
  register(
    values: Pick<RegisterFormValues, "name" | "email" | "password">,
  ): Promise<void>;
  resendVerificationEmail(email: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<CurrentUserResponse>;
}

export const authService: AuthService = {
  async login() {
    throw new ServiceNotImplementedError("Login");
  },
  async register() {
    throw new ServiceNotImplementedError("Registration");
  },
  async resendVerificationEmail() {
    throw new ServiceNotImplementedError("Resending the verification email");
  },
  async logout() {
    throw new ServiceNotImplementedError("Logout");
  },
  async getCurrentUser() {
    throw new ServiceNotImplementedError("Fetching the current session");
  },
};
