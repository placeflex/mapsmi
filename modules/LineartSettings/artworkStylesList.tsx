export interface ArtworkStyleInterface {
  id: number;
  name: string;
  applyName: string;
}

export const artworkTheme: ArtworkStyleInterface[] = [
  {
    id: 0,
    name: "Minimal",
    applyName: "minimal",
  },
  {
    id: 1,
    name: "Bold",
    applyName: "bold",
  },
  {
    id: 2,
    name: "Script",
    applyName: "script",
  },
  {
    id: 3,
    name: "Brush",
    applyName: "brush",
  },
  {
    id: 4,
    name: "Devided",
    applyName: "devided",
  },
  {
    id: 5,
    name: "Boxed",
    applyName: "boxed",
  },
  {
    id: 6,
    name: "Passpartou",
    applyName: "passpartou",
  },
  {
    id: 7,
    name: "Quote (Script)",
    applyName: "quoteScript",
  },
  {
    id: 8,
    name: "Quote (Brush)",
    applyName: "quoteBrush",
  },
  {
    id: 9,
    name: "Quote (Sharp)",
    applyName: "quoteSharp",
  },
];
