import Image from "next/image";

import terra from "@/public/mapColors/terra.png";
import metropolis from "@/public/mapColors/metropolis.png";
import horizon from "@/public/mapColors/horizon.png";

const BLACK_GRADIENT =
  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 45.51%, rgba(0, 0, 0, 0.97) 100%)";

const WHITE_GRADIENT =
  "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 45.51%, rgba(255, 255, 255, 0.97) 100%)";

const TURQ_GRADIENT =
  "linear-gradient(rgba(24, 39, 42, 0) 0%, rgba(24, 39, 42, 0.85) 45.51%, rgba(24, 39, 42, 0.97) 100%)";

const VINTAGE_GRADIENT =
  "linear-gradient(rgba(95, 33, 34, 0) 0%, rgba(95, 33, 34, 0.85) 45.51%, rgba(95, 33, 34, 0.97) 100%)";

const TEXT_WHITE = "#fff";
const TEXT_BLACK = "#000";
const VINTAGE_COLOR = "#ECC698";

export const mapColors = [
  {
    icon: (
      <Image
        src={terra}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 0,
    name: "terra",
    textColor: TEXT_BLACK,
    gradientColor: WHITE_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
        gradientColor: WHITE_GRADIENT,
        bgColor: "#fff",
      },
    },
  },
  {
    icon: (
      <Image
        src={metropolis}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 1,
    name: "metropolis",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 2,
    name: "horizon",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 3,
    name: "volcano",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 4,
    name: "magma",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: TEXT_WHITE,

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_BLACK,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 5,
    name: "magmanew",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: TEXT_BLACK,

    layoutOverrides: {
      bold: {
        // textColor: TEXT_BLACK,
        // bgColor: TEXT_BLACK,
      },
      // ["bold-full"]: { textColor: TEXT_BLACK },
      // script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
      // crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
];
