import Image from "next/image";
import { useRouter } from "next/router";

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
      <div className="flex bg-bg py-10 px-8 gap-4 overflow-x-auto scroll-snap-x  md:hide-scrollbar md:mask-right lg:mask-none hide-scrollbar rounded-md">
        <div className="flex flex-col items-center">
          <div className="relative w-[280px] h-[300px] block">
            <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            />
          </div>
          <h3 className="font-second mt-5">LINEART</h3>

          <Button
            type="button"
            classNames="mt-5 flex"
            onClick={() => handleGoToEditor(0)}
          >
            Design your own
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-[280px] h-[300px] block">
            <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            />
          </div>
          <h3 className="font-second mt-5">SKYMAP</h3>

          <Button
            type="button"
            classNames="mt-5 flex"
            onClick={() => handleGoToEditor(1)}
          >
            Design your own
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-[280px] h-[300px] block">
            <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
            />
          </div>
          <h3 className="font-second mt-5">LINEART</h3>

          <Button
            type="button"
            classNames="mt-5 flex"
            onClick={() => handleGoToEditor(2)}
          >
            Design your own
          </Button>
        </div>
      </div>
    </ModalContent>
  );
};
