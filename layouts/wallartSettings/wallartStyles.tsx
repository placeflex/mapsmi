import Image from "next/image";

import minimal from "@/public/layouts/minimal.png";
import minimalFull from "@/public/layouts/minimalFull.png";

export interface ArtworkStyleInterface {
  id: number;
  name: string;
  applyName: string;
  icon?: JSX.Element;
}

export const basicLayoutStyles: ArtworkStyleInterface[] = [
  {
    id: 0,
    name: "Minimal",
    applyName: "minimal",
  },
  {
    id: 1,
    name: "UrbanVista",
    applyName: "urban-vista",
  },
  {
    id: 2,
    name: "TerraTone",
    applyName: "terra-tone",
  },
];

export const skyMapLayoutStyles: ArtworkStyleInterface[] = [
  {
    id: 0,
    name: "Minimal",
    applyName: "minimal",
  },
  {
    id: 1,
    name: "Spectrum",
    applyName: "spectrum",
  },
  {
    id: 2,
    name: "Bold",
    applyName: "bold",
  },
  {
    id: 3,
    name: "Bold-full",
    applyName: "bold-full",
  },
  {
    id: 4,
    name: "Lopster",
    applyName: "lopster",
  },
  {
    id: 5,
    name: "Noir",
    applyName: "noir",
  },
];

export const mapLayoutStyles: ArtworkStyleInterface[] = [
  {
    id: 0,
    name: "Minimal",
    applyName: "minimal",
    icon: <Image src={minimal} alt="Minimal" height={80} />,
  },
  {
    id: 1,
    name: "Minimal-Full",
    applyName: "minimal-full",
    icon: <Image src={minimalFull} alt="Minimal" height={80} />,
  },
  {
    id: 2,
    name: "Bold",
    applyName: "bold",
  },
  {
    id: 3,
    name: "Bold-full",
    applyName: "bold-full",
  },
  {
    id: 4,
    name: "Script",
    applyName: "script",
  },
  {
    id: 5,
    name: "Brush",
    applyName: "brush",
  },
  {
    id: 6,
    name: "Crispi",
    applyName: "crispi",
  },
  {
    id: 7,
    name: "Lopster",
    applyName: "lopster",
  },
  {
    id: 8,
    name: "Noir",
    applyName: "noir",
  },
];
