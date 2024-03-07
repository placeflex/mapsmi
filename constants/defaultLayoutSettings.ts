import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// dependencies
import { lineArtIconsList } from "@/layouts/LayoutSettings/lineArtIconsList";
import { zodiacIconsList } from "@/layouts/LayoutSettings/zodiacIconsList";
import { basicColors } from "@/layouts/LayoutSettings/colorsList";
import { basicLayoutStyles } from "@/layouts/LayoutSettings/artworkStylesList";
import {
  sizes,
  orientations,
  materials,
  frames,
} from "@/layouts/LayoutAttributes";
import { fontsList } from "@/layouts/LayoutSettings/layoutFonts";

export const defaultLayoutSettings = {
  poster: {
    labels: {
      heading: "Write your heading",
      divider: "",
      subline: "",
      tagline: "",
    },
    styles: {
      artwork: lineArtIconsList[0].id,
      color: basicColors[0].id,
      layoutStyle: basicLayoutStyles[0],
      font: fontsList[0].id,
    },
  },
  selectedAttributes: {
    orientation: orientations[0],
    size: sizes[2],
    material: materials[0],
    frame: frames[0],
  },
  productId: 0,
  date: dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
  locationsDropdown: [],
  locations: [],
  markers: [],
  uuid: uuidv4(),
  editingProfileProject: false,
  connectLocations: false,
  renderMarkers: false,
  renderLabels: false,
  elementsColor: "#fff",
  labelsTextColor: "#000",
  // price: materials[0].sizes[2].price,
};

export const defaultZodiacArtSettings = {
  ...defaultLayoutSettings,

  poster: {
    ...defaultLayoutSettings.poster,
    styles: {
      ...defaultLayoutSettings.poster.styles,
      artwork: zodiacIconsList[0].id,
      maskId: 0,
      overlayId: 0,
      isOverlay: false,
      isMask: false,
    },
  },
};

export const defaultSkyMapLayoutSettings = {
  ...defaultLayoutSettings,

  poster: {
    ...defaultLayoutSettings.poster,
    styles: {
      ...defaultLayoutSettings.poster.styles,
      maskId: 0,
      overlayId: 0,
      isOverlay: false,
      isMask: false,
      grid: true,
      lines: true,
      milkyway: true,
      stars: true,
      labels: true,
    },
  },
};
