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

import {
  RENDER_SCALE_RENDER_PAGE,
  RENDER_SCALE_EDITOR_PAGE,
} from "@/layouts/wallartSettings/defaultWallartSettings";

export const basisMarkerSize = 25;

export const mapMarkers = (render?: any, color?: any): any => {
  return [
    {
      id: 0,
      name: "dot",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" width="${
        render ? 18 * RENDER_SCALE_RENDER_PAGE : 18
      }px" height="${
        render ? 18 * RENDER_SCALE_RENDER_PAGE : 18
      }px" viewBox="0 0 30 30"><path d="M25.582 4.371c-5.871-5.848-15.367-5.824-21.21.047-5.849 5.871-5.825 15.367.046 21.21 5.871 5.849 15.371 5.825 21.215-.046 5.844-5.871 5.824-15.367-.051-21.21Zm0 0" style="stroke:none;fill-rule:nonzero;fill-opacity:1"/><path d="m12.473 22.434-1.657 4.89c2.407.778 5.004.828 7.442.156l-.625-5.082a7.893 7.893 0 0 1-5.16.036ZM7.62 12.32l-5.297-.808c-.699 2.511-.625 5.175.211 7.644l5.156-1.289a7.885 7.885 0 0 1-.07-5.547Zm19.383-1.68-4.664 1.57a7.866 7.866 0 0 1-.23 6.126l5.023.629a13.005 13.005 0 0 0-.13-8.324ZM10.695 2.708l.957 5.188a7.883 7.883 0 0 1 6.047-.27l1.488-4.82a13.02 13.02 0 0 0-8.492-.098ZM20.746 15a5.745 5.745 0 0 1-11.488 0 5.744 5.744 0 0 1 11.488 0Zm0 0" style="stroke:none;fill-rule:nonzero;fill-opacity:1"/></svg>`,
      iconExample: <Dot fill={color} width={20} height={20} />,
    },
    {
      id: 1,
      name: "Flash",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="M11.41 29.324c-.05.649.797.934 1.152.387L22.63 14.059a.625.625 0 0 0-.527-.961h-3.747a.628.628 0 0 1-.562-.899L23.215.9A.626.626 0 0 0 22.652 0H10.187a.625.625 0 0 0-.617.523L6.73 18.176a.624.624 0 0 0 .618.726h4.21a.62.62 0 0 1 .622.672Zm0 0" style="stroke:none;fill-rule:nonzero;fill-opacity:1"/></svg>`,
      iconExample: <Flash fill={color} width={20} height={20} />,
    },
    {
      id: 2,
      name: "Home",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
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
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="M11.977.309A15.037 15.037 0 0 1 15.152 0a.536.536 0 0 1 .532.54.54.54 0 0 1-.348.495 9.965 9.965 0 0 0-5.117 4.547 9.939 9.939 0 0 0-.996 6.754v.02a9.963 9.963 0 0 0 4.293 6.324 9.969 9.969 0 0 0 7.504 1.445h.015a9.99 9.99 0 0 0 4.953-2.633 10.065 10.065 0 0 0 2.77-4.922.531.531 0 0 1 .637-.402c.218.05.375.227.41.437a14.962 14.962 0 0 1-2.457 10.915 14.936 14.936 0 0 1-9.32 6.171 14.95 14.95 0 0 1-11.274-2.16 14.958 14.958 0 0 1-6.441-9.508A14.953 14.953 0 0 1 2.328 6.977a14.972 14.972 0 0 1 9.383-6.61h.004Zm0 0" style="stroke:none;fill-rule:nonzero;fill-opacity:1"/></svg>`,
      iconExample: <Moon fill={color} width={20} height={20} />,
    },
    {
      id: 4,
      name: "Star",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 31 30">
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
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 456.082"><path d="M253.648 83.482c130.393-219.055 509.908 65.493-.513 372.6-514.788-328.942-101.873-598.697.513-372.6zM120.652 35.263c-33.435-3.329-68.719 12.313-88.856 52.852a137.318 137.318 0 00-2.43 7.96c-7.242 23.558-.065 34.106 8.843 34.73 12.461.874 13.888-10.202 17.153-18.991 16.322-43.951 39.622-68.323 68.714-75.715a102.864 102.864 0 00-3.424-.836z"/></svg>`,
      iconExample: <Heart fill={color} width={20} height={20} />,
    },
    {
      id: 6,
      name: "Tennis",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="M19.605 4.387C14.145.12 6.441.567 2.406 5.395c-4.035 4.828-2.875 12.207 2.586 16.484A13.84 13.84 0 0 0 10 24.363l14.07-13.61c-.742-2.382-2.246-4.628-4.465-6.366ZM26.293.004c-2.05 0-3.711 1.605-3.711 3.59 0 1.984 1.66 3.59 3.711 3.59 2.047 0 3.71-1.606 3.71-3.59C30 1.609 28.34.004 26.294.004ZM13.117 24.8c.508.012 1.012-.008 1.512-.055 2.191-.215 3.715-1.137 5.937-.14 1.887.847 2.797 2.632 4.497 4.515.824.914.957 1.067 2.195.664 1.633-.531 2.363-1.617 2.52-3.05.136-1.25-.337-1.325-1.344-2.032-1.551-1.098-2.82-1.933-3.641-2.898-2.012-2.36-.313-4.617-.211-7.2a9.845 9.845 0 0 0 0-.898Zm0 0" style="stroke:none;fill-rule:evenodd;fill-opacity:1"/></svg>`,
      iconExample: <Tennis fill={color} width={20} height={20} />,
    },
    {
      id: 7,
      name: "Tennis Ball",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="M15 0c3.89 0 7.434 1.48 10.098 3.91-.438.356-.848.742-1.243 1.152-2.433 2.555-3.94 6.086-3.94 9.977h-.009v.012h.008c0 3.894 1.508 7.426 3.945 9.98.371.39.77.762 1.184 1.106A14.922 14.922 0 0 1 15 30c-3.863 0-7.387-1.46-10.043-3.863.414-.344.813-.715 1.184-1.11 2.437-2.554 3.945-6.086 3.945-9.98h.012v-.008h-.012c0-3.89-1.508-7.422-3.941-9.976-.395-.41-.81-.797-1.243-1.153A14.933 14.933 0 0 1 15 0Zm12.027 6.04A14.923 14.923 0 0 1 30 15c0 3.383-1.121 6.504-3.012 9.016a12.25 12.25 0 0 1-1.047-.965c-1.949-2.047-3.156-4.88-3.156-8.004h.004v-.008h-.004c0-3.121 1.207-5.953 3.156-7.996.34-.36.704-.695 1.086-1.004ZM3.012 24.015A14.938 14.938 0 0 1 0 15c0-3.36 1.105-6.46 2.973-8.957.382.309.75.64 1.086 1 1.949 2.047 3.156 4.875 3.156 7.996H7.21v.012h.004c0 3.12-1.207 5.953-3.156 8-.329.34-.68.664-1.047.965Zm0 0" style="stroke:none;fill-rule:evenodd;fill-opacity:1"/></svg>`,
      iconExample: <TennisBall fill={color} width={20} height={20} />,
    },
    {
      id: 8,
      name: "American Ball",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="M1.008 17.492C2.758 11.672 6.82 6.77 11.91 3.66c2.524-1.543 5.082-2.562 7.797-3.117l9.969 9.809a20.819 20.819 0 0 1-2.781 7.609c-3.364 5.598-8.973 9.207-14.36 10.871Zm9.043 1.442 1.222-1.204-.691-.683a.743.743 0 0 1 0-1.055.774.774 0 0 1 1.074 0l.692.68 1.222-1.203-.691-.68a.74.74 0 0 1 0-1.059.774.774 0 0 1 1.074 0l.692.684 1.222-1.203-.695-.68a.747.747 0 0 1 0-1.058.774.774 0 0 1 1.074 0l.692.683 1.222-1.207-.691-.676a.747.747 0 0 1 0-1.058.774.774 0 0 1 1.074 0l.691.68 1.223-1.2-.691-.68a.747.747 0 0 1 0-1.058.774.774 0 0 1 1.074 0l2.61 2.566a.74.74 0 0 1 0 1.059.774.774 0 0 1-1.075 0l-.793-.781-1.223 1.203.793.781a.736.736 0 0 1 0 1.055.766.766 0 0 1-1.074 0l-.793-.777-1.223 1.203.793.777a.747.747 0 0 1 0 1.059.766.766 0 0 1-1.074 0l-.793-.778-1.222 1.203.793.778c.293.289.293.77 0 1.058a.774.774 0 0 1-1.075 0l-.793-.781-1.222 1.203.789.781a.736.736 0 0 1 0 1.055.766.766 0 0 1-1.074 0l-.79-.777-1.226 1.203.793.781a.736.736 0 0 1 0 1.055.774.774 0 0 1-1.074 0l-2.606-2.57a.747.747 0 0 1 0-1.06.774.774 0 0 1 1.074 0ZM23.285.082a25.873 25.873 0 0 1 2.277-.039c1.778.035 2.836.25 3.47.871.644.629.85 1.68.929 3.379.039.816.05 1.61.035 2.39ZM9.277 29.605c-3.023.528-6.847.692-8.289-1.054-1.242-1.5-1.11-5.059-.703-7.79Zm0 0" style="stroke:none;fill-rule:evenodd;fill-opacity:1"/></svg>`,
      iconExample: <AmericanBall fill={color} width={20} height={20} />,
    },
    {
      id: 9,
      name: "Winning Cup",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="M24.332 11.133c.918-.246 1.738-.637 2.406-1.133 1.094-.816 1.766-1.922 1.766-3.133 0-.676-.207-1.316-.582-1.894a4.532 4.532 0 0 0-.598-.73 11.577 11.577 0 0 1-1.183 4.241c-.477.961-1.09 1.852-1.809 2.649Zm-8.984 11.11.77 1.929 2.288.058-1.816 1.25.648 1.97-1.89-1.16-1.895 1.16.645-1.97-1.813-1.25 2.29-.058Zm-9.735-2.497h19.469V29.95H5.613Zm10.91-5.078v1.594h.133v1.113h-3.379v-1.113h.133v-1.606a11.363 11.363 0 0 1-5.48-2.332l-.18.45c-2.121-.032-4.04-.684-5.43-1.723C.887 9.984 0 8.504 0 6.867c0-.926.285-1.8.797-2.59H.793c.52-.797 1.27-1.492 2.187-2.039l.829-.492h-.961V.051h24.109v1.695h-.766l.829.492c.914.547 1.664 1.242 2.183 2.04h.004c.508.78.793 1.656.793 2.59 0 1.636-.887 3.112-2.324 4.187-1.39 1.035-3.309 1.691-5.43 1.722l-.18-.453a11.33 11.33 0 0 1-5.543 2.344Zm-5.05 3.824h6.992v1.113h-6.992Zm1.066-1.117h4.86v1.113h-4.86ZM3.262 10c.668.5 1.488.887 2.41 1.133A11.68 11.68 0 0 1 3.859 8.48a11.535 11.535 0 0 1-1.183-4.242 4.865 4.865 0 0 0-.598.735 3.425 3.425 0 0 0-.582 1.894c0 1.211.672 2.317 1.766 3.133Zm0 0" style="stroke:none;fill-rule:evenodd;fill-opacity:1"/></svg>`,
      iconExample: <WinningCup fill={color} width={20} height={20} />,
    },
    {
      id: 10,
      name: "Puzzle",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="M7.352 29.855c1.441 0 2.617-1.156 2.617-2.574 0-.508-.153-.98-.41-1.379h.07c-1.149-1.382-1.027-2.507.187-2.906h4.028c.453 0 .824-.406.824-.906v-3.922c.285-2.68 1.324-1.887 2.555-1.055 2.96 2.004 4.933-2.746 2.539-4.367-1.883-1.277-2.696.914-4.075.688-.53-.086-.902-.72-1.019-1.68V7.875c0-.5-.371-.91-.824-.91h-3.528c-1.668-.23-1.984-1.461-.691-3.012h-.07c.261-.402.41-.875.41-1.379C9.969 1.152 8.797 0 7.352 0 5.91 0 4.738 1.152 4.738 2.574c0 .504.149.977.41 1.38h-.02c1.294 1.55.981 2.784-.69 3.01H.897c-.453 0-.828.411-.828.911v4.043c.266 1.668 1.36 1.937 2.72.57v.02a2.042 2.042 0 0 1 1.257-.453c1.293 0 2.344 1.285 2.344 2.87 0 1.587-1.051 2.872-2.344 2.872-.461 0-.89-.164-1.258-.45v.079c-1.36-1.371-2.453-1.094-2.719.57v4.098c0 .5.375.906.828.906h4.04c1.218.395 1.343 1.523.19 2.902h.017c-.258.403-.41.875-.41 1.383.003 1.418 1.175 2.57 2.617 2.57ZM22.648 30h-.003c-1.446 0-2.618-1.152-2.618-2.574 0-.504.149-.977.41-1.38h-.015c1.148-1.378 1.027-2.507-.192-2.901h-4.039c-.457 0-.828-.407-.828-.907v-4.09c.196-.62.442-.84.735-.847.132 0 .273.039.425.11.422.19.918.593 1.457.823 2.082.88 3.868-1.343 3.747-3.629-.028-.507-.211-1.011-.489-1.476-1.062-1.781-2.633-1.95-4.152-.934-.77.524-1.387.914-1.738-.308l.02-3.867c.003-.5.37-.91.823-.91h3.54c1.667-.231 1.984-1.465.69-3.012h.02a2.52 2.52 0 0 1-.41-1.383c0-1.418 1.168-2.57 2.614-2.57h.007c1.442 0 2.618 1.152 2.618 2.57 0 .508-.153.98-.41 1.383h.015c-1.293 1.547-.98 2.785.691 3.011h3.54c.453 0 .824.41.824.91v4.043c-.262 1.668-1.356 1.938-2.72.57v.02a2 2 0 0 0-1.253-.453c-1.293 0-2.344 1.285-2.344 2.871s1.051 2.875 2.344 2.875c.461 0 .89-.168 1.254-.453v.078c1.363-1.367 2.457-1.093 2.719.57v4.094c0 .496-.371.907-.825.907h-4.043c-1.214.394-1.34 1.523-.187 2.902h-.02c.258.398.41.871.41 1.379C25.263 28.848 24.09 30 22.649 30Zm0 0" style="stroke:none;fill-rule:evenodd;fill-opacity:1"/></svg>`,
      iconExample: <Puzzle fill={color} width={20} height={20} />,
    },
    {
      id: 11,
      name: "School",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" xml:space="preserve" width="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" height="${
        render ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE : basisMarkerSize
      }px" viewBox="0 0 30 30"><path d="m25.406 24.11-.129-8.188-7.984 3.887a6.204 6.204 0 0 1-2.125.398 6.247 6.247 0 0 1-2.2-.398l-7.624-3.926v8.3c.218 4.31 7.558 5.63 9.812 5.81 1.805.148 8.938-1.442 9.875-3.919.203-.543.328-1.195.375-1.965Zm3.235-14.079v10.004h.187c.129 0 .235.176.235.39v2.692c0 .211-.106.395-.235.395h-.187v.941c.238.074.422.43.422.852 0 .472-.235.867-.516.867h-.918c-.285 0-.516-.39-.516-.867 0-.422.18-.778.418-.852v-.941h-.187c-.125 0-.23-.176-.23-.395v-2.691c0-.215.1-.39.23-.39h.187v-9.419l-9.715 5.086c-1.757.703-3.52.754-5.277 0L1.813 10.31l-.97-.485c-1.206-.832-.905-2.785.22-3.234L13.19.488c1.25-.601 2.5-.695 3.754 0l11.91 6.028c1.293.53 1.547 2.55.043 3.379Zm0 0" style="stroke:none;fill-rule:evenodd;fill-opacity:1"/></svg>`,
      iconExample: <School fill={color} width={20} height={20} />,
    },
  ];
};
