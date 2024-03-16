import { Accordion } from "@/components/Collapse/Collapse";

// icons
import Location from "public/editor/location.svg";
import Styles from "public/editor/style.svg";
import Labels from "public/editor/labels.svg";
import Size from "public/editor/size.svg";

// settings panels
import {
  IllustrationAccordion,
  ColorsAccordion,
  LayoutsAccordion,
  TextsAccordion,
  SizeAccordion,
  FontsAccordion,
} from "./settings";

interface LineArtPanelContentInterface {
  handleSelectFigure: (id: number) => void;
  handleChangeLayoutColor: (id: number) => void;
  handleChangeLayoutStyle: (id: number) => void;
  handleSelectSize: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
  handleChangeFont: (id: number) => void;
  handleSelectMaterial: (id: number) => void;
  handleSelectFrame: (id: number) => void;
}

export const LineArtPanelContent = ({
  handleSelectFigure,
  handleChangeLayoutColor,
  handleChangeLayoutStyle,
  handleSelectSize,
  handleSelectOrientations,
  handleChangeFont,
  handleSelectMaterial,
  handleSelectFrame,
}: LineArtPanelContentInterface) => {
  return (
    <Accordion
      items={[
        {
          title: "Select illustration",
          icon: <Location stroke="#000" width={20} height={20} />,
          content: <IllustrationAccordion handleChange={handleSelectFigure} />,
        },
        {
          title: "Customize the colors",
          icon: <Styles stroke="#000" width={20} height={20} />,
          content: <ColorsAccordion handleChange={handleChangeLayoutColor} />,
        },
        {
          title: "Customize the style",
          icon: <Labels stroke="#000" width={20} height={20} />,
          content: <LayoutsAccordion handleChange={handleChangeLayoutStyle} />,
        },
        {
          title: "Customize the font",
          icon: <Size stroke="#000" width={20} height={20} />,
          content: <FontsAccordion handleChange={handleChangeFont} />,
        },
        {
          title: "Customize the text",
          icon: <Styles stroke="#000" width={20} height={20} />,
          content: <TextsAccordion />,
        },
        {
          title: "Change the size",
          icon: <Location stroke="#000" width={20} height={20} />,
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
  );
};
