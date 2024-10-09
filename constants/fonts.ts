import {
  Alex_Brush,
  Dancing_Script,
  Sofia_Sans,
  Montserrat,
  Alice,
  Montserrat_Alternates,
  Edu_VIC_WA_NT_Beginner,
} from "next/font/google";

// export const main_font = Montserrat_Alternates({
//   subsets: ["latin"],
//   variable: "--font-main",
//   // weight: ["300", "400", "600", "800"],
//   weight: ["400"],
//   display: "swap",
//   adjustFontFallback: false,
// });

export const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
  adjustFontFallback: false,
});

export const alexbrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-brush",
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

export const edu = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  variable: "--font-edu",
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});
