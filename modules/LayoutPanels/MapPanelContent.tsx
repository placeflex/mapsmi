import React from "react";

// settings panels
import {
  LocationAccrodion,
  TextsAccordion,
  SizeAccordion,
  ColorsForMapAccordion,
  LayoutsMapAccordion,
  FontsAccordion,
} from "./settings";

import { Accordion } from "@/components/Accordion";

interface MapPanelContentInterface {
  handleChangeLayoutColor: (id: number) => void;
  handleSelectSize: (id: number) => void;
  handleChangeLayoutStyle: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
  handleChangeFont: (id: number) => void;
  handleSelectMaterial: (id: number) => void;
  handleSelectFrame: (id: number) => void;
}

export const MapPanelContent = ({
  handleChangeLayoutColor,
  handleChangeLayoutStyle,
  handleSelectSize,
  handleSelectOrientations,
  handleChangeFont,
  handleSelectMaterial,
  handleSelectFrame,
}: MapPanelContentInterface) => {
  return (
    <>
      <Accordion
        items={[
          {
            title: "Location",
            content: <LocationAccrodion />,
          },
          {
            title: "Customize the colors",
            content: (
              <ColorsForMapAccordion handleChange={handleChangeLayoutColor} />
            ),
          },
          {
            title: "Customize the text",
            content: <TextsAccordion />,
          },
          {
            title: "Customize the font",
            content: <FontsAccordion handleChange={handleChangeFont} />,
          },
          {
            title: "Customize the style",
            content: (
              <LayoutsMapAccordion handleChange={handleChangeLayoutStyle} />
            ),
          },
          {
            title: "Change the size",
            content: (
              <SizeAccordion
                handleSelectSize={handleSelectSize}
                handleSelectOrientations={handleSelectOrientations}
                handleSelectMaterial={handleSelectMaterial}
                handleSelectFrame={handleSelectFrame}
              />
            ),
          },
        ]}
      />
    </>
  );
};
