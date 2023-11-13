import {
  Alex_Brush,
  Dancing_Script,
  Sofia_Sans,
  Montserrat,
} from "next/font/google";

export const main_font = Montserrat({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["300", "400", "600", "800"],
  display: "swap",
});

export const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const alexbrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-brush",
  weight: ["400"],
  display: "swap",
});
