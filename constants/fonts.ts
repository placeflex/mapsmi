import { Alex_Brush, Dancing_Script, Sofia_Sans } from "next/font/google";

export const main_font = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["300", "400", "600", "800"],
});

export const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const alexbrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-brush",
  weight: ["400"],
});
