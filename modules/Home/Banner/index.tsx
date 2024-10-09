import React from "react";
import Image from "next/image";
import clsx from "clsx";

// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

// stores
import { useDispatch } from "react-redux";
import { handleShowProductModal } from "@/redux/modals";

import pos from "@/public/home/newbrand.jpg";

// styles
import styles from "./Banner.module.scss";

import Frame from "@/public/frame.png";
import streetmapAlt from "@/public/wallart-preview/streetmap-preview-second-landscape.jpg";
import streetmap from "@/public/wallart-preview/streetmap-preview-second.jpg";
import lineartAlt from "@/public/wallart-preview/lineart-preview-second-landscape.jpg";
import starmap from "@/public/wallart-preview/starmap-preview-second.jpg";
import starmapAlt from "@/public/wallart-preview/starmap-preview-second-landscape.jpg";
import zodiac from "@/public/wallart-preview/zodiac-preview-second-landscape.jpg";
import zodiacAlt from "@/public/wallart-preview/zodiac-preview-second.jpg";

import Marquee from "react-fast-marquee";

export const Banner = () => {
  const dispatch = useDispatch();

  return (
    <div className="row  banner-preview">
      <div
        className={clsx(
          "w-full poster absolute z-20 top-[50%] translate-y-[-50%] px-[1.5rem]"
        )}
      >
        <Container>
          <div
            className={clsx(
              `flex flex-col items-start justify-center w-full py-[4rem]`
            )}
          >
            <h1 className="text-h4 lg:text-h2 text-primary mb-[1.5rem] font-semibold leading-[1.3]">
              Personalized Posters <br />
              for Special Memories
            </h1>
            <p className="text-primary text-bodySmall lg:text-body mb-[2rem] font-semibold">
              Transform your space with unique prints that reflect your
              personality. Exceptional art tells your story, and we believe you
              have remarkable tales to share.
            </p>
            <Button
              onClick={() => dispatch(handleShowProductModal())}
              type="button"
              color="primary"
              className="text-bodySmall"
              rounded={true}
            >
              Get Started
            </Button>
          </div>
        </Container>
      </div>
      {/* <div
        className={clsx(
          `flex flex-col items-start justify-center w-full py-[4rem] absolute z-20 top-[50%] translate-y-[-50%] px-[1.5rem]`
          // styles.posterInner
        )}
      >
        <h1 className="text-h4 lg:text-h2 text-primary mb-[1.5rem] font-semibold leading-[1.3]">
          Your Memories,
          <br />
          Mapped Masterfully
        </h1>
        <p className="text-primary text-bodySmall lg:text-body mb-[2rem] font-semibold">
          Cherish your most treasured memories with our three distinct types of
          maps.
        </p>
        <Button
          onClick={() => dispatch(handleShowProductModal())}
          type="button"
          color="primary"
          className="text-bodySmall"
          rounded={true}
        >
          Get Started
        </Button>
      </div> */}
      <Marquee autoFill={false} gradientWidth={0} direction="right">
        <div className="flex h-full">
          <div className="column">
            <img src={Frame.src} />
            <img src={streetmapAlt.src} />
          </div>
          <div className="column">
            <img src={streetmap.src} />
            <img src={zodiac.src} />
          </div>
          <div className="column">
            <img src={Frame.src} />
            <img src={streetmapAlt.src} />
          </div>
          <div className="column">
            <img src={streetmap.src} />
            <img src={zodiac.src} />
          </div>
        </div>
      </Marquee>
    </div>
  );
};
