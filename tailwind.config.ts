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
          600: "#3d6b22",
          700: "#2d5218",
          800: "#223d12",
          900: "#172b0b",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FAF6ED",
          200: "#F2ECE0",
          300: "#E8DFC8",
          800: "#221c12",
          900: "#121810",
        },
        salsa: {
          500: "#D94826",
          600: "#BC3515",
          700: "#99280E",
        },
        gold: {
          500: "#E6A817",
          600: "#C68D0E",
        }
      },
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        'soft-sm': '0 2px 4px -1px rgba(0, 0, 0, 0.05)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'soft-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        'accent-glow': '0 10px 25px -3px rgba(61, 107, 34, 0.35)',
      },
      borderRadius: {
        'classic': '12px',
        'classic-lg': '16px',
        'classic-xl': '24px',
      },
      transitionTimingFunction: {
        'classic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
};
export default config;
