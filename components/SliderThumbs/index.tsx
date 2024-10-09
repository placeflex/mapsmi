import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export const SliderThumbs = ({ mainSlider, secondSlider, props }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const {
    sliderSpaceBetween,
    thumbPerView,
    thumbSliderSpaceBetween,
    thumbBreakpoints,
  } = props;

  return (
    <>
      <Swiper
        spaceBetween={sliderSpaceBetween}
        // navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-thumbs swiper-thumbs-main"
      >
        {mainSlider}
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
        spaceBetween={thumbSliderSpaceBetween}
        slidesPerView={thumbPerView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-thumbs-second"
        breakpoints={thumbBreakpoints}
      >
        {secondSlider}
      </Swiper>
    </>
  );
};
