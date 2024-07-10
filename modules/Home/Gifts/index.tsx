import { FC } from "react";

import { Slider } from "@/components/Slider";
import { Container } from "@/components/Container";
import { SwiperSlide } from "swiper/react";
import { TopSellCategoriesCard } from "@/components/TopSellCategoriesCard";

const slides = [
  {
    src: "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/term_square_fallback/public/fields/media.image.field_media_image/2023-02/chicagojpg.jpg?itok=yRNGI2RE",
  },
  {
    src: "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/term_square_fallback/public/fields/media.image.field_media_image/2023-02/new-yorkjpg.jpg?itok=nlMcXZLe",
  },
  {
    src: "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/term_square_fallback/public/fields/mediaimagefieldmediaimage/2023-03/miamijpg.jpg?itok=u2WUlGUq",
  },
  {
    src: "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/term_square_fallback/public/fields/media.image.field_media_image/2023-02/las-vegasjpg.jpg?itok=GYsIPhzi",
  },
  {
    src: "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/term_square_fallback/public/fields/media.image.field_media_image/2023-02/parisjpg.jpg?itok=wdjUkpiw",
  },
  {
    src: "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/term_square_fallback/public/fields/media.image.field_media_image/2023-02/romejpg.jpg?itok=ceu_S6wZ",
  },
  {
    src: "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/term_square_fallback/public/fields/media.image.field_media_image/2023-02/londonjpg.jpg?itok=DtxisB4O",
  },
];

export const Gifts: FC = (): React.ReactNode => {
  return (
    <div className="bg-primaty">
      <Container>
        <div className="py-[5rem]">
          <div className="flex">
            <div>
              <h2 className="text-h4 font-semibold mb-[.5rem]">Gifts</h2>
              <h3 className="text-bodySmall">
                We&apos;re your one-stop gift shop for everyone on your list.
              </h3>
            </div>
          </div>

          <div className="mt-[2rem]">
            <Slider
              loop={false}
              pagination={{ clickable: false }}
              // navigation={false}
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
              {slides.map(({ src }, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <TopSellCategoriesCard
                      title="Chicago Posters"
                      src={src}
                      className="w-full bg-secondary"
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
