/* disable eslint errors if any */
const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

const basicFontSettings = {
  lineHeight: "1.2",
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
      h1: ["5.6rem", { ...basicFontSettings }],
      h2: ["4.8rem", { ...basicFontSettings }],
      h3: ["4rem", { ...basicFontSettings }],
      h4: ["3.2rem", { ...basicFontSettings }],
      h5: ["2.4rem", { ...basicFontSettings }],
      body: ["2.4rem", { ...basicFontSettings }],
      bodyBold: ["2.4rem", { ...basicFontSettings }],
      bodySmall: ["1.6rem", { ...basicFontSettings }],
      bodySmallBold: ["1.6rem", { ...basicFontSettings }],
      caption: ["1.4rem", { ...basicFontSettings }],
      captionSmall: ["1.2rem", { ...basicFontSettings }],
      button: ["1.6rem", { ...basicFontSettings }],
      buttonSmall: ["1.4rem", { ...basicFontSettings }],
    },

    extend: {
      colors: {
        primary: "#fff",
        secondary: "#E7EBEF",
        text: "#3A3A3A",
        wine: "#995955",
        bg: "#eaedf2",
        secondaryBg: "#423024",
        black: "#14191f",
        darkGrey: "#454545",
        silver: "#e5e5e5",
        blueGrey: "#7b92a3",
        error: "#f8382a",
        cream: "#bd998d",
        light: "#f8f5f2",
        white: "#ffffff",
        button: "#203038",
        secondButton: "#C2CED6",
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
