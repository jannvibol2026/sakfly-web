import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Log in — SAKFLY",
  description: "Log in to your SAKFLY account.",
};

/**
 * /login — 03-pages-and-layouts.md §2.2, 05-user-flows-ui.md §5.1.
 * `useSearchParams` inside LoginForm requires a Suspense boundary per
 * Next.js 15 App Router convention (01-frontend-architecture.md §2.1).
 */
export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-display-md text-foreground">Welcome back</h1>
        <p className="text-body text-muted-foreground">Log in to continue to SAKFLY.</p>
      </div>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
