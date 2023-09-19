/* disable eslint errors if any */
const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        text: "#14191F",
        wine: "#995955",
        bg: "#FFFFFF",
        black: "#14191F",
        darkGrey: "#454545",
        silver: "#e5e5e5",
        blueGrey: "#7b92a3",
        error: "#f8382a",
        white: "#fff",
        cream: "#BD998D",
        light: "#F8F5F2",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", ...defaultTheme.fontFamily.sans],
        second: ["var(--font-dancing)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
