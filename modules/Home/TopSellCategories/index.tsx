import { FC } from "react";

import { Slider } from "@/components/Slider";
import { Container } from "@/components/Container";
import { SwiperSlide } from "swiper/react";
import { TopSellCategoriesCard } from "@/components/TopSellCategoriesCard";

// icons

import Sports from "@/public/top-selling-categories/sports.png";
import Landmark from "@/public/top-selling-categories/landmark.png";
import Travel from "@/public/top-selling-categories/travel.png";
import Couples from "@/public/top-selling-categories/couples.png";
import Nature from "@/public/top-selling-categories/nature.png";
import Family from "@/public/top-selling-categories/family.png";
import Places from "@/public/top-selling-categories/places.png";
import Astrology from "@/public/top-selling-categories/astrology.png";
import History from "@/public/top-selling-categories/history.png";

import { SliderArrows } from "@/components/Slider/SliderArrows";

const slides = [
  {
    src: Travel.src,
    title: "Travel Posters",
  },
  {
    src: Sports.src,
    title: "Sports Posters",
  },
  {
    src: Landmark.src,
    title: "Landmark Posters",
  },
  {
    src: Couples.src,
    title: "Couples Posters",
  },
  {
    src: Nature.src,
    title: "Nature Posters",
  },
  {
    src: Family.src,
    title: "Family Posters",
  },
  {
    src: Places.src,
    title: "Places Posters",
  },
  {
    src: Astrology.src,
    title: "Astrology Posters",
  },
  {
    src: History.src,
    title: "History Posters",
  },
];

export const TopSellCategories: FC = (): React.ReactNode => {
  return (
    <div className="bg-secondary">
      <Container>
        <div className="py-[5rem]">
          <div className="flex items-center">
            <div className="flex relative w-full items-center">
              <div>
                <h2 className="text-h4 font-semibold mb-[.5rem]">
                  Top Selling Categories
                </h2>
                <h3 className="text-bodySmall">
                  Shop our curated collection of 2023&apos;s hottest posters.
                </h3>
              </div>
            </div>

            {/* <SliderArrows
              nextArrowClasses="swiper-next-top-sell"
              prevArrowClasses="swiper-prev-top-sell"
              wrapperClasses="gap-[1rem]"
              wrapper={false}
            /> */}
          </div>

          <div className="mt-[2rem] relative">
            <SliderArrows
              nextArrowClasses="swiper-next-top-sell top-[50%] right-[-20px] z-10 translate-y-[-50%]"
              prevArrowClasses="swiper-prev-top-sell top-[50%] left-[-20px] z-10 translate-y-[-50%]"
              wrapperClasses="gap-[1rem]"
              wrapper={false}
            />
            <Slider
              loop={false}
              pagination={{ clickable: false }}
              navigation={{
                nextEl: ".swiper-next-top-sell",
                prevEl: ".swiper-prev-top-sell",
              }}
              // autoplay={{
              //   delay: 3500,
              //   pauseOnMouseEnter: true,
              // }}
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
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            >
              {slides.map(({ src, title }, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <TopSellCategoriesCard
                      title={title}
                      src={src}
                      className="w-full"
                    />
                  </SwiperSlide>
                );
              })}
            </Slider>
          </div>

          {/* <Slider
            className="mt-[2rem]"
            loop={false}
            slidesPerView={4}
            spaceBetween={20}
            pagination={{ clickable: false }}
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
              ({ image, imageAlt, id, title, description, disabled }) => {
                return <SwiperSlide key={id}></SwiperSlide>;
              }
            )}
          </Slider> */}
        </div>
      </Container>
    </div>
  );
};
