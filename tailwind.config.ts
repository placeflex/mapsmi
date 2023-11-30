/* disable eslint errors if any */
const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

const basicFontSettings = {
  lineHeight: "1",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      extraSmall: [
        "0.4rem",
        {
          ...basicFontSettings,
        },
      ],
      xs: [
        "0.75rem",
        {
          ...basicFontSettings,
        },
      ],
      sm: [
        "0.8rem",
        {
          ...basicFontSettings,
        },
      ],
      base: [
        "1rem",
        {
          ...basicFontSettings,
        },
      ],
      lg: [
        "1.125rem",
        {
          ...basicFontSettings,
        },
      ],
      xl: [
        "1.25rem",
        {
          ...basicFontSettings,
        },
      ],
      "2xl": [
        "1.5rem",
        {
          ...basicFontSettings,
        },
      ],
      "3xl": [
        "1.875rem",
        {
          ...basicFontSettings,
        },
      ],
      "4xl": [
        "2.25rem",
        {
          ...basicFontSettings,
        },
      ],
      "5xl": [
        "3rem",
        {
          ...basicFontSettings,
        },
      ],
      "6xl": [
        "3.75rem",
        {
          ...basicFontSettings,
        },
      ],
      "7xl": [
        "4.5rem",
        {
          ...basicFontSettings,
        },
      ],
      "8xl": [
        "6rem",
        {
          ...basicFontSettings,
        },
      ],
    },
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },

      colors: {
        primary: "#F0122D",
        text: "#323232",
        wine: "#995955",
        bg: "#fff",
        black: "#111",
        darkGrey: "#454545",
        blueGrey: "#7b92a3",
        error: "#f8382a",
        cream: "#BD998D",
        light: "#F8F5F2",
        secondaryBg: "#423024",
        white: "#ffffff",
        button: "#423024",
      },
      fontFamily: {
        sans: ["var(--font-main)", ...defaultTheme.fontFamily.sans],
        second: ["var(--font-dancing)", ...defaultTheme.fontFamily.sans],
        alexbrush: ["var(--font-brush)", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "2xl": { min: "1535px" },
        xl: { min: "1279px" },
        lg: { min: "1023px" },
        md: { min: "767px" },
        sm: { min: "639px" },
      },
    },
  },
  plugins: [],
};
export default config;
