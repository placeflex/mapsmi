import SimpleCircleOverlay from "@/public/overlays/circle-overlay.svg";
import OverlayCity from "@/public/overlays/circle-overlay-city.svg";

export const maskOverlays = [
  {
    id: 0,
    figure: <SimpleCircleOverlay />,
  },
  {
    id: 1,
    figure: <OverlayCity />,
  },
];

export const masks = [
  {
    id: 0,
    src: "https://splashplaces.s3.us-west-2.amazonaws.com/masks/circle-sun.svg",
  },

  {
    id: 1,
    src: "https://splashplaces.s3.us-west-2.amazonaws.com/masks/heart.svg",
  },
  {
    id: 2,
    src: "https://splashplaces.s3.us-west-2.amazonaws.com/masks/splash.svg",
  },

  {
    id: 3,
    src: "https://splashplaces.s3.us-west-2.amazonaws.com/masks/butterfly-heart.svg",
  },
];
