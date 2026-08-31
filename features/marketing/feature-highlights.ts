import type { LucideIcon } from "lucide-react";
import { MessageSquare, Image as ImageIcon, AudioLines, Music } from "lucide-react";

/**
 * The four AI feature highlights shown on the Landing page.
 *
 * Credit costs are the exact, doc-locked values from
 * 00-README-and-decisions.md §5 (Chat 1 · Image 10 · TTS 5 · Music 25) —
 * restated here as static marketing copy, never recomputed or fetched,
 * since these figures are fixed platform-wide credit_rules seed data.
 */
export interface FeatureHighlight {
  key: "chat" | "image" | "tts" | "music";
  icon: LucideIcon;
  name: string;
  description: string;
  creditCost: number;
  accentClassName: string;
}

export const featureHighlights: FeatureHighlight[] = [
  {
    key: "chat",
    icon: MessageSquare,
    name: "AI Chat",
    description: "Multi-turn conversation with streamed, real-time responses.",
    creditCost: 1,
    accentClassName: "text-feature-chat",
  },
  {
    key: "image",
    icon: ImageIcon,
    name: "AI Image Generation",
    description: "Generate stunning images from a prompt in seconds.",
    creditCost: 10,
    accentClassName: "text-feature-image",
  },
  {
    key: "tts",
    icon: AudioLines,
    name: "AI Text-to-Speech",
    description: "Turn text into natural-sounding speech instantly.",
    creditCost: 5,
    accentClassName: "text-feature-tts",
  },
  {
    key: "music",
    icon: Music,
    name: "AI Music Generation",
    description: "Compose original tracks from a simple text prompt.",
    creditCost: 25,
    accentClassName: "text-feature-music",
  },
];
