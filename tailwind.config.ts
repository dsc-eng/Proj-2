import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#fef7ee",
          100: "#fdedd3",
          200: "#fad7a5",
          300: "#f6b96d",
          400: "#f19132",
          500: "#ee7711",
          600: "#df5d07",
          700: "#b94509",
          800: "#93370e",
          900: "#772f0f",
        },
        warm: {
          50: "#fdf8f6",
          100: "#f8ede8",
          200: "#f2d9cf",
          300: "#e8bfae",
          400: "#db9c84",
          500: "#ce7c60",
          600: "#b96248",
          700: "#9b4f3b",
          800: "#804334",
          900: "#6b3b2f",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e2eae1",
          200: "#c5d5c4",
          300: "#9fb89e",
          400: "#749574",
          500: "#547754",
          600: "#416041",
          700: "#354d35",
          800: "#2c3f2d",
          900: "#253426",
        },
        cream: {
          50: "#fefdfb",
          100: "#fdf9f3",
          200: "#faf2e6",
          300: "#f5e6d0",
          400: "#edd5b3",
          500: "#e4c190",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
