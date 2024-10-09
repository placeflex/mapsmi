import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Slider = ({ children, ...props }) => {
  return (
    <Swiper
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      // spaceBetween={20}
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      {...props}
    >
      {children}
    </Swiper>
  );
};
