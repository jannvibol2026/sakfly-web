import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SAKFLY",
  description: "About the SAKFLY AI platform.",
};

/**
 * /about — a static marketing page. Not specified in the approved route
 * structure documents as carrying any particular business content, so
 * this page ships as clean, honest placeholder copy structured exactly
 * like every other prose/legal page (max-width 65ch, 02-design-system.md
 * §3.3) — ready for real copy without any further structural change.
 */
export default function AboutPage() {
  return (
    <div className="px-4 py-16 sm:px-8">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-4">
        <h1 className="text-display-lg text-foreground">About SAKFLY</h1>
        <p className="text-body-lg text-muted-foreground">
          SAKFLY is a modern AI SaaS platform bringing chat, image
          generation, text-to-speech, and music generation together under
          one transparent, credit-based system.
        </p>
        <p className="text-body text-muted-foreground">
          We believe usage limits should be visible and honest, not
          discovered by accident. Every plan on SAKFLY shows exactly what
          you get — both daily and monthly — before you subscribe.
        </p>
      </div>
    </div>
  );
}
