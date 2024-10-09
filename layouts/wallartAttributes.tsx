import Image from "next/image";
import frame1 from "@/public/frames/icons/frame1.png";
import frame2 from "@/public/frames/icons/frame2.png";
import frame3 from "@/public/frames/icons/frame3.png";
import frame4 from "@/public/frames/icons/frame4.png";
import frame5 from "@/public/frames/icons/frame5.png";
import frame6 from "@/public/frames/icons/frame6.png";
import frame7 from "@/public/frames/icons/frame6.png";
import empty from "@/public/frames/icons/empty.png";
import Empty from "@/public/frames/icons/empty.svg";

// orientations
import Landscape from "@/public/orientations/landscape.svg";
import Portrain from "@/public/orientations/portrait.svg";

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

// const RENDER_SIZES = [
//   { id: 0, ...replaceDemenssionss("30x40cm") },
//   { id: 1, ...replaceDemenssionss("50x70cm") },
//   { id: 2, ...replaceDemenssionss("60x90cm") },
// ];

export const ROUTE_TYPES = {
  0: {
    name: "airplane",
    id: 0,
    pic: "https://storage.mixplaces.com/mixplace-files/s3fs-public/fields/mediaiconfieldmediaicon/icon-route-airplane.png",
  },
  1: {
    name: "driving",
    id: 1,
    pic: "https://storage.mixplaces.com/mixplace-files/s3fs-public/fields/mediaiconfieldmediaicon/icon-route-driving.png",
  },
  2: {
    name: "walking",
    id: 2,
    pic: "https://storage.mixplaces.com/mixplace-files/s3fs-public/fields/mediaiconfieldmediaicon/icon-route-walking.png",
  },
};

export const sizes = [
  { name: "30x40cm", id: 0, ...replaceDemenssionss("30x40cm") },
  { name: "50x70cm", id: 1, ...replaceDemenssionss("50x70cm") },
  { name: "60x90cm", id: 2, ...replaceDemenssionss("60x90cm") },
  // { name: "40x50cm", id: 3, ...replaceDemenssionss("40x50cm") },
];

const SMALL_MATERIAL_PRICE = 33.74;
const SMALL_MATERIAL_OLD_PRICE = 44.99;
//
const MEDIUM_MATERIAL_PRICE = 44.99;
const MEDIUM_MATERIAL_OLD_PRICE = 59.99;
//
const BIG_MATERIAL_PRICE = 59.99;
const BIG_MATERIAL_OLD_PRICE = 79.99;

export const MATERIAL_PRICES = [
  {
    id: 0,
    prices: [
      { id: 0, price: SMALL_MATERIAL_PRICE },
      { id: 1, price: MEDIUM_MATERIAL_PRICE },
      { id: 2, price: BIG_MATERIAL_PRICE },
      //
      // { id: 3, price: 1800 },
    ],
  },
  {
    id: 1,
    prices: [
      { id: 0, price: SMALL_MATERIAL_PRICE },
      { id: 1, price: MEDIUM_MATERIAL_PRICE },
      { id: 2, price: BIG_MATERIAL_PRICE },
      // { id: 1, price: 1599 },
      // { id: 2, price: 1899 },
      //
      // { id: 3, price: 2400 },
    ],
  },
  {
    id: 2,
    prices: [
      { id: 0, price: SMALL_MATERIAL_PRICE },
      { id: 1, price: MEDIUM_MATERIAL_PRICE },
      { id: 2, price: BIG_MATERIAL_PRICE },
      // { id: 1, price: 1800 },
      // { id: 2, price: 3200 },
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
      //
      // { ...sizes[3], id: 3 },
    ],
  },
  // {
  //   name: "Plastik",
  //   id: 1,
  //   sizes: [
  //     { ...sizes[0], id: 0 },
  //     { ...sizes[1], id: 1 },
  //     { ...sizes[2], id: 2 },
  //   ],
  // },
  // {
  //   name: "Holst",
  //   id: 1,
  //   sizes: [
  //     { ...sizes[0], id: 0 },
  //     { ...sizes[1], id: 1 },
  //     { ...sizes[2], id: 2 },
  //     //
  //     // { ...sizes[3], id: 3 },
  //   ],
  // },
];

export interface OrientationsInterface {
  name: string;
  id: number;
}

export const orientations = [
  { name: "Portrait", id: 0, icon: <Portrain /> },
  { name: "Landscape", id: 1, icon: <Landscape /> },
];

// export const FRAMES_PRICES = [
//   { id: 0, price: 0 },
//   { id: 1, price: 15.99, oldPrice: 39.99 },
//   { id: 2, price: 25.99, oldPrice: 39.99 },
//   { id: 3, price: 35.99, oldPrice: 39.99 },
//   { id: 4, price: 43.99, oldPrice: 59.99 },
//   { id: 5, price: 53.99, oldPrice: 59.99 },
//   { id: 6, price: 63.99, oldPrice: 59.99 },
//   { id: 7, price: 73.99, oldPrice: 59.99 },
// ];

export const FRAMES_TYPES = {
  0: "small",
  1: "medium",
  2: "big",
};

const emptyFrame = {
  id: 0,
  name: "",
  color: "",
  material: "",
  price: 0,
  icon: <Empty width={20} height={20} />,
};

