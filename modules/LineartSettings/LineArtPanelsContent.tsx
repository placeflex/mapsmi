import { Accordion } from "@/components/Accordion";

// settings panels
import {
  IllustrationAccordion,
  ColorsAccordion,
  StylesAccordion,
  TextsAccordion,
  SizeAccordion,
} from "./settings";

interface LineArtPanelContentInterface {
  handleSelectFigure: (id: number) => void;
  handleArtworkColor: (id: number) => void;
  handleArtworkTheme: (id: number) => void;
  handleSelectSize: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
}

export const LineArtPanelContent = ({
  handleSelectFigure,
  handleArtworkColor,
  handleArtworkTheme,
  handleSelectSize,
  handleSelectOrientations,
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
          content: <ColorsAccordion handleChange={handleArtworkColor} />,
        },
        {
          title: "Customize the style",
          content: <StylesAccordion handleChange={handleArtworkTheme} />,
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
            />
          ),
        },
      ]}
    />
  );
};
