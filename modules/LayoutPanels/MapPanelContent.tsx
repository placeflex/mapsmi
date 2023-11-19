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

// stores
import { useTypedSelector } from "@/redux/store";

interface MapPanelContentInterface {
  handleChangeLayoutColor: (id: number) => void;
  handleSelectSize: (id: number) => void;
  handleChangeLayoutStyle: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
  handleChangeFont: (id: number) => void;
}

export const MapPanelContent = ({
  handleChangeLayoutColor,
  handleChangeLayoutStyle,
  handleSelectSize,
  handleSelectOrientations,
  handleChangeFont,
}: MapPanelContentInterface) => {
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes
  );
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
              />
            ),
          },
        ]}
      />
    </>
  );
};
