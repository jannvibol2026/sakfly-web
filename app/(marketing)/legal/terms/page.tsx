import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SAKFLY",
};

/** /legal/terms — 03-pages-and-layouts.md §1.3. Placeholder legal copy. */
export default function TermsOfServicePage() {
  return (
    <div className="px-4 py-16 sm:px-8">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-4">
        <h1 className="text-display-lg text-foreground">Terms of Service</h1>
        <p className="text-body text-muted-foreground">
          This page will contain SAKFLY&apos;s full terms of service.
          Content pending legal review.
        </p>
      </div>
    </div>
  );
}
