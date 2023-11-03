import React from "react";

// settings panels
import { LocationAccrodion, TextsAccordion, SizeAccordion } from "./settings";

import { Accordion } from "@/components/Accordion";

import { artworkMapTheme as themes } from "@/modules/LineartSettings/artworkStylesList";

// stores
import { useTypedSelector } from "@/redux/store";

interface MapPanelContentInterface {
  handleArtworkColor: (id: number) => void;
  handleSelectSize: (id: number) => void;
  handleArtworkTheme: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
}

export const MapPanelContent = ({
  handleArtworkColor,
  handleArtworkTheme,
  handleSelectSize,
  handleSelectOrientations,
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
            title: "Customize the text",
            content: <TextsAccordion />,
          },
          {
            title: "Customize the style",
            content: (
              <>
                <h2 className="text-2xl font-bold mb-2">Style</h2>
                <p className="mb-4 text-xs opacity-[0.4]">
                  We are all for freedom of choice, if you want to try different
                  combinations than our favorites - go ahead and click customize
                  and roll your own.
                </p>
                <div className="icons overflow-y-auto flex flex-wrap gap-1">
                  {themes.map(({ name, id }) => {
                    return (
                      <button
                        key={id}
                        className={`border bg-white text-xs cursor-pointer flex items-center justify-center px-4 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
                          id === Number(posterStyles?.theme)
                            ? "border-black"
                            : ""
                        }`}
                        onClick={() => handleArtworkTheme(id)}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </>
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
