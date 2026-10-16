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
          onyx: "#0D0D0D",
          charcoal: "#171717",
          black: "#111111",
          white: "#FCFAF7",
          silk: "#F9F6F0",
          cream: "#F1E8DA",
          crimson: "#5B1424",
          burgundy: "#641C2F",
          "burgundy-light": "#7C1E34",
          bronze: "#B38F4D",
          gold: "#C8A858",
          grey: "#8C8C8C",
          stone: "#E5E0D8",
          muted: "#8C857B",
        },
      },
      letterSpacing: {
        luxury: "0.25em",
        "ultra-wide": "0.35em",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
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
