import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Identity — dusty mauve rose drawn from the logo
        rose: {
          50: "#FBF1F3",
          100: "#F6E2E7",
          200: "#EFC9D2",
          300: "#E3A8B7",
          400: "#D38497",
          500: "#C17A91", // primary
          600: "#AB6079",
          700: "#8C4D63",
          800: "#6E3D4E",
          900: "#4E2B38",
        },
        cream: {
          50: "#FDF8F6",
          100: "#FBF1ED",
          200: "#F7E7E1",
        },
        gold: {
          300: "#E7C9A0",
          400: "#D9B380",
          500: "#C99A5E",
        },
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "system-ui", "sans-serif"],
        display: ["var(--font-messiri)", "var(--font-tajawal)", "serif"],
        quran: ["var(--font-amiri)", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(193, 122, 145, 0.45)",
        "glow-sm": "0 0 24px -6px rgba(193, 122, 145, 0.35)",
        soft: "0 10px 40px -12px rgba(110, 61, 78, 0.25)",
        card: "0 8px 32px -10px rgba(110, 61, 78, 0.18)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 7s ease-in-out infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
