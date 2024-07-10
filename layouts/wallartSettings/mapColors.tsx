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
const GOLD_COLOR = "#D4B356";
const DEEP_BLACK = "#2E2E2E";
const SILVER_COLOR = "#F6F6F6";

const maskOverridesBgs = {
  0: "#F1F1F1",
  1: "#3358AC",
  2: "#EC352D",
  3: "#2E2E2E",
};

const applyMaskOverridesStyles = styles => {
  const styleNames = [
    "minimal",
    "minimal-full",
    "bold",
    "bold-full",
    "script",
    "brush",
    "crispi",
    "lopster",
    "noir",
  ];

  const styl = styleNames.reduce((acc, name) => {
    acc[name] = styles;
    return acc;
  }, {});

  return styl;
};

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
    bgColor: TEXT_WHITE,
    layoutOverrides: {},
    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: TEXT_BLACK,
        gradientColor: "",
        bgColor: maskOverridesBgs[0],
      }),
    },
  },
  {
    icon: (
      <Image
        src={metropolis}
        alt="Metropolis"
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
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },

    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: TEXT_BLACK,
        gradientColor: "",
        bgColor: maskOverridesBgs[1],
      }),

      ["minimal"]: {
        textColor: TEXT_WHITE,
        gradientColor: maskOverridesBgs[2],
        bgColor: maskOverridesBgs[1],
      },

      ["minimal-full"]: {
        textColor: TEXT_WHITE,
        gradientColor: maskOverridesBgs[2],
        bgColor: maskOverridesBgs[1],
      },

      ["bold"]: {
        textColor: TEXT_BLACK,
        gradientColor: maskOverridesBgs[2],
        bgColor: maskOverridesBgs[1],
      },

      ["script"]: {
        textColor: TEXT_BLACK,
        bgColor: maskOverridesBgs[1],
        gradientColor: maskOverridesBgs[2],
      },

      ["lopster"]: {
        textColor: TEXT_WHITE,
        bgColor: maskOverridesBgs[1],
        gradientColor: maskOverridesBgs[2],
      },

      ["noir"]: {
        textColor: TEXT_WHITE,
        bgColor: maskOverridesBgs[1],
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
    textColor: TEXT_BLACK,
    gradientColor: WHITE_GRADIENT,
    bgColor: TEXT_WHITE,

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
      },

      ["bold-full"]: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
      },

      ["brush"]: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
        gradientColor: GOLD_COLOR,
      },

      ["script"]: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
        gradientColor: GOLD_COLOR,
      },

      ["minimal-full"]: {
        textColor: TEXT_WHITE,
        gradientColor: BLACK_GRADIENT,
      },

      ["minimal"]: {
        textColor: TEXT_WHITE,
        gradientColor: BLACK_GRADIENT,
      },

      lopster: {
        textColor: TEXT_WHITE,
        bgColor: TEXT_WHITE,
      },

      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: GOLD_COLOR,
        gradientColor: GOLD_COLOR,
        bgColor: DEEP_BLACK,
      }),

      bold: {
        textColor: TEXT_BLACK,
        bgColor: DEEP_BLACK,
        gradientColor: GOLD_COLOR,
      },

      ["bold-full"]: {
        textColor: TEXT_BLACK,
        bgColor: DEEP_BLACK,
        gradientColor: GOLD_COLOR,
      },

      ["script"]: {
        textColor: TEXT_BLACK,
        bgColor: DEEP_BLACK,
        gradientColor: GOLD_COLOR,
      },

      ["brush"]: {
        textColor: TEXT_BLACK,
        bgColor: DEEP_BLACK,
        gradientColor: GOLD_COLOR,
      },

      ["crispi"]: {
        textColor: TEXT_BLACK,
        bgColor: DEEP_BLACK,
        gradientColor: GOLD_COLOR,
      },

      ["nori"]: {
        textColor: DEEP_BLACK,
        bgColor: DEEP_BLACK,
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
    bgColor: TEXT_BLACK,

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
      },
      ["bold-full"]: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
      },
      script: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
      },
      brush: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
      },
      crispi: {
        textColor: TEXT_BLACK,
        bgColor: TEXT_WHITE,
      },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: TEXT_BLACK,
        gradientColor: TEXT_BLACK,
        bgColor: SILVER_COLOR,
      }),
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
    id: 4,
    name: "cosmos",
    applyName: "Cosmos",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: TEXT_WHITE,

    layoutOverrides: {
      bold: { textColor: TEXT_BLACK },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
      crispi: { textColor: TEXT_BLACK, bgColor: TEXT_WHITE },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
      lopster: {
        textColor: TEXT_WHITE,
        gradientColor: TEXT_WHITE,
        bgColor: "transparent",
      },
    },

    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: TEXT_BLACK,
        gradientColor: "",
        bgColor: maskOverridesBgs[0],
      }),
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
    id: 5,
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

    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: TEXT_BLACK,
        gradientColor: "",
        bgColor: maskOverridesBgs[0],
      }),
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
    name: "spectrum",
    applyName: "Spectrum",
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

    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: TEXT_BLACK,
        gradientColor: "",
        bgColor: maskOverridesBgs[0],
      }),
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
    name: "cityscape",
    applyName: "Cityscape",
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

    maskOverrides: {
      ...applyMaskOverridesStyles({
        textColor: TEXT_BLACK,
        gradientColor: "",
        bgColor: maskOverridesBgs[0],
      }),
    },
  },
];
