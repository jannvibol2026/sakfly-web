import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  MessageSquare,
  Image as ImageIcon,
  AudioLines,
  Music,
  BarChart3,
  Wallet,
  Receipt,
  Settings,
} from "lucide-react";

/**
 * Fixed nav-item order — 03-pages-and-layouts.md §19.1:
 * Dashboard -> Chat -> Image -> TTS -> Music -> Usage -> Credits ->
 * Billing -> Account. Identical set surfaced across every chrome
 * presentation (bottom nav+sheet, collapsed rail, full rail) per
 * 06-responsive-design.md §8.5's content-parity rule.
 *
 * Feature routes (/chat, /image, /tts, /music) are Sprint 2+ deliverables
 * — they are listed here as the fixed destination set this sprint's
 * navigation shell must be structurally ready for, per
 * 01-frontend-architecture.md §1.2's authoritative route table. Sprint 1
 * links to them; their pages are out of this sprint's scope.
 */
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  isFeature?: boolean;
}

export const primaryNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "Chat", icon: MessageSquare, isFeature: true },
  { href: "/image", label: "Image", icon: ImageIcon, isFeature: true },
  { href: "/tts", label: "TTS", icon: AudioLines, isFeature: true },
  { href: "/music", label: "Music", icon: Music, isFeature: true },
  { href: "/usage", label: "Usage", icon: BarChart3 },
  { href: "/credits", label: "Credits", icon: Wallet },
  { href: "/billing", label: "Billing", icon: Receipt },
  { href: "/account", label: "Account", icon: Settings },
];

/** Mobile bottom nav — 5 slots max (06-responsive-design.md §8.1). */
export const mobileBottomNavItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/usage", label: "Usage", icon: BarChart3 },
  { href: "/credits", label: "Credits", icon: Wallet },
  { href: "/billing", label: "Billing", icon: Receipt },
  { href: "/account", label: "Account", icon: Settings },
];
