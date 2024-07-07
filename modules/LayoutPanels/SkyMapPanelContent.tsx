import React from "react";

import { Accordion } from "@/components/Collapse/Collapse";

// icons
import Location from "public/editor/location.svg";
import Styles from "public/editor/style.svg";
import Labels from "public/editor/labels.svg";
import Size from "public/editor/size.svg";

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
            shortTitle: "Moment",
            content: <LocationAccrodion />,
            icon: <Location stroke="#000" width={20} height={20} />,
          },
          {
            title: "Customize the colors",
            shortTitle: "Colors",
            content: <ColorsAccordion handleChange={handleChangeLayoutColor} />,
            icon: <Styles stroke="#000" width={20} height={20} />,
          },
          {
            title: "Customize the text",
            shortTitle: "Texts",
            content: <TextsAccordion />,
            icon: <Labels stroke="#000" width={20} height={20} />,
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
              <LayoutsSkyMapAccordion handleChange={handleChangeLayoutStyle} />
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
