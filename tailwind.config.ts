import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        panel2: "var(--panel2)",
        line: "var(--line)",
        shade: "var(--shade)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "on-accent": "var(--on-accent)",
        accent2: "var(--accent2)",
        gold: "var(--gold)",
        good: "var(--good)",
        bad: "var(--bad)",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "Courier New", "monospace"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
