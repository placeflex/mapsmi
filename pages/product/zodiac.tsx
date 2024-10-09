import React, { FC, useState, useEffect } from "react";

// components
import { Layout } from "@/components/Layout/";
import { Container } from "@/components/Container";
import { Accordion } from "@/components/Collapse/Collapse";
import { ProductLayout } from "../../modules/Product/ProductLayout";

import Arrow from "@/public/icons/arrow.svg";

import streetmap from "@/public/wallart-preview/streetmap-preview-second-details.png";

//

import "./styles/starmap.scss";

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
        Create your customizable Map Art print
      </p>

      <div className="flex flex-col gap-[1rem] mt-[2rem]">
        <div>
          <h5 className="flex items-center gap-[0.4rem] text-caption font-semibold mb-[0.4rem]">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Choose your location and date
          </h5>
          <p className="text-caption">
            Which nights do you want to remember forever? Choose a location
            connected your biggest milestone in life, or simply any place that
            makes you feel good!
          </p>
        </div>
        <div>
          <h5 className="flex items-center gap-[0.4rem] text-caption font-semibold mb-[0.4rem]">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Personalize your text
          </h5>
          <p className="text-caption">
            Add any special words or quote that will lift your mood each day, or
            a loveable message to someone else.
          </p>
        </div>
        <div>
          <h5 className="flex items-center gap-[0.4rem] text-caption font-semibold mb-[0.4rem]">
            <Arrow
              style={{ width: "1rem", height: "1rem" }}
              className="rotate-90"
            />{" "}
            Change up the look with colors and themes
          </h5>
          <p className="text-caption">
            Every home is unique, and with our predefined colors and themes you
            can quickly find a look that suits your interior style.
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

const slides = [
  {
    thumbnail: streetmap,
  },
  {
    thumbnail: streetmap,
  },
  {
    thumbnail: streetmap,
  },
  {
    thumbnail: streetmap,
  },
  {
    thumbnail: streetmap,
  },
  {
    thumbnail: streetmap,
  },
  {
    thumbnail: streetmap,
  },
];

const streetMapShippingSettings = [
  { title: "Fast and free shipping worldwide" },
  { title: "Sustainably sourced quality paper (200/gsm)" },
  { title: "Greener production and shipping" },
];

const StreetMap: FC = () => {
  return (
    <div>
      <Layout scroll fixed headerProps={{ classNames: "bg-secondary" }}>
        <Container>
          <ProductLayout
            title={<h1 className="text-h4">Customizable Zodiac Posters</h1>}
            desc={<p className="text-bodySmall mt-[2rem]">Zodiac</p>}
            productId={3}
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

export default StreetMap;
