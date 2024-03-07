import { Accordion } from "@/components/Accordion";

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
          content: <IllustrationAccordion handleChange={handleSelectFigure} />,
        },
        {
          title: "Customize the colors",
          content: <ColorsAccordion handleChange={handleChangeLayoutColor} />,
        },
        {
          title: "Customize the style",
          content: <LayoutsAccordion handleChange={handleChangeLayoutStyle} />,
        },
        {
          title: "Customize the font",
          content: <FontsAccordion handleChange={handleChangeFont} />,
        },
        {
          title: "Customize the text",
          content: <TextsAccordion />,
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
  );
};
