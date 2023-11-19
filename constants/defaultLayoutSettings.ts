import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// dependencies
import { svgList } from "@/layouts/LayoutSettings/iconsList";
import { basicColors } from "@/layouts/LayoutSettings/colorsList";
import { basicLayoutStyles } from "@/layouts/LayoutSettings/artworkStylesList";
import { sizes, orientations } from "@/layouts/LayoutAttributes";
import { fontsList } from "@/layouts/LayoutSettings/layoutFonts";

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
      color: basicColors[0].id,
      layoutStyle: basicLayoutStyles[0],
      font: fontsList[0].id,
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
