import {
  Lobster,
  Marhey,
  Caveat,
  Montserrat,
  Russo_One,
  Nunito,
  Dancing_Script,
  Alex_Brush,
} from "next/font/google";

export const LobsterFont = Lobster({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  weight: "400",
});

export const MarheyFont = Marhey({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  weight: "400",
});

export const CaveatFont = Caveat({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  weight: "400",
});

export const MontserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  weight: "400",
});

export const RussoOneFont = Russo_One({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  weight: "400",
});

export const NunitoFont = Nunito({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  weight: "400",
});

export const DancingFont = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
});

export const AlexbrushFont = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-poster",
  weight: ["400"],
  display: "swap",
});

export const fontsList = [
  {
    id: 0,
    font: LobsterFont,
    name: "lobster",
  },
  {
    id: 1,
    font: MarheyFont,
    name: "marhey",
  },
  {
    id: 2,
    font: CaveatFont,
    name: "caveat",
  },
  {
    id: 3,
    font: MontserratFont,
    name: "montserrat",
  },
  {
    id: 4,
    font: RussoOneFont,
    name: "russo One",
  },
  {
    id: 5,
    font: NunitoFont,
    name: "nunito",
  },
  {
    id: 6,
    font: DancingFont,
    name: "dancing",
  },
  {
    id: 7,
    font: AlexbrushFont,
    name: "alexbrush",
  },
];
