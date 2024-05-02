// components
import { Slider } from "@/components/Slider";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

import { SwiperSlide } from "swiper/react";

import Image from "next/image";

import terra from "@/public/mapColors/terra.png";
import metropolis from "@/public/mapColors/metropolis.png";
import horizon from "@/public/mapColors/horizon.png";

import streetmap from "@/public/wallart-preview/streetmap.png";
import streetmapAlt from "@/public/wallart-preview/streetmap-alt.png";

import lineart from "@/public/wallart-preview/lineart.png";
import lineartAlt from "@/public/wallart-preview/lineart-alt.png";

import starmap from "@/public/wallart-preview/starmap.png";
import starmapAlt from "@/public/wallart-preview/starmap-alt.png";

import zodiac from "@/public/wallart-preview/zodiac.png";
import zodiacAlt from "@/public/wallart-preview/zodiac-alt.png";

import example from "@/public/frame-full.png";
import exampleTest from "@/public/frame-full-second.png";
import LineArt from "@/public/lineart-example.png";

const slides = [
  {
    id: 1,
    title: "Street Map",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem]">
        Design your own personalised map poster! <br />
        Pick the place, and personalize the text, color and size.
      </p>
    ),
    image: streetmap,
    imageAlt: streetmapAlt,
  },
  {
    id: 2,
    title: "LineArt",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem]">
        Bring a minimalistic feel to your interior with <br /> our curated
        collection of line art prints.
      </p>
    ),
    image: lineart,
    imageAlt: lineartAlt,
  },
  {
    id: 3,
    title: "Star Map",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem]">
        Bring a minimalistic feel to your interior with <br /> our curated
        collection of line art prints.
      </p>
    ),
    image: starmap,
    imageAlt: starmapAlt,
  },
  {
    id: 4,
    title: "Zodiac",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem]">
        Bring a minimalistic feel to your interior with <br /> our curated
        collection of line art prints.
      </p>
    ),
    image: zodiacAlt,
    imageAlt: zodiac,
  },
];

export const OurPosters = () => {
  return (
    <div>
      <Container>
        <div className="py-[5rem]">
          <h2 className="text-h4 font-semibold mb-[.5rem]">
            Products You Might Like
          </h2>
          <h3 className="text-bodySmall">
            Transform your precious moments into artwork that lasts.
          </h3>
          <button className="swiper-button-prev">PREV</button>
          <Slider
            loop={true}
            slidesPerView={4}
            spaceBetween={20}
            // pagination={{ clickable: false }}
            // autoplay={{
            //   delay: 3500,
            //   pauseOnMouseEnter: true,
            // }}
            // className="mt-[2rem]"
          >
            {slides.map(({ image, imageAlt, id, title, description }) => {
              return (
                <SwiperSlide key={id}>
                  <div className="relative flex flex-col bg-fff shadow-md">
                    <div className="w-full relative aspect-square">
                      <Image
                        src={image}
                        alt="terra"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                        priority={true}
                      />
                    </div>
                    {imageAlt && (
                      <div className="transition w-full aspect-square absolute top-0 left-0 right-0 bottom-0 opacity-0 z-10 hover:opacity-100 mb-[2rem]">
                        <Image
                          src={imageAlt}
                          alt="terra"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          quality={100}
                          priority={true}
                        />
                      </div>
                    )}

                    <div className="py-[1rem] px-[1rem] flex flex-col">
                      <h3 className="text-body">{title}</h3>

                      {description}

                      <span className="block mt-[.5rem] font-semibold text-caption">
                        €44.99-79.99
                      </span>

                      <Button
                        // onClick={() => dispatch(handleShowProductModal())}
                        type="button"
                        color="primary"
                        variant="contained"
                        className="text-caption mt-[1.5rem]"
                      >
                        Створіть свій власний
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Slider>
          <button className="swiper-button-next">NEXT</button>
        </div>
      </Container>
    </div>
  );
};
