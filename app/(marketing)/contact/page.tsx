import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact — SAKFLY",
  description: "Get in touch with the SAKFLY team.",
};

/**
 * /contact — 05-user-flows-ui.md §3.4: no standalone in-app contact form
 * exists in the approved route structure; "Contact us" routes to an
 * external mailto channel. This page is the landing destination for that
 * link and for the marketing header's "Contact" nav item.
 *
 * 07-frontend-security.md §29: external/mailto links use
 * rel="noopener noreferrer" is not applicable to `mailto:` itself (no
 * window.opener risk), but is applied consistently on any future
 * true external link added to this page.
 */
export default function ContactPage() {
  return (
    <div className="px-4 py-16 sm:px-8">
      <div className="mx-auto flex max-w-[65ch] flex-col items-start gap-4">
        <h1 className="text-display-lg text-foreground">Get in touch</h1>
        <p className="text-body-lg text-muted-foreground">
          For Enterprise plans, partnership inquiries, or general
          questions, reach out and we&apos;ll get back to you.
        </p>
        <Button asChild size="lg">
          <a href="mailto:hello@sakfly.com">
            <Mail className="size-4" aria-hidden="true" />
            hello@sakfly.com
          </a>
        </Button>
      </div>
    </div>
  );
}
