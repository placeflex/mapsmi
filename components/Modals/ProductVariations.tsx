import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";

// import Map from "@/public/productsPreview/Map.png";
// import SkyMap from "@/public/productsPreview/SkyMap.png";
// import Art from "@/public/productsPreview/LineArt.png";

import streetmapAlt from "@/public/wallart-preview/streetmap-preview-second-landscape.jpg";
import streetmap from "@/public/wallart-preview/streetmap-preview-second.jpg";

import lineart from "@/public/wallart-preview/lineart-preview-second.jpg";
import LineartAlt from "@/public/wallart-preview/lineart-preview-second-landscape.jpg";

import starmap from "@/public/wallart-preview/starmap-preview-second.jpg";
import starmapAlt from "@/public/wallart-preview/starmap-preview-second-landscape.jpg";

import zodiac from "@/public/wallart-preview/zodiac-preview-second-landscape.jpg";
import zodiacAlt from "@/public/wallart-preview/zodiac-preview-second.jpg";

// components
import { Button } from "@/components/Button";
import { ModalContent } from "./ModalContent";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/store";
import { useTypedSelector } from "@/stores/store";
import { handleCloseModals } from "@/stores/modals";

export const ProductVariations = () => {
  const dispatch: AppDispatch = useDispatch();
  const productModal = useTypedSelector(({ modals }) => modals.productModal);
  const router = useRouter();

  const handleGoToEditor = (id: number) => {
    router.push({
      pathname: "/editor",
      query: { product_id: id },
    });
    dispatch(handleCloseModals());
  };

  return (
    <ModalContent isModalOpen={productModal} bgClose bgColor="bg-white">
      <div className="flex py-[4rem] px-[2rem] pb-[1.5rem] gap-4 overflow-x-auto scroll-snap-x  md:hide-scrollbar md:mask-right lg:mask-none hide-scrollbar rounded-md hide-scroll">
        <div className="flex flex-col items-center">
          <div className="relative w-[300px] h-[300px] block">
            {/* <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            /> */}

            <Image
              alt="banner"
              src={streetmap}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="mt-5 text-[2rem] font-semibold">StreetMap</h3>
          <p className="w-[270px] text-center text-[1.2rem] mb-[2rem] mt-2 line-clamp-2">
            Design your own personalised map poster! Pick the place, and
            personalize the text, color and size.
          </p>

          <Button
            type="button"
            className="mt-auto flex font-semibold text-[1.2rem] w-full justify-center"
            onClick={() => handleGoToEditor(2)}
            color="primary"
            rounded
          >
            Design your own
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-[300px] h-[300px] block">
            <Image
              // src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              src={lineart}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            {/* <img
              src={lineartAlt.src}
              alt="LineArt Poster"
              className="block w-full h-full object-contain"
            /> */}
          </div>
          <h3 className="mt-5 text-[2rem] font-semibold">LineArt</h3>
          <p className="w-[270px] text-center text-[1.2rem] mb-[2rem] mt-2 line-clamp-2">
            Bring a minimalistic feel to your interior with our curated
            collection of line art prints.
          </p>

          <Button
            type="button"
            className={clsx("mt-auto flex font-semibold text-[1.2rem] w-full justify-center")}
            onClick={() => handleGoToEditor(0)}
            color="primary"
            rounded
          >
            Design your own
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-[300px] h-[300px] block">
            {/* <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            /> */}

            <Image
              alt="banner"
              src={starmap}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="mt-5 text-[2rem] font-semibold">Sky Map</h3>
          <p className="w-[270px] text-center text-[1.2rem] mb-[2rem] mt-2 line-clamp-2">
            Easily create personalized prints of the night sky! Customize the
            text, dates and location.
          </p>
          <Button
            type="button"
            className="mt-auto flex font-semibold text-[1.2rem] w-full justify-center"
            onClick={() => handleGoToEditor(1)}
            color="primary"
            rounded
          >
            Design your own
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-[300px] h-[300px] block">
            {/* <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            /> */}
            {/* <img
              src={zodiacAlt.src}
              alt="Sky Map"
              className="block w-full h-full object-contain"
            /> */}

            <Image
              alt="banner"
              src={zodiacAlt}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="mt-5 text-[2rem] font-semibold">Zodiac</h3>
          <p className="w-[270px] text-center text-[1.2rem] mb-[2rem] mt-2 line-clamp-2">
            Bring a minimalistic feel to your interior with our curated
            collection of line art prints.
          </p>
          <Button
            type="button"
            className="mt-auto flex font-semibold text-[1.2rem] w-full justify-center"
            onClick={() => handleGoToEditor(3)}
            color="primary"
            rounded
          >
            Design your own
          </Button>
        </div>
      </div>
    </ModalContent>
  );
};
