import { svgList } from "@/modules/LineartSettings/iconsList";
import { paletteArtwork } from "@/modules/LineartSettings/colorsList";
import { artworkTheme } from "@/modules/LineartSettings/artworkStylesList";
import { sizes, orientations } from "@/layouts/LayoutAttributes";
import dayjs from "dayjs";

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
};
