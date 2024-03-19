import frame1 from "@/public/frames/icons/frame1.png";
import frame2 from "@/public/frames/icons/frame2.png";
import frame3 from "@/public/frames/icons/frame3.png";
import frame4 from "@/public/frames/icons/frame4.png";
import frame5 from "@/public/frames/icons/frame5.png";

export interface SizeInterface {
  name: string;
  id: number;
}

const replaceDemenssionss = size => {
  const sizeDemenssions = size.split(/\D+/).filter(Boolean).map(Number);

  return {
    width: Math.round((sizeDemenssions[0] * 300) / 2.54),
    height: Math.round((sizeDemenssions[1] * 300) / 2.54),
  };
};

const RENDER_SIZES = [
  { id: 0, ...replaceDemenssionss("30x40cm") },
  { id: 1, ...replaceDemenssionss("50x70cm") },
  { id: 2, ...replaceDemenssionss("70x100cm") },
];

export const sizes = [
  { name: "30x40cm", id: 0, ...replaceDemenssionss("30x40cm") },
  { name: "50x70cm", id: 1, ...replaceDemenssionss("50x70cm") },
  { name: "70x100cm", id: 2, ...replaceDemenssionss("70x100cm") },
];

export const MATERIAL_PRICES = [
  {
    id: 0,
    prices: [
      { id: 0, price: 400 },
      { id: 1, price: 500 },
      { id: 2, price: 600 },
    ],
  },
  {
    id: 1,
    prices: [
      { id: 0, price: 680 },
      { id: 1, price: 1200 },
      { id: 2, price: 1500 },
    ],
  },
  {
    id: 2,
    prices: [
      { id: 0, price: 1300 },
      { id: 1, price: 1800 },
      { id: 2, price: 3200 },
    ],
  },
];

export const materials = [
  {
    name: "Paper",
    id: 0,
    sizes: [
      { ...sizes[0], id: 0 },
      { ...sizes[1], id: 1 },
      { ...sizes[2], id: 2 },
    ],
  },
  {
    name: "Plastik",
    id: 1,
    sizes: [
      { ...sizes[0], id: 0 },
      { ...sizes[1], id: 1 },
      { ...sizes[2], id: 2 },
    ],
  },
  {
    name: "Holst",
    id: 2,
    sizes: [
      { ...sizes[0], id: 0 },
      { ...sizes[1], id: 1 },
      { ...sizes[2], id: 2 },
    ],
  },
];

export interface OrientationsInterface {
  name: string;
  id: number;
}

export const orientations = [
  { name: "Portrait", id: 0 },
  { name: "Landscape", id: 1 },
];

export const FRAMES_PRICES = [
  { id: 0, price: 0 },
  { id: 1, price: 15.99, oldPrice: 39.99 },
  { id: 2, price: 25.99, oldPrice: 39.99 },
  { id: 3, price: 35.99, oldPrice: 39.99 },
  { id: 4, price: 43.99, oldPrice: 59.99 },
  { id: 5, price: 53.99, oldPrice: 59.99 },
  { id: 6, price: 63.99, oldPrice: 59.99 },
  { id: 7, price: 73.99, oldPrice: 59.99 },
];

export const frames = [
  {
    id: 0,
    name: "none",
    color: "",
    material: "",
  },
  {
    id: 1,
    name: "type-hanger",
    color: "color-natural",
    material: "material-wood",
    icon: frame1,
  },
  {
    id: 2,
    name: "type-hanger",
    color: "color-white",
    material: "material-wood",
    icon: frame2,
  },
  {
    id: 3,
    name: "type-hanger",
    color: "color-black",
    material: "material-wood",
    icon: frame3,
  },
  {
    id: 4,
    name: "type-frame",
    color: "color-natural",
    material: "material-wood",
    icon: frame4,
  },
  {
    id: 5,
    name: "type-frame",
    color: "color-white",
    material: "material-wood",
    icon: frame5,
  },
  {
    id: 6,
    name: "type-frame",
    color: "color-black",
    material: "material-metal",
    icon: frame5,
  },
  {
    id: 7,
    name: "type-frame",
    color: "color-black",
    material: "material-wood",
    icon: frame5,
  },
];
