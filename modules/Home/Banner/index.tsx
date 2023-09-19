import React from "react";
import Image from "next/image";

// styles
import styles from "./Banner.module.scss";

// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const Banner = () => {
  return (
    <Container className="pt-5">
      <div className={`grid grid-rows-2 grid-cols-12 gap-5 ${styles.banner}`}>
        <div className="relative row-span-2 col-span-6 bg-error">
          <Image
            src="https://www.mapiful.com/cdn-cgi/image/format=auto,width=1024/content/themes/mapiful_v2/classes/campaigns/assets/2023-june/hero.webp"
            alt="banner"
            priority
            quality={20}
            fill
            sizes="500px"
          />

          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-center">
            <h2 className="font-second text-6xl mb-4">Summer Sale</h2>
            <span className="font-extrabold text-8xl mb-5 inline-block">
              20%OFF
            </span>
            <p className="uppercase font-semibold text-2xl tracking-widest">
              EVERYTHING ON SITE
              <br />
              OUR BIGGEST SALE
              <br />
              OF THE YEAR
            </p>
          </div>
        </div>
        <div className="relative bg-error col-span-3">
          <Image
            src="https://www.mapiful.com/cdn-cgi/image/format=auto,width=1024/content/themes/mapiful_v2/classes/campaigns/assets/2023-may/secondary.webp"
            alt="banner"
            priority
            quality={20}
            fill
            sizes="500px"
          />
        </div>

        <div className="relative bg-error col-span-3">
          <Image
            src="https://www.mapiful.com/cdn-cgi/image/format=auto,width=1024/content/uploads/2022/02/Ebook-How-to-make-your-home-more-you-Home-Page.jpg"
            alt="banner"
            priority
            quality={20}
            fill
            sizes="500px"
          />
        </div>

        <div className="justify-center font-bold text-5xl bg-light col-span-6 py-12 px-24">
          <div className="text-center flex flex-col items-center h-full">
            <h1 className="font-sans text-3xl mb-4 mx-auto">
              Custom posters for
              <br /> meaningful moments
            </h1>
            <p className="text-xl font-second font-normal">
              Make your home more you with unique prints and products that truly
              express who you are. Great art tells a story, and we`re sure that
              you have some amazing stories to share with the world.
            </p>

            <Button href="/lineart-editor" classNames="mt-auto flex">Design your own</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
