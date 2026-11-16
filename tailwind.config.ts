import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        avocado: {
          50: "#f4f8ec",
          100: "#e6f0d4",
          200: "#cfe3ad",
          300: "#b0d27c",
          400: "#8fb838",
          500: "#6b9627",
          600: "#4b7326",
          700: "#3d5e1e",
          800: "#324a1a",
          900: "#1e300f",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FAF6ED",
          200: "#F2ECE0",
          300: "#E9E1C8",
          800: "#221c12",
          900: "#121810",
        },
        salsa: {
          500: "#D94826",
          600: "#BC3515",
        },
        gold: {
          500: "#E6A817",
          600: "#C68D0E",
        }
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
