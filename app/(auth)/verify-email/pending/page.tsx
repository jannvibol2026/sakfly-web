"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/patterns/empty-state";
import { authService } from "@/features/auth/services/auth-service";
import { useToast } from "@/hooks/use-toast";

/**
 * /verify-email/pending — 03-pages-and-layouts.md §2.3, 05-user-flows-ui.md §4.2.
 * Resend button disables with a visible countdown after use
 * (07-frontend-security.md §6.5).
 */
const RESEND_COOLDOWN_SECONDS = 30;

export default function VerifyEmailPendingPage() {
  const { toast } = useToast();
  const [cooldown, setCooldown] = React.useState(0);
  const [isSending, setIsSending] = React.useState(false);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    setIsSending(true);
    try {
      // Sprint 1 has no known email at this point in the flow without a
      // real session; a production implementation reads it from the
      // verified session. The placeholder service intentionally fails
      // (lib/errors.ts) rather than fabricating success.
      await authService.resendVerificationEmail("");
      toast({ variant: "success", title: "Verification email sent" });
    } catch {
      toast({
        variant: "info",
        title: "Resend is not available yet",
        description: "Email delivery is not connected in this build.",
      });
    } finally {
      setIsSending(false);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    }
  };

  return (
    <EmptyState
      icon={Mail}
      heading="Check your inbox"
      body="We've sent a verification link to your email address. Click it to activate your account."
      action={
        <Button
          variant="secondary"
          onClick={handleResend}
          disabled={cooldown > 0}
          isLoading={isSending}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
        </Button>
      }
    />
  );
}
