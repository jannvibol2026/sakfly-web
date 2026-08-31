import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

/**
 * MarketingHeader — 03-pages-and-layouts.md §1.1, §20.1.
 * TopNav `marketing` context: logo, nav links, Login/Register CTAs.
 * 06-responsive-design.md §9: collapses to a simpler set on Mobile —
 * kept as a static, always-visible link row here since the marketing
 * link count is small (About / Pricing / Contact) per §21.1's rationale.
 */
const navLinks = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-8">
      <BrandMark />
      <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-body text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild variant="primary-gradient" size="sm">
          <Link href="/register">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
