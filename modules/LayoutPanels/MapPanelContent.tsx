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
            shortTitle: "Moment",
            content: <LocationAccrodion />,
            icon: <Location stroke="#000" width={20} height={20} />,
          },
          {
            title: "Customize the colors",
            shortTitle: "Colors",
            content: (
              <ColorsForMapAccordion handleChange={handleChangeLayoutColor} />
            ),
            icon: <Styles stroke="#000" width={20} height={20} />,
          },
          {
            title: "Customize the text",
            shortTitle: "Texts",
            icon: <Labels stroke="#000" width={20} height={20} />,
            content: <TextsAccordion />,
          },
          {
            title: "Customize the font",
            shortTitle: "Fonts",
            content: <FontsAccordion handleChange={handleChangeFont} />,
            icon: <Labels stroke="#000" width={20} height={20} />,
          },
          {
            title: "Customize the style",
            shortTitle: "Styles",
            content: (
              <LayoutsMapAccordion handleChange={handleChangeLayoutStyle} />
            ),
            icon: <Styles stroke="#000" width={20} height={20} />,
          },
          {
            title: "Change the size",
            shortTitle: "Materials",
            content: (
              <SizeAccordion
                handleSelectSize={handleSelectSize}
                handleSelectOrientations={handleSelectOrientations}
                handleSelectMaterial={handleSelectMaterial}
                handleSelectFrame={handleSelectFrame}
              />
            ),
            icon: <Size stroke="#000" width={20} height={20} />,
          },
        ]}
      />
    </>
  );
};
