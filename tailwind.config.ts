import typography from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

/** Wraps a bare oklch token so Tailwind opacity modifiers keep working. */
const token = (name: string) => `oklch(var(--${name}) / <alpha-value>)`

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        destructive: token("destructive"),
        verified: {
          DEFAULT: token("verified"),
          foreground: token("verified-foreground"),
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) * 0.6)",
        md: "calc(var(--radius) * 0.8)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) * 1.4)",
        "2xl": "calc(var(--radius) * 1.8)",
        "3xl": "calc(var(--radius) * 2.2)",
      },
      fontFamily: {
        // The landing design runs on a single grotesk; `serif` and `mono` are
        // used as semantic slots (display copy, engraved labels) rather than
        // as genuinely different typefaces.
        sans: ["var(--font-hanken)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-hanken)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-hanken)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typography],
} satisfies Config
