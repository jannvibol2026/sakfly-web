import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

/**
 * Typeface stack — 02-design-system.md §3.1: Geist (Display), Inter
 * (Body/UI), Geist Mono (Numeric/Mono) via `next/font`.
 */
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SAKFLY — AI Chat, Image, Voice & Music Generation",
    template: "%s",
  },
  description:
    "SAKFLY is a modern AI SaaS platform for chat, image generation, text-to-speech, and music generation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

/**
 * Root layout — 01-frontend-architecture.md §3, §4.1.
 * Provider tree order: Theme -> QueryClient -> Toaster -> Tooltip
 * (all composed inside AppProviders). `suppressHydrationWarning` on
 * `<html>` is required by next-themes' class-based dark mode strategy.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${inter.variable} font-body antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
