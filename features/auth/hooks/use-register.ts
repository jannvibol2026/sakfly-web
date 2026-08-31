"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth-service";
import type { RegisterFormValues } from "@/features/auth/schemas/register-schema";

export function useRegister() {
  return useMutation({
    mutationFn: (values: RegisterFormValues) =>
      authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
  });
}
