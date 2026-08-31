import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create your account — SAKFLY",
  description: "Create a free SAKFLY account. No payment required.",
};

/** /register — 03-pages-and-layouts.md §2.1, 05-user-flows-ui.md §4.1. */
export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-display-md text-foreground">Create your account</h1>
        <p className="text-body text-muted-foreground">
          Start free. No plan selection, no payment required.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
