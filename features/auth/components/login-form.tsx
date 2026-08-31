"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/login-schema";
import { PasswordInput } from "@/features/auth/components/password-input";
import { useLogin } from "@/features/auth/hooks/use-login";
import { FormField } from "@/components/patterns/form-field";
import { AlertBanner } from "@/components/patterns/alert-banner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/types/api";
import { resolveSafeNextPath } from "@/lib/redirect";

/**
 * Login form — 03-pages-and-layouts.md §2.2, 05-user-flows-ui.md §5.
 *
 * 07-frontend-security.md §5.1: a failed login (unknown email OR wrong
 * password) renders the IDENTICAL generic banner — never a field-specific
 * error — closing off account enumeration. This is enforced structurally
 * here: the only error path this form has for a login failure is the
 * single top-level AlertBanner, there is no per-field error state wired
 * to any login-failure response.
 */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login.mutateAsync(values);
      const nextPath = resolveSafeNextPath(searchParams.get("next"));
      router.push(nextPath);
    } catch {
      // Swallowed here — the mutation's own error state (login.error)
      // drives the AlertBanner below. No retry is attempted automatically
      // (07-frontend-security.md §5.1 / 01-frontend-architecture.md §4.4).
    }
  };

  const loginFailed = login.isError;
  const isRateLimited =
    login.error instanceof ApiError && login.error.code === "RATE_LIMITED";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {loginFailed && (
        <AlertBanner
          variant="danger"
          title={isRateLimited ? "Too many attempts" : "Invalid email or password"}
          description={
            isRateLimited
              ? "Please wait a moment before trying again."
              : "Double-check your email and password and try again."
          }
        />
      )}

      <FormField id="email" label="Email" errorText={errors.email?.message}>
        {(inputProps) => (
          <Input
            type="email"
            autoComplete="email"
            hasError={Boolean(errors.email)}
            {...inputProps}
            {...register("email")}
          />
        )}
      </FormField>

      <FormField id="password" label="Password" errorText={errors.password?.message}>
        {(inputProps) => (
          <PasswordInput
            autoComplete="current-password"
            {...inputProps}
            {...register("password")}
          />
        )}
      </FormField>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="rememberMe"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <Label htmlFor="rememberMe" className="cursor-pointer font-normal">
            Remember me
          </Label>
        </div>
        <Link href="/forgot-password" className="text-body-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting || login.isPending}>
        Log in
      </Button>

      <p className="text-center text-body-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
