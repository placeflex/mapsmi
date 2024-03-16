// components
import { Slider } from "@/components/Slider";
import { Container } from "@/components/Container";

import { SwiperSlide } from "swiper/react";

import Image from "next/image";

import terra from "@/public/mapColors/terra.png";
import metropolis from "@/public/mapColors/metropolis.png";
import horizon from "@/public/mapColors/horizon.png";
import example from "@/public/example.png";
import exampleTest from "@/public/example-test.png";
import LineArt from "@/public/lineart-example.png";

const slides = [
  {
    id: 1,
    title: "Street Map",
    description: (
      <p className="text-captionSmall mt-[1rem] leading-[2rem]">
        Design your own personalised map poster! <br />
        Pick the place, and personalize the text, color and size.
      </p>
    ),
    image: example,
  },
  {
    id: 2,
    title: "LineArt",
    description: (
      <p className="text-captionSmall mt-[1rem] leading-[2rem]">
        Bring a minimalistic feel to your interior with <br /> our curated
        collection of line art prints.
      </p>
    ),
    image: LineArt,
  },
  {
    id: 3,
    title: "Star Map",
    description: (
      <p className="text-captionSmall mt-[1rem] leading-[2rem]">
        Bring a minimalistic feel to your interior with <br /> our curated
        collection of line art prints.
      </p>
    ),
    image: LineArt,
  },
  {
    id: 4,
    title: "Zodiac",
    description: (
      <p className="text-captionSmall mt-[1rem] leading-[2rem]">
        Bring a minimalistic feel to your interior with <br /> our curated
        collection of line art prints.
      </p>
    ),
    image: LineArt,
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
          <Slider
            slidesPerView={4}
            spaceBetween={20}
            pagination={{ clickable: false }}
            autoplay={{}}
            className="mt-[3rem]"
          >
            {slides.map(({ image, id, title, description }) => {
              return (
                <SwiperSlide key={id}>
                  <div className="relative flex flex-col bg-white">
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

                    <div className="py-[2rem] px-[1rem] text-center">
                      <h3 className="text-bodySmall font-semibold">{title}</h3>

                      {description}

                      <span className="block mt-[1rem] font-semibold text-caption">
                        €44.99-79.99
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Slider>
        </div>
      </Container>
    </div>
  );
};
