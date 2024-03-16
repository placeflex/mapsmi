import React from "react";

// icons
import Location from "public/editor/location.svg";
import Styles from "public/editor/style.svg";
import Labels from "public/editor/labels.svg";
import Size from "public/editor/size.svg";

// settings panels
import {
  LocationAccrodion,
  TextsAccordion,
  SizeAccordion,
  ColorsForMapAccordion,
  LayoutsMapAccordion,
  FontsAccordion,
} from "./settings";

import { Accordion } from "@/components/Collapse/Collapse";

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
            icon: <Location stroke="#000" width={20} height={20} />,
            content: <LocationAccrodion />,
          },
          {
            title: "Customize the colors",
            icon: <Styles stroke="#000" width={20} height={20} />,
            content: (
              <ColorsForMapAccordion handleChange={handleChangeLayoutColor} />
            ),
          },
          {
            title: "Customize the text",
            icon: <Labels stroke="#000" width={20} height={20} />,
            content: <TextsAccordion />,
          },
          {
            title: "Customize the font",
            icon: <Labels stroke="#000" width={20} height={20} />,
            content: <FontsAccordion handleChange={handleChangeFont} />,
          },
          {
            title: "Customize the style",
            icon: <Styles stroke="#000" width={20} height={20} />,
            content: (
              <LayoutsMapAccordion handleChange={handleChangeLayoutStyle} />
            ),
          },
          {
            title: "Change the size",
            icon: <Size stroke="#000" width={20} height={20} />,
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
