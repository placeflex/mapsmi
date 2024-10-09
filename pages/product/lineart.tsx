import React, { FC, useState, useEffect } from "react";

// components
import { Layout } from "@/components/Layout/";
import { Container } from "@/components/Container";

import { ProductLayout } from "../../modules/Product/ProductLayout";
// stores

import { Accordion } from "@/components/Collapse/Collapse";

import Arrow from "@/public/icons/arrow.svg";
import Personalize from "@/public/icons/personalize.svg";

//

import "./styles/starmap.scss";

const slides = [
  {
    thumbnail: "https://www.mapiful.com/content/uploads/2021/06/love.mp4",
  },
  {
    thumbnail: "https://www.mapiful.com/content/uploads/2021/06/dog.mp4",
  },
  {
    thumbnail:
      "https://www.mapiful.com/content/uploads/2021/07/cat-howto-web.mp4",
  },
  {
    thumbnail: "https://www.mapiful.com/content/uploads/2021/06/Baby.mp4",
  },
];

const ProductOptions = () => {
  return (
    <div className="mt-[4rem]">
      <h3 className="text-bodySmall font-semibold">Product Options</h3>

      <div className="flex flex-col gap-[1rem] mt-[2rem]">
        <div className="flex">
          <span className="flex items-center gap-[0.5rem] text-caption">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />
            Orientation:{" "}
          </span>

          <span className="text-caption font-semibold underline inline-block ml-[1rem]">
            Portrait, Landscape
          </span>
        </div>
        <div className="flex">
          <span className="flex items-center gap-[0.5rem] text-caption">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Format:{" "}
          </span>

          <span className="text-caption font-semibold underline inline-block ml-[1rem]">
            30x40cm / 50x70cm / 60x90cm
          </span>
        </div>
        <div className="flex">
          <span className="flex items-center gap-[0.5rem] text-caption">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Material:{" "}
          </span>

          <span className="text-caption font-semibold underline inline-block ml-[1rem]">
            Wood Framed, Matte Poster, Canvas
          </span>
        </div>
        <div className="flex">
          <span className="flex items-center gap-[0.5rem] text-caption">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Finish:{" "}
          </span>

          <span className="text-caption font-semibold underline inline-block ml-[1rem]">
            Natural Wood, Dark Wood, White Wood
          </span>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  return (
    <div className="mt-[4rem]">
      {/* <h3 className="text-bodySmall font-semibold">Product Details</h3> */}

      <p className="text-bodySmall font-semibold">
        How to create your line art poster
      </p>

      <div className="flex flex-col gap-[1rem] mt-[2rem]">
        <div>
          <h5 className="flex items-center gap-[0.4rem] text-captionSmallBold mb-[0.4rem]">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Choose an illustration from our curated collection of line drawings
          </h5>
          <p className="text-caption">
            Easily find a look that suits your interior style from our
            predefined color palettes.
          </p>
        </div>
        <div>
          <h5 className="flex items-center gap-[0.4rem] text-captionSmallBold mb-[0.4rem]">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Pick your theme and colors
          </h5>
          <p className="text-caption">
            What are your most precious romantic moments? From first kisses to
            weddings, pick an illustration that symbolises love to you.
          </p>
        </div>
        <div>
          <h5 className="flex items-center gap-[0.4rem] text-captionSmallBold mb-[0.4rem]">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Personalize your text
          </h5>
          <p className="text-caption">
            Add an uplifting quote, your anniversary date, or some special words
            to your loved one.
          </p>
        </div>
      </div>
    </div>
  );
};

const Asked = () => {
  return (
    <div className="w-full mx-auto mt-[4rem]">
      <h5 className="text-body text-left">Frequently Asked Questions</h5>
      <div className="mt-[2rem]">
        <Accordion
          items={[
            {
              classNames: "shadow-md",
              title: (
                <p className="font-semibold">Do you ship to my country?</p>
              ),
              //   shortTitle: "Illustrations",
              content: (
                <>
                  <p>
                    Mapiful works with 100 printing partners in 30 countries to
                    produce your custom prints closer to you. Delivery times
                    might vary slightly depending on the country. Local
                    production at the facility closest to you not only means
                    that your one-of-a-kind prints arrive on your doorstep
                    faster, but also cuts shipping distances by an average of
                    3445 km per order.
                  </p>
                </>
              ),
            },
            {
              classNames: "shadow-md",
              title: (
                <p className="font-semibold">Do you ship to my country?</p>
              ),
              //   shortTitle: "Illustrations",
              content: (
                <>
                  <p>
                    Mapiful works with 100 printing partners in 30 countries to
                    produce your custom prints closer to you. Delivery times
                    might vary slightly depending on the country. Local
                    production at the facility closest to you not only means
                    that your one-of-a-kind prints arrive on your doorstep
                    faster, but also cuts shipping distances by an average of
                    3445 km per order.
                  </p>
                </>
              ),
            },
            {
              classNames: "shadow-md",
              title: (
                <p className="font-semibold">Do you ship to my country?</p>
              ),
              //   shortTitle: "Illustrations",
              content: (
                <>
                  <p>
                    Mapiful works with 100 printing partners in 30 countries to
                    produce your custom prints closer to you. Delivery times
                    might vary slightly depending on the country. Local
                    production at the facility closest to you not only means
                    that your one-of-a-kind prints arrive on your doorstep
                    faster, but also cuts shipping distances by an average of
                    3445 km per order.
                  </p>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

const streetMapShippingSettings = [
  { title: "Fast and free shipping worldwide" },
  { title: "Sustainably sourced quality paper (200/gsm)" },
  { title: "Greener production and shipping" },
];

const LineArt: FC = () => {
  return (
    <div>
      <Layout scroll headerProps={{ classNames: "bg-secondary" }}>
        <Container>
          <ProductLayout
            title={<h1 className="text-h4">Customizable Line Art</h1>}
            desc={
              <p className="text-bodySmall mt-[2rem]">
                Create a couple line art poster with our collection of romantic
                line illustrations, and let it add a meaningful and minimalist
                look to your home! Pick a sweet illustration that speaks to you,
                and personalise the text, colors and size, in just a few clicks.
              </p>
            }
            productId={0}
            slides={slides}
            shippingSettings={streetMapShippingSettings}
            sliderProps={{
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
          >
            <>
              <ProductOptions />
              <ProductDetails />
              <Asked />
            </>
          </ProductLayout>
        </Container>
      </Layout>
    </div>
  );
};

export default LineArt;
