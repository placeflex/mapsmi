import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { Layout as PageLayout } from "@/components/Layout";
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";

import { LineArt } from "@/layouts/lineart";
// layout wrapper
import { Layout } from "@/constructor/layout";

// svgs
import { svgList } from "@/modules/LineartSettings/iconsList";

// colors
import { colorsArtwork } from "@/modules/LineartSettings/colorsList";

import "@/modules/LineartSettings/editor.scss";

export default function Editor() {
  const [layout, setNewLayout] = useState(new Layout({ figure: 1 }));
  const [figureIconId, setFigureIconId] = useState<React.ReactNode>(
    svgList[0].icon
  );
  const [artworkColor, setArtworkColor] = useState<any>(colorsArtwork[0]);

  const handleSelectFigure = (id: number) => {
    const figure = svgList.find(icon => icon.id === id);

    setFigureIconId(figure?.icon);
  };

  const handleArtworkColor = (id: number) => {
    const color = colorsArtwork.find(icon => icon.id === id);

    setArtworkColor(color);
  };

  const styles = {
    "--text-color": artworkColor.textColor,
    "--bg-color": artworkColor.bg,
    "--illustration-color": artworkColor.illustrationColor,
  };

  return (
    <PageLayout>
      <div className="flex ">
        <div className="layout-settings min-w-[500px] max-w-[30%] bg-light p-3 overflow-y-auto editor-panel">
          <div className="icons h-[300px] overflow-y-auto grid pr-4 grid-cols-4 gap-3 mb-5">
            {svgList.map(({ icon, id }): React.ReactNode => {
              return (
                <div
                  key={id}
                  className="h-[150px] bg-white p-4 cursor-pointer"
                  onClick={() => handleSelectFigure(id)}
                >
                  {icon}
                </div>
              );
            })}
          </div>
          <div className="icons h-[300px] overflow-y-auto grid pr-4 grid-cols-4 gap-3">
            {colorsArtwork.map(({ icon, bg, id }): React.ReactNode => {
              return (
                <div
                  key={id}
                  className="h-[150px] bg-white p-4 cursor-pointer"
                  onClick={() => handleArtworkColor(id)}
                  style={{ background: bg }}
                >
                  {icon}
                </div>
              );
            })}
          </div>
        </div>
        <LayoutPreviewWrapper>
          <LineArt theme="minimalist" figure={figureIconId} styles={styles} />
        </LayoutPreviewWrapper>
      </div>
    </PageLayout>
  );
}
