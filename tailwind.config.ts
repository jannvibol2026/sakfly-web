import type { Config } from "tailwindcss";

/**
 * SAKFLY — Tailwind configuration.
 *
 * Every color/spacing/radius/typography token below is sourced directly
 * from 02-design-system.md. No arbitrary values are introduced here —
 * this file is a mechanical translation of the design tokens into
 * Tailwind's theme extension, per 04-component-library.md §1 Principle 1
 * and the "reusability checklist" (§24) requirement that components use
 * only design-system tokens.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system §2.2 — primary brand ramp
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))",
          subtle: "hsl(var(--primary-subtle))",
          "subtle-foreground": "hsl(var(--primary-subtle-foreground))",
        },
        // Design system §2.4 — semantic colors
        success: {
          DEFAULT: "hsl(var(--success))",
          subtle: "hsl(var(--success-subtle))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          subtle: "hsl(var(--warning-subtle))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          subtle: "hsl(var(--danger-subtle))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          subtle: "hsl(var(--info-subtle))",
        },
        // Design system §2.5 — feature accent tokens
        feature: {
          chat: "hsl(var(--feature-chat))",
          image: "hsl(var(--feature-image))",
          tts: "hsl(var(--feature-tts))",
          music: "hsl(var(--feature-music))",
        },
        // Design system §2.6 — neutrals & surfaces
        background: "hsl(var(--background))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
        },
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        foreground: "hsl(var(--foreground))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        "muted-foreground-subtle": "hsl(var(--muted-foreground-subtle))",
      },
      borderRadius: {
        // Design system §5
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      spacing: {
        // Design system §4.1 (only the non-default steps SAKFLY names explicitly)
        "0.5": "2px",
      },
      fontFamily: {
        display: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Design system §3.2
        "display-xl": ["56px", { lineHeight: "1.1", fontWeight: "700" }],
        "display-lg": ["40px", { lineHeight: "1.15", fontWeight: "700" }],
        "display-md": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "display-sm": ["24px", { lineHeight: "1.25", fontWeight: "600" }],
        heading: ["18px", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "1.45", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
        "metric-lg": ["36px", { lineHeight: "1.1", fontWeight: "700" }],
        "metric-md": ["20px", { lineHeight: "1.2", fontWeight: "600" }],
      },
      boxShadow: {
        // Design system §6
        "elevation-1": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        "elevation-2":
          "0 2px 8px 0 rgb(0 0 0 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.04)",
        "elevation-3":
          "0 4px 16px 0 rgb(0 0 0 / 0.08), 0 2px 4px 0 rgb(0 0 0 / 0.04)",
        "elevation-4":
          "0 12px 32px 0 rgb(0 0 0 / 0.12), 0 4px 8px 0 rgb(0 0 0 / 0.04)",
        "elevation-5": "0 20px 48px 0 rgb(0 0 0 / 0.16)",
      },
      backgroundImage: {
        // Design system §2.3 — brand gradient, used sparingly per token rules
        "gradient-brand":
          "linear-gradient(135deg, #6D28D9 0%, #DB2777 55%, #EA580C 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, #F3EBFF 0%, #FCE7F3 55%, #FFEDD5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
