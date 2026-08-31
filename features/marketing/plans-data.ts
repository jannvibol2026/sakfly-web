import type { PlanCode } from "@/types/user";

/**
 * Authoritative dual-limit matrix — 00-README-and-decisions.md §5,
 * restated exactly (no invented numbers) as static marketing content for
 * the Pricing page. In a connected build this is sourced live from
 * `GET /plans` (03-pages-and-layouts.md §1.2) — Sprint 1 ships no backend,
 * so this file is the single source of truth for these figures until the
 * real endpoint is wired, at which point only this file's usage site
 * (the Pricing page) changes to a fetch, never a change to the numbers
 * themselves.
 */
export interface FeatureLimit {
  featureKey: "chat" | "image" | "tts" | "music";
  label: string;
  daily: number;
  monthly: number;
}

export interface PlanDefinition {
  code: PlanCode;
  name: string;
  priceCents: number | null;
  monthlyCreditGrant: number;
  isCustom: boolean;
  limits: FeatureLimit[];
  daysAtMaxDailyUse: Partial<Record<FeatureLimit["featureKey"], number | null>>;
}

export const plans: PlanDefinition[] = [
  {
    code: "free",
    name: "Free",
    priceCents: 0,
    monthlyCreditGrant: 0,
    isCustom: false,
    limits: [
      { featureKey: "chat", label: "AI Chat", daily: 10, monthly: 300 },
      { featureKey: "image", label: "AI Image Generation", daily: 3, monthly: 90 },
      { featureKey: "tts", label: "AI Text-to-Speech", daily: 2, monthly: 60 },
      { featureKey: "music", label: "AI Music Generation", daily: 0, monthly: 0 },
    ],
    daysAtMaxDailyUse: { chat: 30, image: 30, tts: 30, music: null },
  },
  {
    code: "pro",
    name: "Pro",
    priceCents: 900,
    monthlyCreditGrant: 500,
    isCustom: false,
    limits: [
      { featureKey: "chat", label: "AI Chat", daily: 100, monthly: 1000 },
      { featureKey: "image", label: "AI Image Generation", daily: 30, monthly: 300 },
      { featureKey: "tts", label: "AI Text-to-Speech", daily: 20, monthly: 200 },
      { featureKey: "music", label: "AI Music Generation", daily: 5, monthly: 30 },
    ],
    daysAtMaxDailyUse: { chat: 10, image: 10, tts: 10, music: 6 },
  },
  {
    code: "pro_plus",
    name: "Pro+",
    priceCents: 2900,
    monthlyCreditGrant: 2000,
    isCustom: false,
    limits: [
      { featureKey: "chat", label: "AI Chat", daily: 500, monthly: 5000 },
      { featureKey: "image", label: "AI Image Generation", daily: 100, monthly: 1000 },
      { featureKey: "tts", label: "AI Text-to-Speech", daily: 80, monthly: 800 },
      { featureKey: "music", label: "AI Music Generation", daily: 20, monthly: 100 },
    ],
    daysAtMaxDailyUse: { chat: 10, image: 10, tts: 10, music: 5 },
  },
  {
    code: "enterprise",
    name: "Enterprise",
    priceCents: null,
    monthlyCreditGrant: 5000,
    isCustom: true,
    limits: [],
    daysAtMaxDailyUse: {},
  },
];

export const creditCosts = {
  chat: 1,
  image: 10,
  tts: 5,
  music: 25,
} as const;
