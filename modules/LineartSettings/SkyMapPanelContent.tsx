import React from "react";

import { Accordion } from "@/components/Accordion";

// settings panels
import {
  LocationAccrodion,
  ColorsAccordion,
  TextsAccordion,
  StylesAccordion,
  SizeAccordion,
} from "./settings";

interface SkyMapPanelContentInterface {
  handleArtworkColor: (id: number) => void;
  handleArtworkTheme: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
  handleSelectSize: (id: number) => void;
}

export const SkyMapPanelContent = ({
  handleArtworkColor,
  handleArtworkTheme,
  handleSelectSize,
  handleSelectOrientations,
}: SkyMapPanelContentInterface) => {
  return (
    <>
      <Accordion
        items={[
          {
            title: "Moment",
            content: <LocationAccrodion />,
          },
          {
            title: "Customize the colors",
            content: <ColorsAccordion handleChange={handleArtworkColor} />,
          },
          {
            title: "Customize the text",
            content: <TextsAccordion />,
          },
          {
            title: "Customize the style",
            content: <StylesAccordion handleChange={handleArtworkTheme} />,
          },
          {
            title: "Change the size",
            content: (
              <SizeAccordion
                handleSelectSize={handleSelectSize}
                handleSelectOrientations={handleSelectOrientations}
              />
            ),
          },
        ]}
      />
    </>
  );
};
