import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          onyx: "#0B0908", // Deep Warm Velvet Obsidian - allows bright colors to pop
          charcoal: "#151210", // Warm Dark Mahogany Surface
          black: "#080706",
          white: "#FCFAF7",
          silk: "#FDFBFA",
          cream: "#F4EFE6",
          crimson: "#A61C32", // Radiant Imperial Oyo Crimson
          burgundy: "#7A1426",
          "burgundy-light": "#B8243E",
          bronze: "#CFA459",
          gold: "#F2C14E", // Luminous Sovereign African Gold
          grey: "#8C8C8C",
          stone: "#E5E0D8",
          muted: "#968F84",
        },
      },
      letterSpacing: {
        luxury: "0.25em",
        "ultra-wide": "0.35em",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        patron: ["var(--font-patron)", "Cormorant Garamond", "serif"],
        name: ["var(--font-name)", "Italiana", "var(--font-patron)", "Cormorant Garamond", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        luxury: "800ms",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
