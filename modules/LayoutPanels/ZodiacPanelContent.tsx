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
  ZodiacSelect,
} from "./settings";

interface SkyMapPanelContentInterface {
  handleChangeLayoutColor: (id: number) => void;
  handleChangeLayoutStyle: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
  handleSelectSize: (id: number) => void;
  handleChangeFont: (id: number) => void;
  handleSelectFigure: (id: number) => void;
  handleSelectMaterial: (id: number) => void;
  handleSelectFrame: (id: number) => void;
}

export const ZodiacPanelContent = ({
  handleChangeLayoutColor,
  handleChangeLayoutStyle,
  handleSelectSize,
  handleSelectOrientations,
  handleChangeFont,
  handleSelectFigure,
  handleSelectMaterial,
  handleSelectFrame,
}: SkyMapPanelContentInterface) => {
  return (
    <>
      <Accordion
        items={[
          {
            title: "Moment",
            content: <ZodiacSelect handleChange={handleSelectFigure} />,
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
