import Image from "next/image";
import { useRouter } from "next/router";

// components
import { Button } from "@/components/Button";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { handleCloseModals } from "@/redux/modals";

export const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleGoToEditor = (id: number) => {
    router.push({
      pathname: "/editor",
      query: { product_id: id },
    });
    dispatch(handleCloseModals());
  };

  const products = [
    {
      product: (
        <div className="flex flex-col items-center w-[33.33%]">
          <div className="relative w-full h-[300px] block">
            <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="font-black mt-5">LINEART</h3>

          <Button
            type="button"
            classNames="mt-5 flex"
            onClick={() => handleGoToEditor(0)}
          >
            Design your own
          </Button>
        </div>
      ),
    },
    {
      product: (
        <div className="flex flex-col items-center w-[33.33%]">
          <div className="relative w-full h-[300px] block">
            <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="font-black mt-5">SKYMAP</h3>

          <Button
            type="button"
            classNames="mt-5 flex"
            onClick={() => handleGoToEditor(1)}
          >
            Design your own
          </Button>
        </div>
      ),
    },
    {
      product: (
        <div className="flex flex-col items-center w-[33.33%]">
          <div className="relative w-full h-[300px] block">
            <Image
              src="https:www.mapiful.com/content/uploads/2023/05/streetmap.webp"
              alt="banner"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="font-black mt-5">LINEART</h3>

          <Button
            type="button"
            classNames="mt-5 flex"
            onClick={() => handleGoToEditor(2)}
          >
            Design your own
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex py-10 px-8 gap-4 mx-auto justify-center">
      {products.map(({ product }) => {
        return product;
      })}
    </div>
  );
};
