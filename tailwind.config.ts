/* disable eslint errors if any */

import defaultTheme from "tailwindcss/defaultTheme";
// const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

// import { main_font } from "./constants/fonts";

const basicFontSettings = {
  // lineHeight: "1.5",
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
      bodyBold: ["2.4rem", { ...basicFontSettings, fontWeight: 600 }],
      bodySmall: ["1.6rem", { ...basicFontSettings }],
      bodySmallBold: ["1.6rem", { ...basicFontSettings, fontWeight: 600 }],
      caption: ["1.4rem", { ...basicFontSettings }],
      captionSmall: ["1.2rem", { ...basicFontSettings }],
      captionSmallBold: ["1.2rem", { ...basicFontSettings, fontWeight: 600 }],
      captionXs: ["1rem", { ...basicFontSettings }],
      button: ["1.6rem", { ...basicFontSettings }],
      buttonSmall: ["1.4rem", { ...basicFontSettings }],
    },

    extend: {
      colors: {
        primary: "#fff",
        secondary: "rgb(242, 245, 249)",
        text: "rgba(5, 16, 67, 1)",
        bg: "#eaedf2",
        secondaryBg: "rgb(118, 125, 106)",
        black: "#1d1d1d",
        silver: "#e5e5e5",
        blueGrey: "#7b92a3",
        error: "#f8382a",
        cream: "#bd998d",
        // button: "rgba(12, 41, 171, 1)",
        button: "rgb(118, 125, 106)",
        link: "rgb(118, 125, 106)",
        secondButton: "#111",
      },

      fontFamily: {
        sans: ["Montserrat Alternates", ...defaultTheme.fontFamily.sans],
        second: ["Dancing Script", ...defaultTheme.fontFamily.sans],
      },

      // screens: {
      //   "2xl": { min: "1535px" },
      //   xl: { min: "1279px" },
      //   lg: { min: "1023px" },
      //   md: { min: "767px" },
      //   sm: { min: "639px" },
      // },
    },
  },
  plugins: [],
};
export default config;
