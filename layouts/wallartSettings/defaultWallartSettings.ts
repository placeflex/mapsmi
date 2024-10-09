import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// dependencies
import { lineArtIcons } from "@/layouts/wallartSettings/lineArtIcons";
import { zodiacIcons } from "@/layouts/wallartSettings/zodiacIcons";
import { basicColors } from "@/layouts/wallartSettings/colorsList";
import { basicLayoutStyles } from "@/layouts/wallartSettings/wallartStyles";
import {
  sizes,
  orientations,
  materials,
  frames,
} from "@/layouts/wallartAttributes";
import { fontsList } from "@/layouts/wallartSettings/wallartFonts";

import { ROUTE_TYPES } from "@/layouts/wallartAttributes";

export const RENDER_SCALE_EDITOR_PAGE = 1;
export const RENDER_SCALE_RENDER_PAGE = 10;

export const defaultWallartSettings = {
  poster: {
    labels: {
      heading: "Write your heading",
      divider: "",
      subline: "",
      tagline: "",
    },
    styles: {
      artwork: lineArtIcons[0].id,
      color: basicColors[0].id,
      layoutStyle: basicLayoutStyles[0].id,
      font: fontsList[0].id,
      isMask: false,
      maskId: 0,
      overlayId: 0,
    },
  },
  selectedAttributes: {
    orientation: orientations[0],
    size: sizes[2],
    material: materials[0],
    frame: frames[0][0],
  },
  productId: 0,
  date: dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
  locationsDropdown: [],
  locations: [],
  markers: [],
  uuid: uuidv4(),
  // editingProfileProject: false,
  connectLocations: false,
  renderMarkers: false,
  renderLabels: false,
  elementsColor: "#34deeb",
  labelsTextColor: "#000",
  labelsStyle: "fill",
  customCoordinates: {},
  design_category: [],
  design_type: [],
  gift: [],
  product_type: [],
  orientation: [],
  featured: [],
  cities: [],
  routeType: 0,
  // price: 0,
  name: "",
};

export const defaultZodiacArtSettings = {
  ...defaultWallartSettings,

  poster: {
    ...defaultWallartSettings.poster,
    styles: {
      ...defaultWallartSettings.poster.styles,
      artwork: zodiacIcons[0].id,
      maskId: 0,
      overlayId: 0,
      isOverlay: false,
      isMask: false,
    },
  },
};

export const defaultSkyMapLayoutSettings = {
  ...defaultWallartSettings,

  poster: {
    ...defaultWallartSettings.poster,
    styles: {
      ...defaultWallartSettings.poster.styles,
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
