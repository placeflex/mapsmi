// components
import { Slider } from "@/components/Slider";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

import { SwiperSlide } from "swiper/react";

// components
import { PreviewWallartCard } from "@/components/PreviewWallartCard";

import terra from "@/public/mapColors/terra.png";
import metropolis from "@/public/mapColors/metropolis.png";
import horizon from "@/public/mapColors/horizon.png";

// import streetmap from "@/public/wallart-preview/streetmap.png";
import streetmapAlt from "@/public/wallart-preview/streetmap-preview-second-landscape.jpg";
// import streetmapAlt from "@/public/wallart-preview/streetmap-preview-one.jpg";
// import streetmapAlt from "@/public/wallart-preview/streetmap-alt.png";
// import streetmap from "@/public/wallart-preview/streetmap-preview-second.jpg";
import streetmap from "@/public/wallart-preview/streetmap-preview-second.jpg";

// import lineart from "@/public/wallart-preview/lineart.png";
// import lineartAlt from "@/public/wallart-preview/lineart-alt.png";
import lineart from "@/public/wallart-preview/lineart-preview-second.jpg";
import lineartAlt from "@/public/wallart-preview/lineart-preview-second-landscape.jpg";

import starmap from "@/public/wallart-preview/starmap-preview-second.jpg";
import starmapAlt from "@/public/wallart-preview/starmap-preview-second-landscape.jpg";
// import starmap from "@/public/wallart-preview/starmap.png";
// import starmapAlt from "@/public/wallart-preview/starmap-alt.png";

import zodiac from "@/public/wallart-preview/zodiac-preview-second-landscape.jpg";
import zodiacAlt from "@/public/wallart-preview/zodiac-preview-second.jpg";
// import zodiac from "@/public/wallart-preview/zodiac.png";
// import zodiacAlt from "@/public/wallart-preview/zodiac-alt.png";

import { SliderArrows } from "@/components/Slider/SliderArrows";

import { productRoutes } from "@/constants/routers";

const slides = [
  {
    id: 1,
    title: "Street Map",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem] line-clamp-2">
        Map your special moments with custom-made art made to last a lifetime.
      </p>
    ),
    image: streetmap,
    imageAlt: streetmapAlt,
    href: productRoutes.STREETMAP,
  },
  {
    id: 2,
    title: "LineArt",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem] line-clamp-2">
        Elevate your space with our customizable Line Art prints. Choose from a
        variety of sleek illustrations personalize with text, colors, and size
        with ease.
      </p>
    ),
    image: lineart,
    imageAlt: lineartAlt,
    href: productRoutes.LINEART,
  },
  {
    id: 3,
    title: "Star Map",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem] line-clamp-2">
        Create a personalized star map capturing the celestial arrangement on
        your most cherished moments.
      </p>
    ),
    image: starmap,
    imageAlt: starmapAlt,
    href: productRoutes.STARMAP,
  },
  {
    id: 4,
    title: "Zodiac",
    description: (
      <p className="text-captionSmall mt-[.5rem] leading-[2rem] line-clamp-2">
        Forever remember your special moonlit nights with custom art made to
        last.
      </p>
    ),
    image: zodiacAlt,
    imageAlt: zodiac,
    href: productRoutes.ZODIAC,
  },
  // {
  //   id: 5,
  //   title: "Coordinates",
  //   description: (
  //     <p className="text-captionSmall mt-[.5rem] leading-[2rem]">
  //       Artistically mark the latitude and longitude of your most special
  //       places.
  //     </p>
  //   ),
  //   image: zodiacAlt,
  //   imageAlt: zodiac,
  //   disabled: true,
  // },
];

export const OurPosters = () => {
  return (
    <div className="bg-primary">
      <Container>
        <div className="py-[5rem]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-h4 font-semibold mb-[.5rem]">
                Shop our posters
              </h2>
              <h3 className="text-bodySmall">
                Create high-quality, Scandinavian posters and prints inspired by
                your best moments in life.
              </h3>
            </div>
          </div>

          <div className="relative">
            <SliderArrows
              nextArrowClasses="swiper-next-shop top-[50%] right-[-10px] lg:right-[-20px] z-10 translate-y-[-200%]"
              prevArrowClasses="swiper-prev-shop top-[50%] left-[-10px] lg:left-[-20px] z-10 translate-y-[-200%]"
              wrapperClasses="gap-[1rem]"
              wrapper={false}
            />
            <Slider
              className="mt-[2rem]"
              loop={false}
              slidesPerView={4}
              spaceBetween={20}
              pagination={{ clickable: false }}
              navigation={{
                nextEl: ".swiper-next-shop",
                prevEl: ".swiper-prev-shop",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },

                530: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },

                980: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },

                1620: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
            >
              {slides.map(
                ({ image, imageAlt, id, title, description, href }) => {
                  return (
                    <SwiperSlide key={id}>
                      <PreviewWallartCard
                        title={title}
                        description={description}
                        image={image}
                        imageAlt={imageAlt}
                        // disabled={disabled}
                        href={href}
                        className="h-full shadow-md"
                      />
                    </SwiperSlide>
                  );
                }
              )}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
};
