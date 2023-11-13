import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// dependencies
import { svgList } from "@/layouts/LayoutSettings/iconsList";
import { paletteArtwork } from "@/layouts/LayoutSettings/colorsList";
import { artworkTheme } from "@/layouts/LayoutSettings/artworkStylesList";
import { sizes, orientations } from "@/layouts/LayoutAttributes";

export const defaultLineArtSettings = {
  poster: {
    labels: {
      heading: "Write your heading",
      divider: "",
      subline: "",
      tagline: "",
    },
    styles: {
      artwork: svgList[0].id,
      palette: paletteArtwork[0].id,
      theme: artworkTheme[0],
    },
  },
  selectedAttributes: {
    orientation: orientations[0],
    size: sizes[2],
  },
  productId: 0,
  date: dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
  locations: [],
  currentLocation: {},
  uuid: uuidv4(),
  editingProfileProject: false,
};
