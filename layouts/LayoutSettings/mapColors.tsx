import WhiteAndBlack from "@/public/mapColors/WhiteAndBlack.png";
import Old from "@/public/mapColors/Old.png";
import Poland from "@/public/mapColors/Poland.png";
import Red from "@/public/mapColors/Red.png";
import Yellow from "@/public/mapColors/Yellow.png";
import Cyber from "@/public/mapColors/Cyber.png";

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
      <img src={WhiteAndBlack.src} alt="alt" className="block w-full h-full" />
    ),
    id: 0,
    url: "https://api.mapbox.com/styles/v1/luxmapdev/clppv0up8012v01o0h0gmaznv",
    textColor: TEXT_BLACK,
    gradientColor: WHITE_GRADIENT,
  },
  {
    icon: <img src={Red.src} alt="alt" className="block w-full h-full" />,
    id: 1,
    url: "https://api.mapbox.com/styles/v1/luxmapdev/clppv6ohj010401qt1r2abhxa",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
  },
  {
    icon: <img src={Yellow.src} alt="alt" className="block w-full h-full" />,
    id: 2,
    url: "https://api.mapbox.com/styles/v1/luxmapdev/clppvethf011i01pjfhfpag16",

    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
  },
  {
    icon: <img src={Old.src} alt="alt" className="block w-full h-full" />,
    id: 3,
    url: "https://api.mapbox.com/styles/v1/luxmapdev/clppvchu5013e01o94d4u8frl",
    textColor: VINTAGE_COLOR,
    gradientColor: VINTAGE_GRADIENT,
  },
  {
    icon: <img src={Cyber.src} alt="alt" className="block w-full h-full" />,
    id: 4,
    url: "https://api.mapbox.com/styles/v1/luxmapdev/clppv9v2p012001pkcohzfu0u",

    textColor: TEXT_WHITE,
    gradientColor: TURQ_GRADIENT,
  },
  {
    icon: <img src={Poland.src} alt="alt" className="block w-full h-full" />,
    id: 5,
    url: "https://api.mapbox.com/styles/v1/luxmapdev/clppvgb8i013s01r5gcc6aoyj",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
  },
];
