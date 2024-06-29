import Image from "next/image";

// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

// images
import NewBrand from "@/public/home/newbrand.jpg";

export const NewProduct = () => {
  return (
    <div className="h-[70vh] min-h-[70rem] relative flex">
      <div className="w-[50%] h-full  absolute">
        <Image
          src={NewBrand}
          alt="NEW BRAND"
          layout="fill"
          objectFit="cover"
          objectPosition="center right"
        />
      </div>

      <Container className="px-[4rem] h-full">
        <div className="w-[50%] h-full pl-[6rem] ml-auto relative flex flex-col items-center justify-center">
          <div>
            <h1 className="text-h2 mb-[2rem]">New product</h1>
            <p className="text-bodySmall mb-[4rem]">
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
              urna sed consectetur neque tristique pellentesque. Blandit amet,
              sed aenean erat arcu morbi.
            </p>
            <Button
              type="button"
              color="primary"
              variant="contained"
              className="text-caption"
            >
              Створіть свій власний
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
