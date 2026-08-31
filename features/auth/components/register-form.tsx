"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/register-schema";
import { PasswordInput } from "@/features/auth/components/password-input";
import { PasswordStrengthMeter } from "@/features/auth/components/password-strength-meter";
import { useRegister } from "@/features/auth/hooks/use-register";
import { FormField } from "@/components/patterns/form-field";
import { AlertBanner } from "@/components/patterns/alert-banner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/types/api";

/**
 * Registration form — 03-pages-and-layouts.md §2.1, 05-user-flows-ui.md §4.1.
 *
 * No plan-selection or payment field exists here, by design
 * (07-frontend-security.md §6.3) — registration is uniformly Free-first.
 *
 * 07-frontend-security.md §6.2: EMAIL_ALREADY_REGISTERED is the one place
 * email-specific error copy is permitted on a *registration* flow (not
 * login), because the submitting user just typed that email themselves in
 * this same session.
 */
export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync(values);
      router.push("/verify-email/pending");
    } catch {
      // Handled via registerMutation.error below.
    }
  };

  const error = registerMutation.error;
  const isDuplicateEmail = error instanceof ApiError && error.code === "EMAIL_ALREADY_REGISTERED";
  const isGenericFailure = registerMutation.isError && !isDuplicateEmail;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {isGenericFailure && (
        <AlertBanner
          variant="danger"
          title="Something went wrong"
          description="We couldn't create your account. Please try again."
        />
      )}

      <FormField id="name" label="Name" errorText={errors.name?.message}>
        {(inputProps) => (
          <Input
            autoComplete="name"
            hasError={Boolean(errors.name)}
            {...inputProps}
            {...register("name")}
          />
        )}
      </FormField>

      <FormField
        id="email"
        label="Email"
        errorText={isDuplicateEmail ? "An account with this email already exists." : errors.email?.message}
      >
        {(inputProps) => (
          <>
            <Input
              type="email"
              autoComplete="email"
              hasError={Boolean(errors.email) || isDuplicateEmail}
              {...inputProps}
              {...register("email")}
            />
            {isDuplicateEmail && (
              <p className="text-body-sm text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline">
                  Log in instead
                </Link>
              </p>
            )}
          </>
        )}
      </FormField>

      <FormField
        id="password"
        label="Password"
        helperText={!errors.password ? "At least 10 characters." : undefined}
        errorText={errors.password?.message}
      >
        {(inputProps) => (
          <>
            <PasswordInput
              autoComplete="new-password"
              {...inputProps}
              {...register("password")}
            />
            <PasswordStrengthMeter password={password ?? ""} />
          </>
        )}
      </FormField>

      <FormField
        id="confirmPassword"
        label="Confirm password"
        errorText={errors.confirmPassword?.message}
      >
        {(inputProps) => (
          <PasswordInput
            autoComplete="new-password"
            {...inputProps}
            {...register("confirmPassword")}
          />
        )}
      </FormField>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isSubmitting || registerMutation.isPending}
      >
        Create account
      </Button>

      <p className="text-center text-body-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
