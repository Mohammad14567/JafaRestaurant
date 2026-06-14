import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palestinian-inspired palette
        olive: {
          50: "#f6f7f0",
          100: "#e9ecd9",
          200: "#d4dbb5",
          300: "#b8c388",
          400: "#9aa861",
          500: "#7d8c45",
          600: "#5f6d34",
          700: "#49542c",
          800: "#3c4427",
          900: "#343b25",
        },
        clay: {
          50: "#fdf4f3",
          100: "#fce7e4",
          200: "#fad3cd",
          300: "#f5b3a9",
          400: "#ec8576",
          500: "#df5e4b",
          600: "#cb4230",
          700: "#aa3324",
          800: "#8d2d22",
          900: "#752a22",
        },
        flag: {
          red: "#CE1126",
          green: "#007A3D",
          black: "#0b0b0b",
        },
        cream: "#faf6ef",
        sand: "#f3ead9",
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-tajawal)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(73, 84, 44, 0.18)",
        card: "0 4px 24px -6px rgba(0,0,0,0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
