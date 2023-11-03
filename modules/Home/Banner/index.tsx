import React from "react";
import Image from "next/image";

// styles
import styles from "./Banner.module.scss";

// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { haandleShowProductModal } from "@/redux/modals";

export const Banner = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Container className="pt-5">
      <Button
        onClick={() => dispatch(haandleShowProductModal())}
        classNames="mt-5 flex"
      >
        Design your own
      </Button>
      {/* <div
        className={`grid grid-rows-2 grid-cols-12 gap-5  lg:gap-0  ${styles.banner}`}
      >
        <div className="relative row-span-2 col-span-6 lg:col-span-12 lg:row-span-3">
          <Image
            src="https://www.mapiful.com/cdn-cgi/image/format=auto,width=1024/content/themes/mapiful_v2/classes/campaigns/assets/2023-june/hero.webp"
            alt="banner"
            priority
            quality={20}
            fill
            sizes="500px"
          />

          <div className="absolute w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-center">
            <h2 className="font-second text-6xl mb-4">Summer Sale</h2>
            <span className="font-extrabold text-8xl mb-5 inline-block lg:text-4xl lg:mb-3">
              20%OFF
            </span>
            <p className="uppercase font-semibold text-2xl tracking-widest lg:text-sm">
              EVERYTHING ON SITE
              <br />
              OUR BIGGEST SALE
              <br />
              OF THE YEAR
            </p>
          </div>
        </div>
        <div className="relative bg-error col-span-3 lg:hidden">
          <Image
            src="https://www.mapiful.com/cdn-cgi/image/format=auto,width=1024/content/themes/mapiful_v2/classes/campaigns/assets/2023-may/secondary.webp"
            alt="banner"
            priority
            quality={20}
            fill
            sizes="500px"
          />
        </div>

        <div className="relative bg-error col-span-3 lg:hidden">
          <Image
            src="https://www.mapiful.com/cdn-cgi/image/format=auto,width=1024/content/uploads/2022/02/Ebook-How-to-make-your-home-more-you-Home-Page.jpg"
            alt="banner"
            priority
            quality={20}
            fill
            sizes="500px"
          />
        </div>

        <div className="flex items-center justify-center font-bold text-5xl bg-light col-span-6 py-2 px-24 xl:px-12 lg:col-span-12 lg:w-[calc(100%-24px)] lg:mx-auto lg:mt-[-40px] lg:z-[2] lg:py-6 lg:rounded-xl">
          <div className="text-center flex flex-col items-center">
            <h1 className="font-sans text-3xl mb-4 mx-auto lg:text-2xl lg:mb-1">
              Custom posters for
              <br /> meaningful moments
            </h1>
            <p className="text-xl font-second font-normal lg:text-lg">
              Make your home more you with unique prints and products that truly
              express who you are. Great art tells a story, and we`re sure that
              you have some amazing stories to share with the world.
            </p>

            <Button
              onClick={() => dispatch(haandleShowProductModal())}
              classNames="mt-5 flex"
            >
              Design your own
            </Button>
          </div>
        </div>
      </div> */}
    </Container>
  );
};
