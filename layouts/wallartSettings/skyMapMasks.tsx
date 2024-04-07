import SimpleCircleOverlay from "@/public/overlays/circle-overlay.svg";
import OverlayCity from "@/public/overlays/circle-overlay-city.svg";
import OverlayCircle from "@/public/overlays/circle-sec.svg";
import OverlayCircleZ from "@/public/overlays/circle-z.svg";
import OverlayCircleK from "@/public/overlays/circle-k.svg";
import OverlayCircleL from "@/public/overlays/circle-l.svg";

export const maskOverlays = [
  {
    id: 0,
    figure: <SimpleCircleOverlay />,
    name: "simple-circle-overlay",
  },
  {
    id: 1,
    figure: <OverlayCity />,
    name: "city-overlay",
  },
  {
    id: 2,
    figure: <OverlayCircle />,
    name: "smash-overlay",
  },
  {
    id: 3,
    figure: <OverlayCircleZ />,
    name: "stars-overlay",
  },
  {
    id: 4,
    figure: <OverlayCircleK />,
    name: "dots-overlay",
  },
];

export const masks = [
  {
    id: 0,
    src: "https://splashplacestest.s3.us-west-004.backblazeb2.com/masks/heart.svg",
  },
  {
    id: 1,
    src: "https://splashplacestest.s3.us-west-004.backblazeb2.com/masks/heart-mask-sec.svg",
  },
  {
    id: 2,
    src: "https://splashplacestest.s3.us-west-004.backblazeb2.com/masks/crash-heart-from-png-900.svg",
  },
];
