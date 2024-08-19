import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// components
import { Layout } from "@/components/Layout/";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Accordion } from "@/components/Collapse/Collapse";
import { SliderThumbs } from "@/components/SliderThumbs";
import { SwiperSlide } from "swiper/react";
// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useTypedSelector } from "@/redux/store";
import { handleCloseModals } from "@/redux/modals";

import Arrow from "@/public/icons/arrow.svg";
import Personalize from "@/public/icons/personalize.svg";

import streetmap from "@/public/wallart-preview/streetmap-preview-second-details.png";

//
import {
  sizes,
  orientations,
  materials,
  frames,
  MATERIAL_PRICES,
} from "@/layouts/wallartAttributes";

import "./styles/starmap.scss";

interface IProductLayout {
  sliderProps?: any;
  slides?: any;
  children?: React.ReactElement;
  productId?: string | number;
  shippingSettings?: {}[];
  title?: React.ReactElement | string;
  desc?: React.ReactElement | string;
}

export const ProductLayout: FC<IProductLayout> = ({
  sliderProps,
  slides,
  children,
  productId,
  shippingSettings = [],
  title,
  desc,
}) => {
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const handleGoToEditor = () => {
    router.push({
      pathname: "/editor",
      query: { product_id: productId },
    });
    dispatch(handleCloseModals());
  };

  return (
    <>
      {isRendered && (
        <div className="flex flex-col lg:flex-row gap-[2rem] justify-between py-[6rem] star-map-details">
          <div className="w-full lg:w-[50%]">
            <div className="product-preview-slider">
              <div className="w-full h-[400px] md:h-[50vh] xl:h-[50vh] max-h-[650px] bg-secondary">
                <SliderThumbs
                  props={{
                    sliderSpaceBetween: 10,
                    thumbPerView: 3,
                    thumbSliderSpaceBetween: 20,
                    thumbBreakpoints: {
                      320: {
                        slidesPerView: 2.2,
                        spaceBetween: 12,
                      },

                      768: {
                        slidesPerView: 3.5,
                        spaceBetween: 12,
                        thumbPerView: 4,
                      },

                      980: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                        thumbPerView: 5,
                      },
                    },
                  }}
                  mainSlider={
                    <>
                      {slides.map(({ thumbnail }, idx) => {
                        return (
                          <div key={idx} className={"rounded-16"}>
                            <SwiperSlide>
                              <Image
                                src={thumbnail}
                                layout="fill"
                                //   width={200}
                                //   height={200}
                                objectFit="contain"
                                objectPosition="center center"
                                alt="streetmap"
                              />
                            </SwiperSlide>
                          </div>
                        );
                      })}
                    </>
                  }
                  secondSlider={
                    <>
                      {slides.map(({ thumbnail }, idx) => {
                        return (
                          <div key={idx}>
                            <SwiperSlide>
                              <Image
                                src={thumbnail}
                                layout="fill"
                                //   width={200}
                                //   height={200}
                                objectFit="contain"
                                objectPosition="center center"
                                alt="streetmap"
                              />
                            </SwiperSlide>
                          </div>
                        );
                      })}
                    </>
                  }
                />
              </div>
            </div>
          </div>

          {/* desk */}

          <div className="w-full lg:w-[45%]">
            {typeof title == "function" ? (
              title
            ) : (
              <h1 className="text-h4">{title}</h1>
            )}

            {typeof desc == "function" ? (
              desc
            ) : (
              <p className="text-bodySmall mt-[2rem]">{desc}</p>
            )}

            <Button
              className="text-caption flex items-center gap-[0.8rem] rounded-lg mt-[4rem] font-semibold"
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                // TODO: REMOVE STORAGE OR NOT ( NEED TO THINK )
                //   localStorage.removeItem("map-storage");
                handleGoToEditor();
              }}
            >
              <Personalize
                style={{ width: "1.2rem", height: "1.2rem" }}
                fill="#fff"
              />
              Personalize
            </Button>

            {shippingSettings.length ? (
              <ul className="mt-[4rem] flex flex-col gap-[1rem] bg-secondary p-[2rem] rounded-lg">
                {shippingSettings.map(({ title }: { title: string }, idx) => {
                  return (
                    <li key={idx} className="text-captionSmallBold">
                      {title}
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {children}

            {/* <ProductOptions />
              <ProductDetails />
              <Asked /> */}
          </div>
        </div>
      )}
    </>
  );
};
