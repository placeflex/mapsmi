import Image from "next/image";

import terra from "@/public/mapColors/terra.png";
import metropolis from "@/public/mapColors/metropolis.png";
import horizon from "@/public/mapColors/horizon.png";

import {
  RENDER_SCALE_RENDER_PAGE,
  RENDER_SCALE_EDITOR_PAGE,
} from "@/constants/defaultLayoutSettings";

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

// markers
import Flash from "@/public/markers/flash.svg";
import Dot from "@/public/markers/dot.svg";
import Home from "@/public/markers/home.svg";
import Moon from "@/public/markers/moon.svg";
import Star from "@/public/markers/star.svg";
import Heart from "@/public/markers/heart.svg";
import Tennis from "@/public/markers/tennis.svg";
import TennisBall from "@/public/markers/tennis-ball.svg";
import AmericanBall from "@/public/markers/ball-american-football.svg";
import WinningCup from "@/public/markers/winning-cup.svg";
import Puzzle from "@/public/markers/puzzle.svg";
import School from "@/public/markers/graduation.svg";

export const mapColors = [
  {
    icon: (
      <Image
        src={terra}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 0,
    name: "terra",
    textColor: TEXT_BLACK,
    gradientColor: WHITE_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
        gradientColor: WHITE_GRADIENT,
        bgColor: "#fff",
      },
    },
  },
  {
    icon: (
      <Image
        src={metropolis}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 1,
    name: "metropolis",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 2,
    name: "horizon",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 3,
    name: "volcano",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: "#fff",

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 4,
    name: "magma",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: TEXT_WHITE,

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_BLACK,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
  {
    icon: (
      <Image
        src={horizon}
        alt="street map"
        layout="fill"
        priority={false}
        quality={50}
      />
    ),
    id: 5,
    name: "magmanew",
    textColor: TEXT_WHITE,
    gradientColor: BLACK_GRADIENT,
    bgColor: TEXT_BLACK,

    layoutOverrides: {
      bold: {
        textColor: TEXT_BLACK,
      },
      ["bold-full"]: { textColor: TEXT_BLACK },
      script: { textColor: TEXT_BLACK },
      brush: { textColor: TEXT_BLACK },
      crispi: { textColor: TEXT_BLACK },
      noir: {
        textColor: TEXT_WHITE,
        gradientColor: "transparent",
        bgColor: "transparent",
      },
    },
  },
];

export const mapMarkers = (render?: any, color?: any): any => {
  return [
    {
      id: 0,
      name: "dot",
      icon: `<svg fill="${color}" width="${render ? 200 : 20}px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.955 31.955" xml:space="preserve"><path  d="M27.25 4.655c-6.254-6.226-16.37-6.201-22.594.051-6.227 6.254-6.204 16.37.049 22.594 6.256 6.226 16.374 6.203 22.597-.051 6.224-6.254 6.203-16.371-.052-22.594z"/><path  d="m13.288 23.896-1.768 5.207c2.567.829 5.331.886 7.926.17l-.665-5.416a8.382 8.382 0 0 1-5.493.039zM8.12 13.122l-5.645-.859a13.856 13.856 0 0 0 .225 8.143l5.491-1.375a8.391 8.391 0 0 1-.071-5.909zm20.643-1.789-4.965 1.675a8.39 8.39 0 0 1-.247 6.522l5.351.672a13.868 13.868 0 0 0-.139-8.869zm-17.369-8.45 1.018 5.528a8.395 8.395 0 0 1 6.442-.288l1.583-5.137a13.855 13.855 0 0 0-9.043-.103z"/><circle  cx="15.979" cy="15.977" r="6.117"/></svg>`,
      iconExample: <Dot fill={color} width={20} height={20} />,
    },
    {
      id: 1,
      name: "Flash",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 959.63 959.631"><path d="M364.997 938c-1.601 20.699 25.5 29.9 36.8 12.4l322-500.701c8.6-13.3-1-30.8-16.8-30.8h-119.8c-14.7 0-24.4-15.399-18-28.7L742.597 28.7c6.4-13.3-3.3-28.7-18-28.7H325.896c-9.8 0-18.199 7.1-19.699 16.8l-90.9 564.6c-2 12.199 7.4 23.199 19.7 23.199h134.7c11.699 0 20.899 9.9 19.899 21.6L364.997 938z"/></svg>`,
      iconExample: <Flash fill={color} width={20} height={20} />,
    },
    {
      id: 2,
      name: "Home",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 30 30">
      <g id="surface1">
          <path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;"
              d="M 29.496094 13.65625 L 24.949219 9.109375 L 24.949219 3.859375 C 24.949219 2.90625 24.179688 2.136719 23.230469 2.136719 C 22.28125 2.136719 21.511719 2.90625 21.511719 3.859375 L 21.511719 5.671875 L 18.125 2.285156 C 16.453125 0.613281 13.542969 0.617188 11.871094 2.289062 L 0.503906 13.65625 C -0.167969 14.328125 -0.167969 15.417969 0.503906 16.089844 C 1.175781 16.761719 2.265625 16.761719 2.9375 16.089844 L 14.304688 4.71875 C 14.671875 4.351562 15.328125 4.351562 15.695312 4.71875 L 27.0625 16.089844 C 27.386719 16.410156 27.824219 16.59375 28.28125 16.589844 C 28.71875 16.589844 29.160156 16.425781 29.496094 16.089844 C 30.167969 15.417969 30.167969 14.328125 29.496094 13.65625 Z M 29.496094 13.65625 " />
          <path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;"
              d="M 15.597656 7.984375 C 15.265625 7.652344 14.730469 7.652344 14.402344 7.984375 L 4.402344 17.980469 C 4.246094 18.140625 4.15625 18.355469 4.15625 18.578125 L 4.15625 25.871094 C 4.15625 27.582031 5.542969 28.96875 7.253906 28.96875 L 12.203125 28.96875 L 12.203125 21.300781 L 17.792969 21.300781 L 17.792969 28.96875 L 22.746094 28.96875 C 24.457031 28.96875 25.84375 27.582031 25.84375 25.871094 L 25.84375 18.578125 C 25.84375 18.355469 25.753906 18.136719 25.597656 17.980469 Z M 15.597656 7.984375 " />
      </g>
  </svg>`,
      iconExample: <Home fill={color} width={20} height={20} />,
    },
    {
      id: 3,
      name: "Moon",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 122.88 122.89" style="enable-background:new 0 0 122.88 122.89" xml:space="preserve"><g><path d="M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25l0.01,0l0,0L49.06,1.27 L49.06,1.27z"/></g></svg>`,
      iconExample: <Moon fill={color} width={20} height={20} />,
    },
    {
      id: 4,
      name: "Star",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 31 30" version="1.1">
      <g id="surface1">
      <path style=" stroke:none;fill-rule:evenodd;fill-opacity:1;" d="M 15.5 0.00390625 L 19.765625 10.609375 L 31 11.460938 L 22.402344 18.863281 L 25.078125 29.996094 L 15.5 23.96875 L 5.921875 29.996094 L 8.597656 18.863281 L 0 11.460938 L 11.234375 10.609375 Z M 15.5 0.00390625 "/>
      </g>
      </svg>`,
      iconExample: <Star fill={color} width={20} height={20} />,
    },
    {
      id: 5,
      name: "Heart",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 456.082"><path d="M253.648 83.482c130.393-219.055 509.908 65.493-.513 372.6-514.788-328.942-101.873-598.697.513-372.6zM120.652 35.263c-33.435-3.329-68.719 12.313-88.856 52.852a137.318 137.318 0 00-2.43 7.96c-7.242 23.558-.065 34.106 8.843 34.73 12.461.874 13.888-10.202 17.153-18.991 16.322-43.951 39.622-68.323 68.714-75.715a102.864 102.864 0 00-3.424-.836z"/></svg>`,
      iconExample: <Heart fill={color} width={20} height={20} />,
    },
    {
      id: 6,
      name: "Tennis",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 118.92 122.88" style="enable-background:new 0 0 118.92 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M77.71,17.96C56.07,0.47,25.53,2.31,9.54,22.08C-6.46,41.87-1.86,72.1,19.79,89.62 c6.08,4.92,12.88,8.3,19.85,10.19l55.77-55.77C92.48,34.28,86.51,25.08,77.71,17.96L77.71,17.96z M104.22,0 C96.1,0,89.51,6.58,89.51,14.71c0,8.12,6.59,14.71,14.71,14.71c8.12,0,14.71-6.59,14.71-14.71C118.92,6.58,112.34,0,104.22,0 L104.22,0z M52,101.6c2.01,0.04,4.01-0.03,5.99-0.23c8.69-0.88,14.73-4.66,23.54-0.57c7.48,3.47,11.09,10.79,17.82,18.5 c3.26,3.74,3.79,4.36,8.7,2.72c6.47-2.17,9.37-6.62,9.99-12.51c0.54-5.11-1.34-5.41-5.32-8.31c-6.15-4.5-11.19-7.92-14.45-11.88 c-7.97-9.67-1.23-18.92-0.82-29.5c0.05-1.22,0.04-2.45-0.01-3.67L52,101.6L52,101.6L52,101.6z"/></g></svg>`,
      iconExample: <Tennis fill={color} width={20} height={20} />,
    },
    {
      id: 7,
      name: "Tennis Ball",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 122.88 122.88"
      style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c15.93,0,30.44,6.06,41.36,16.01c-1.79,1.46-3.48,3.05-5.08,4.72C87.75,31.2,81.57,45.66,81.56,61.6 h-0.02v0.04h0.02c0,15.96,6.18,30.42,16.17,40.89c1.52,1.6,3.15,3.12,4.85,4.53c-10.89,9.83-25.32,15.82-41.14,15.82 s-30.25-5.99-41.14-15.83c1.7-1.4,3.33-2.93,4.85-4.53c9.98-10.47,16.17-24.93,16.17-40.89l0.03,0V61.6h-0.03 c-0.01-15.94-6.18-30.4-16.16-40.87c-1.6-1.68-3.3-3.26-5.08-4.72C31,6.06,45.51,0,61.44,0L61.44,0z M110.71,24.74 c7.64,10.24,12.17,22.94,12.17,36.7c0,13.86-4.6,26.64-12.34,36.92c-1.51-1.22-2.95-2.55-4.28-3.95 c-7.99-8.38-12.94-19.97-12.94-32.78l0.02,0V61.6h-0.02c0-12.79,4.95-24.38,12.93-32.75C107.65,27.38,109.14,26,110.71,24.74 L110.71,24.74z M12.34,98.36C4.6,88.08,0,75.3,0,61.44c0-13.76,4.53-26.46,12.17-36.69c1.58,1.26,3.07,2.63,4.46,4.1 c7.98,8.38,12.93,19.96,12.93,32.75h-0.02v0.04h0.02c0,12.8-4.95,24.4-12.94,32.78C15.29,95.81,13.85,97.14,12.34,98.36 L12.34,98.36L12.34,98.36z"/></g></svg>`,
      iconExample: <TennisBall fill={color} width={20} height={20} />,
    },
    {
      id: 8,
      name: "American Ball",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 121.16 122.88" style="enable-background:new 0 0 121.16 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M4.07,71.67c7.07-23.9,23.48-44.02,44.04-56.79C58.29,8.55,68.63,4.36,79.58,2.08l40.28,40.28 c-1.7,10.75-5.19,21-11.24,31.24c-13.59,22.98-36.24,37.79-57.99,44.63L4.07,71.67L4.07,71.67z M40.59,77.59l4.94-4.94l-2.79-2.8 c-1.19-1.19-1.19-3.15,0-4.34l0,0c1.19-1.19,3.15-1.19,4.34,0l2.79,2.79l4.94-4.94l-2.8-2.79c-1.19-1.19-1.19-3.15,0-4.34l0,0 c1.19-1.19,3.15-1.19,4.34,0l2.79,2.8l4.94-4.94l-2.8-2.79c-1.19-1.19-1.19-3.15,0-4.34l0,0c1.19-1.19,3.15-1.19,4.34,0l2.79,2.8 l4.94-4.94l-2.8-2.79c-1.19-1.19-1.19-3.15,0-4.34h0c1.19-1.19,3.15-1.19,4.34,0l2.79,2.8l4.94-4.94l-2.79-2.79 c-1.19-1.19-1.19-3.15,0-4.34l0,0c1.19-1.19,3.15-1.19,4.34,0l10.54,10.54c1.19,1.19,1.19,3.15,0,4.34l0,0 c-1.19,1.19-3.15,1.19-4.34,0l-3.2-3.2l-4.94,4.94l3.2,3.2c1.19,1.19,1.19,3.15,0,4.34l0,0c-1.19,1.19-3.15,1.19-4.34,0l-3.2-3.2 l-4.94,4.94l3.2,3.2c1.19,1.19,1.19,3.15,0,4.34l0,0c-1.19,1.19-3.15,1.19-4.34,0l-3.2-3.2l-4.94,4.94l3.2,3.2 c1.19,1.19,1.19,3.15,0,4.34h0c-1.19,1.19-3.15,1.19-4.34,0l-3.2-3.2l-4.94,4.94l3.2,3.2c1.19,1.19,1.19,3.15,0,4.34l0,0 c-1.19,1.19-3.15,1.19-4.34,0l-3.2-3.2l-4.94,4.94l3.2,3.2c1.19,1.19,1.19,3.15,0,4.34l0,0c-1.19,1.19-3.15,1.19-4.34,0 L33.45,79.14c-1.19-1.19-1.19-3.15,0-4.34l0,0c1.19-1.19,3.15-1.19,4.34,0L40.59,77.59L40.59,77.59z M94.04,0.19 c3.01-0.18,6.07-0.23,9.2-0.16c7.17,0.15,11.45,1.03,14.01,3.58c2.61,2.58,3.44,6.89,3.76,13.88c0.15,3.34,0.2,6.6,0.13,9.81 L94.04,0.19L94.04,0.19z M37.46,121.4c-12.2,2.16-27.65,2.84-33.47-4.32c-5.01-6.16-4.48-20.78-2.83-31.98L37.46,121.4L37.46,121.4 z"/></g></svg>`,
      iconExample: <AmericanBall fill={color} width={20} height={20} />,
    },
    {
      id: 9,
      name: "Winning Cup",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 110.26 122.88" style="enable-background:new 0 0 110.26 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M89.43,45.54c3.38-1,6.39-2.61,8.84-4.65c4.02-3.35,6.5-7.9,6.5-12.87c0-2.78-0.77-5.42-2.15-7.78l0.01,0 c-0.62-1.06-1.36-2.07-2.21-3.01c-0.44,6.2-1.96,12.08-4.34,17.43C94.32,38.61,92.07,42.27,89.43,45.54L89.43,45.54L89.43,45.54z M56.4,91.21l2.83,7.93l8.42,0.24l-6.67,5.14l2.37,8.08l-6.95-4.76l-6.95,4.76l2.37-8.08l-6.67-5.14l8.42-0.24L56.4,91.21 L56.4,91.21z M20.63,80.94h71.55v41.94H20.63V80.94L20.63,80.94z M60.73,60.07v6.55h0.49v4.58l-12.42,0v-4.58l0.49,0v-6.59 c-7.57-1.17-14.49-4.59-20.14-9.59l-0.67,1.85c-7.79-0.13-14.84-2.82-19.95-7.08C3.26,40.83,0,34.75,0,28.01 c0-3.8,1.05-7.4,2.93-10.63l-0.01-0.01c1.9-3.27,4.66-6.13,8.03-8.37L14,6.97l-3.53,0V0h88.61v6.97h-2.82L99.31,9 c3.36,2.24,6.11,5.1,8.02,8.37h0.01c1.87,3.22,2.92,6.82,2.92,10.64c0,6.74-3.26,12.81-8.54,17.21 c-5.11,4.26-12.16,6.95-19.95,7.08l-0.67-1.86C75.39,55.5,68.39,58.94,60.73,60.07L60.73,60.07L60.73,60.07z M42.16,75.79h25.71 v4.58H42.16V75.79L42.16,75.79z M46.08,71.2h17.87v4.58H46.08V71.2L46.08,71.2z M11.99,40.89c2.45,2.05,5.47,3.65,8.85,4.66 c-2.64-3.27-4.89-6.93-6.66-10.9c-2.38-5.34-3.9-11.23-4.34-17.43c-0.83,0.92-1.57,1.94-2.2,3.01l-0.01,0 c-1.37,2.35-2.14,5-2.14,7.78C5.49,32.99,7.97,37.53,11.99,40.89L11.99,40.89z"/></g></svg>`,
      iconExample: <WinningCup fill={color} width={20} height={20} />,
    },
    {
      id: 10,
      name: "Puzzle",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 122.88 112.43" style="enable-background:new 0 0 122.88 112.43" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M29.96,111.88c5.94,0,10.77-4.32,10.77-9.64c0-1.9-0.62-3.67-1.69-5.17l0.29,0c-4.73-5.17-4.23-9.4,0.78-10.88 h16.57c1.87,0,3.4-1.53,3.4-3.4V68.08c1.16-10.04,5.45-7.06,10.5-3.95c12.2,7.51,20.31-10.28,10.45-16.37 c-7.74-4.78-11.09,3.44-16.76,2.59c-2.19-0.33-3.71-2.7-4.19-6.3V29.51c0-1.87-1.53-3.4-3.4-3.4l-14.51,0 c-6.87-0.87-8.17-5.49-2.85-11.3h-0.29c1.07-1.5,1.69-3.27,1.69-5.17C40.73,4.32,35.91,0,29.96,0C24.02,0,19.2,4.32,19.2,9.64 c0,1.9,0.62,3.67,1.69,5.17l-0.07,0c5.32,5.81,4.03,10.44-2.85,11.3H3.4c-1.87,0-3.4,1.53-3.4,3.4v15.16 c1.09,6.24,5.59,7.26,11.19,2.13v0.07c1.5-1.07,3.27-1.69,5.17-1.69c5.32,0,9.64,4.82,9.64,10.76c0,5.94-4.32,10.76-9.64,10.76 c-1.9,0-3.67-0.62-5.17-1.69v0.29c-5.6-5.13-10.1-4.1-11.19,2.14V82.8c0,1.87,1.53,3.4,3.4,3.4l16.63,0 c5.01,1.48,5.52,5.71,0.78,10.88h0.07c-1.06,1.5-1.69,3.27-1.69,5.17C19.2,107.57,24.02,111.89,29.96,111.88L29.96,111.88 L29.96,111.88z M92.92,112.43H92.9c-5.94,0-10.77-4.32-10.77-9.64c0-1.9,0.62-3.67,1.69-5.17h-0.07c4.73-5.17,4.23-9.4-0.78-10.88 l-16.63,0c-1.87,0-3.4-1.53-3.4-3.4V68.01c0.8-2.32,1.82-3.14,3.02-3.17c0.55-0.01,1.13,0.14,1.75,0.4c1.74,0.72,3.78,2.23,6,3.09 c8.56,3.3,15.91-5.03,15.42-13.59c-0.11-1.91-0.88-3.79-2.02-5.53c-4.37-6.68-10.84-7.31-17.08-3.5c-3.18,1.95-5.71,3.42-7.16-1.17 l0.08-14.49c0.01-1.87,1.53-3.4,3.4-3.4l14.56,0c6.87-0.87,8.17-5.49,2.85-11.3h0.07c-1.07-1.5-1.69-3.27-1.69-5.17 c0-5.32,4.82-9.64,10.77-9.64l0.02,0c5.94,0,10.77,4.32,10.77,9.64c0,1.9-0.62,3.67-1.69,5.17h0.07 c-5.32,5.81-4.03,10.44,2.85,11.3h14.56c1.87,0,3.4,1.53,3.4,3.4v15.16c-1.09,6.24-5.59,7.26-11.19,2.13v0.07 c-1.5-1.07-3.27-1.69-5.17-1.69c-5.32,0-9.64,4.82-9.64,10.76c0,5.94,4.32,10.77,9.64,10.77c1.9,0,3.67-0.62,5.17-1.69v0.29 c5.61-5.13,10.1-4.1,11.19,2.14v15.33c0,1.87-1.53,3.4-3.4,3.4l-16.63,0c-5.01,1.48-5.51,5.71-0.78,10.88H102 c1.07,1.5,1.69,3.27,1.69,5.17C103.68,108.11,98.86,112.43,92.92,112.43L92.92,112.43L92.92,112.43z"/></g></svg>`,
      iconExample: <Puzzle fill={color} width={20} height={20} />,
    },
    {
      id: 11,
      name: "School",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" height="${
        render ? 20 * RENDER_SCALE_RENDER_PAGE : 20
      }px" viewBox="0 0 122.88 73.27"
      style="enable-background:new 0 0 122.88 73.27" xml:space="preserve"><style type="text/css"><![CDATA[.st0{fill-rule:evenodd;clip-rule:evenodd;}]]></style><g><path class="st0" d="M104.27,58.88l-0.54-19.99l-32.85,9.49c-2.96,0.65-5.88,0.96-8.74,0.97c-3.07,0.01-6.09-0.32-9.06-0.97 L21.7,38.79v20.27c0.9,10.53,31.11,13.75,40.38,14.19c7.43,0.36,36.78-3.52,40.64-9.57C103.55,62.36,104.07,60.76,104.27,58.88 L104.27,58.88z M117.58,24.5v24.43h0.77c0.53,0,0.96,0.43,0.96,0.96v6.57c0,0.52-0.43,0.96-0.96,0.96h-0.77v2.3 c0.98,0.18,1.73,1.05,1.73,2.08v0c0,1.16-0.96,2.12-2.12,2.12h-3.79c-1.16,0-2.12-0.95-2.12-2.12v0c0-1.03,0.75-1.9,1.73-2.08v-2.3 h-0.77c-0.52,0-0.96-0.43-0.96-0.96v-6.57c0-0.53,0.43-0.96,0.96-0.96h0.77v-23L73.03,38.35c-7.24,1.72-14.48,1.84-21.72,0 L7.18,25.18l-3.99-1.19c-4.97-2.03-3.73-6.8,0.9-7.9L54,1.19c5.15-1.47,10.29-1.7,15.44,0l49.01,14.72 c5.33,1.3,6.38,6.23,0.18,8.26L117.58,24.5L117.58,24.5z"/></g></svg>`,
      iconExample: <School fill={color} width={20} height={20} />,
    },
  ];
};
