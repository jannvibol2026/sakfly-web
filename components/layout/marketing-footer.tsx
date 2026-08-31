import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";

/**
 * MarketingFooter — 03-pages-and-layouts.md §21.1.
 * Four-column layout at Laptop+, collapsing to a single stacked column
 * on Mobile, two-column on Tablet (06-responsive-design.md §10).
 */
const columns = [
  {
    heading: "Product",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/about", label: "About" },
    ],
  },
  {
    heading: "Company",
    links: [{ href: "/contact", label: "Contact" }],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface px-4 py-10 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandMark />
        </div>
        {columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-3">
            <h3 className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
              {column.heading}
            </h3>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-body-sm text-muted-foreground-subtle">
        © {new Date().getFullYear()} SAKFLY. All rights reserved.
      </p>
    </footer>
  );
}
