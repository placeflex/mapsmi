import Image from "next/image";
import { useRouter } from "next/router";

import Map from "@/public/productsPreview/Map.png";
import SkyMap from "@/public/productsPreview/SkyMap.png";
import Art from "@/public/productsPreview/LineArt.png";

// components
import { Button } from "@/components/Button";
import { ModalContent } from "./ModalContent";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useTypedSelector } from "@/redux/store";
import { handleCloseModals } from "@/redux/modals";

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
    <ModalContent isModalOpen={productModal} bgClose>
      <div className="flex py-10 px-8 gap-4 overflow-x-auto scroll-snap-x  md:hide-scrollbar md:mask-right lg:mask-none hide-scrollbar rounded-md">
        <div className="flex flex-col items-center">
          <div className="relative h-[300px] block">
            {/* <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            /> */}
            <img
              src={Map.src}
              alt="StreetMap"
              className="block w-full h-full object-contain"
            />
          </div>
          <h3 className="mt-5 font-bold">StreetMap</h3>
          <p className="w-[200px] text-center text-[0.6em] mb-2 mt-2">
            Design your own personalised map poster! Pick the place, and
            personalize the text, color and size.
          </p>

          <Button
            type="button"
            classNames="mt-auto flex"
            onClick={() => handleGoToEditor(2)}
          >
            Design your own
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-[300px] block">
            {/* <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            /> */}
            <img
              src={Art.src}
              alt="LineArt Poster"
              className="block w-full h-full object-contain"
            />
          </div>
          <h3 className="mt-5 font-bold">LineArt</h3>
          <p className="w-[200px] text-center text-[0.6em] mb-2 mt-2">
            Bring a minimalistic feel to your interior with our curated
            collection of line art prints.
          </p>

          <Button
            type="button"
            classNames="mt-auto flex"
            onClick={() => handleGoToEditor(0)}
          >
            Design your own
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-[300px] block">
            {/* <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            /> */}
            <img
              src={SkyMap.src}
              alt="Sky Map"
              className="block w-full h-full object-contain"
            />
          </div>
          <h3 className="mt-5 font-bold">Sky Map</h3>
          <p className="w-[200px] text-center text-[0.6em] mb-2 mt-2">
            Easily create personalized prints of the night sky! Customize the
            text, dates and location.
          </p>
          <Button
            type="button"
            classNames="mt-auto flex"
            onClick={() => handleGoToEditor(1)}
          >
            Design your own
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative h-[300px] block">
            {/* <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            /> */}
            <img
              src={SkyMap.src}
              alt="Sky Map"
              className="block w-full h-full object-contain"
            />
          </div>
          <h3 className="mt-5 font-bold">Sky Map</h3>
          <p className="w-[200px] text-center text-[0.6em] mb-2 mt-2">ZODIAC</p>
          <Button
            type="button"
            classNames="mt-auto flex"
            onClick={() => handleGoToEditor(3)}
          >
            Design your own
          </Button>
        </div>
      </div>
    </ModalContent>
  );
};
