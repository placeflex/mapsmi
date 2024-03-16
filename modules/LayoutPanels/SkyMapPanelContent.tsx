import React from "react";

import { Accordion } from "@/components/Collapse/Collapse";

// settings panels
import {
  LocationAccrodion,
  ColorsAccordion,
  TextsAccordion,
  SizeAccordion,
  FontsAccordion,
  LayoutsSkyMapAccordion,
} from "./settings";

interface SkyMapPanelContentInterface {
  handleChangeLayoutColor: (id: number) => void;
  handleChangeLayoutStyle: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
  handleSelectSize: (id: number) => void;
  handleChangeFont: (id: number) => void;
  handleSelectMaterial: (id: number) => void;
  handleSelectFrame: (id: number) => void;
}

export const SkyMapPanelContent = ({
  handleChangeLayoutColor,
  handleChangeLayoutStyle,
  handleSelectSize,
  handleSelectOrientations,
  handleChangeFont,
  handleSelectMaterial,
  handleSelectFrame,
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
            content: <ColorsAccordion handleChange={handleChangeLayoutColor} />,
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
              <LayoutsSkyMapAccordion handleChange={handleChangeLayoutStyle} />
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