const SMALL_FRAME_PRICE = 26.99;
const SMALL_FRAME_OLD_PRICE = 29.99;
//
const MEDIUM_FRAME_PRICE = 35.99;
const MEDIUM_FRAME_OLD_PRICE = 39.99;
//
const BIG_FRAME_PRICE = 53.99;
const BIG_FRAME_OLD_PRICE = 59.99;

export const frames = {
  0: [
    emptyFrame,
    {
      id: 1,
      name: "type-frame",
      color: "color-natural",
      material: "material-wood",
      price: SMALL_FRAME_PRICE,
      oldPrice: SMALL_FRAME_OLD_PRICE,
      type: FRAMES_TYPES[0],
      icon: <Image src={frame4} layout="fill" alt="frame" objectFit="cover" />,
    },
    {
      id: 2,
      name: "type-frame",
      color: "color-white",
      material: "material-wood",
      price: SMALL_FRAME_PRICE,
      oldPrice: SMALL_FRAME_OLD_PRICE,
      type: FRAMES_TYPES[0],
      icon: <Image src={frame5} layout="fill" alt="frame" objectFit="cover" />,
    },
    {
      id: 3,
      name: "type-frame",
      color: "color-black",
      material: "material-wood",
      type: FRAMES_TYPES[0],
      price: SMALL_FRAME_PRICE,
      oldPrice: SMALL_FRAME_OLD_PRICE,
      icon: <Image src={frame6} layout="fill" alt="frame" objectFit="cover" />,
    },
  ],
  1: [
    emptyFrame,
    {
      id: 1,
      name: "type-frame",
      color: "color-natural",
      material: "material-wood",
      price: MEDIUM_FRAME_PRICE,
      oldPrice: MEDIUM_FRAME_OLD_PRICE,
      type: FRAMES_TYPES[1],
      icon: <Image src={frame4} layout="fill" alt="frame" objectFit="cover" />,
    },
    {
      id: 2,
      name: "type-frame",
      color: "color-white",
      material: "material-wood",
      price: MEDIUM_FRAME_PRICE,
      oldPrice: MEDIUM_FRAME_OLD_PRICE,

      type: FRAMES_TYPES[1],
      icon: <Image src={frame5} layout="fill" alt="frame" objectFit="cover" />,
    },
    {
      id: 3,
      name: "type-frame",
      color: "color-black",
      material: "material-wood",
      price: MEDIUM_FRAME_PRICE,
      oldPrice: MEDIUM_FRAME_OLD_PRICE,

      type: FRAMES_TYPES[1],
      icon: <Image src={frame6} layout="fill" alt="frame" objectFit="cover" />,
    },
  ],
  2: [
    emptyFrame,
    {
      id: 1,
      name: "type-frame",
      color: "color-natural",
      material: "material-wood",
      price: BIG_FRAME_PRICE,
      oldPrice: BIG_FRAME_OLD_PRICE,

      type: FRAMES_TYPES[2],
      icon: <Image src={frame4} layout="fill" alt="frame" objectFit="cover" />,
    },
    {
      id: 2,
      name: "type-frame",
      color: "color-white",
      material: "material-wood",
      price: BIG_FRAME_PRICE,
      oldPrice: BIG_FRAME_OLD_PRICE,

      type: FRAMES_TYPES[2],
      icon: <Image src={frame5} layout="fill" alt="frame" objectFit="cover" />,
    },
    {
      id: 3,
      name: "type-frame",
      color: "color-black",
      material: "material-wood",
      price: BIG_FRAME_PRICE,
      oldPrice: BIG_FRAME_OLD_PRICE,

      type: FRAMES_TYPES[2],
      icon: <Image src={frame6} layout="fill" alt="frame" objectFit="cover" />,
    },

    // {
    //   id: 4,
    //   name: "type-hanger",
    //   color: "color-natural",
    //   material: "material-wood",
    //   price: 0,
    //   oldPrice: 0,
    //   type: FRAMES_TYPES[2],
    //   icon: <Image src={frame1} layout="fill" alt="frame" objectFit="cover" />,
    // },
    // {
    //   id: 5,
    //   name: "type-hanger",
    //   color: "color-white",
    //   material: "material-wood",
    //   icon: <Image src={frame2} layout="fill" alt="frame" objectFit="cover" />,
    // },
    // {
    //   id: 6,
    //   name: "type-hanger",
    //   color: "color-black",
    //   material: "material-wood",
    //   icon: <Image src={frame3} layout="fill" alt="frame" objectFit="cover" />,
    // },

    ,
  ],
  // 3: [
  //   emptyFrame,
  //   {
  //     id: 1,
  //     name: "type-frame",
  //     color: "color-natural",
  //     material: "material-wood",
  //     price: 2198,
  //     oldPrice: 2299,

  //     type: FRAMES_TYPES[3],
  //     icon: <Image src={frame4} layout="fill" alt="frame" objectFit="cover" />,
  //   },
  //   {
  //     id: 2,
  //     name: "type-frame",
  //     color: "color-white",
  //     material: "material-wood",
  //     price: 2198,
  //     oldPrice: 2299,

  //     type: FRAMES_TYPES[3],
  //     icon: <Image src={frame5} layout="fill" alt="frame" objectFit="cover" />,
  //   },
  //   {
  //     id: 3,
  //     name: "type-frame",
  //     color: "color-black",
  //     material: "material-wood",
  //     price: 2198,
  //     oldPrice: 2299,

  //     type: FRAMES_TYPES[3],
  //     icon: <Image src={frame6} layout="fill" alt="frame" objectFit="cover" />,
  //   },
  // ],
};
