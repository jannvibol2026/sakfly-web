import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SAKFLY",
};

/**
 * /legal/privacy — 03-pages-and-layouts.md §1.3. Static prose layout,
 * max-width 65ch. Placeholder legal copy — actual policy text is a
 * legal/compliance deliverable outside this frontend sprint's scope.
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 py-16 sm:px-8">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-4">
        <h1 className="text-display-lg text-foreground">Privacy Policy</h1>
        <p className="text-body text-muted-foreground">
          This page will contain SAKFLY&apos;s full privacy policy,
          including data residency and retention disclosures. Content
          pending legal review.
        </p>
      </div>
    </div>
  );
}
