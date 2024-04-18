import Image from "next/image";

import terra from "@/public/mapColors/1.png";
import metropolis from "@/public/mapColors/2.png";
import gold from "@/public/mapColors/3.png";
import black from "@/public/mapColors/4.png";
// import white from "@/public/mapColors/3.png";
import magma from "@/public/mapColors/6.png";
import magmaNew from "@/public/mapColors/7.png";
import road from "@/public/mapColors/8.png";

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
        objectFit="cover"
        quality={100}
      />
    ),
    id: 0,
    name: "terra",
    applyName: "Terra",
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
        objectFit="cover"
        quality={100}
      />
    ),
    id: 1,
    name: "metropolis",
    applyName: "Metropolis",
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
        src={gold}
        alt="street map"
        layout="fill"
        priority={false}
        objectFit="cover"
        quality={100}
      />
    ),
    id: 2,
    name: "horizon",
    applyName: "Horizon",
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
        src={black}
        alt="street map"
        layout="fill"
        priority={false}
        objectFit="cover"
        quality={100}
      />
    ),
    id: 3,
    name: "volcano",
    applyName: "Volcano",
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
        src={magma}
        alt="street map"
        layout="fill"
        priority={false}
        objectFit="cover"
        quality={100}
      />
    ),
    id: 4,
    name: "magma",
    applyName: "Magma",
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
      lopster: {
        textColor: TEXT_BLACK,
        gradientColor: BLACK_GRADIENT,
        bgColor: TEXT_BLACK,
      },
    },
  },
  {
    icon: (
      <Image
        src={magmaNew}
        alt="street map"
        layout="fill"
        priority={false}
        objectFit="cover"
        quality={100}
      />
    ),
    id: 5,
    name: "magmanew",
    applyName: "Magma New",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: TEXT_BLACK,

    layoutOverrides: {
      bold: {},
      brush: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
      crispi: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
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
        src={road}
        alt="street map"
        layout="fill"
        priority={false}
        objectFit="cover"
        quality={100}
      />
    ),
    id: 6,
    name: "road_trip",
    applyName: "Road Trip",
    textColor: TEXT_BLACK,
    gradientColor: WHITE_GRADIENT,
    bgColor: TEXT_WHITE,

    layoutOverrides: {
      bold: {},
      brush: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
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
        src={road}
        alt="street map"
        layout="fill"
        priority={false}
        objectFit="cover"
        quality={100}
      />
    ),
    id: 7,
    name: "tokyo",
    applyName: "Tokyo",
    textColor: TEXT_BLACK,
    gradientColor: WHITE_GRADIENT,
    bgColor: TEXT_WHITE,

    layoutOverrides: {
      bold: {},
      brush: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
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
        src={road}
        alt="street map"
        layout="fill"
        priority={false}
        objectFit="cover"
        quality={100}
      />
    ),
    id: 8,
    name: "taragona",
    applyName: "Taragona",
    textColor: TEXT_BLACK,
    gradientColor: WHITE_GRADIENT,
    bgColor: TEXT_WHITE,

    layoutOverrides: {
      bold: {},
      brush: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
      noir: {
        textColor: TEXT_BLACK,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
];
