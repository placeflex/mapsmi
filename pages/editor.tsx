import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

// components
import { Layout as PageLayout } from "@/components/Layout";
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";
import { LineArtPanelContent } from "@/modules/LineartSettings/LineArtPanelsContent";
import { MapPanelContent } from "@/modules/LineartSettings/MapPanelContent";

// layout ui
import { LineArt } from "@/layouts/LineArt";
import { SkyMap } from "@/layouts/SkyMap";
import { MapContainer } from "@/layouts/MapContainer";

// lineart settings ( panel )
import { svgList } from "@/modules/LineartSettings/iconsList";
import { paletteArtwork } from "@/modules/LineartSettings/colorsList";
import { artworkTheme as themes } from "@/modules/LineartSettings/artworkStylesList";
import { sizes, orientations } from "@/layouts/LayoutAttributes";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";

import {
  initLayout,
  handleChangeStyles,
  handleChangeAttributes,
  handleChangeLables,
} from "@/redux/layout";

// styles
import "@/modules/LineartSettings/editor.scss";
import classNames from "classnames";
import { SkyMapPanelContent } from "@/modules/LineartSettings/SkyMapPanelContent";

export default function Editor() {
  const posterStyles = useTypedSelector(
    ({ layout }) => layout?.layout.poster?.styles
  );

  const posterAttributes = useTypedSelector(
    ({ layout }) => layout?.layout.selectedAttributes
  );
  const posterLabels = useTypedSelector(
    ({ layout }) => layout?.layout.poster?.labels
  );

  const productId = useTypedSelector(({ layout }) => layout?.layout.productId);

  const dispatch: AppDispatch = useDispatch();

  const handleSelectFigure = async (id: number) => {
    const figure = svgList.find(icon => icon.id === id);
    dispatch(
      handleChangeStyles({
        style: "artwork",
        id: figure?.id,
      })
    );
  };
  const handleArtworkColor = (id: number) => {
    const layoutColors = paletteArtwork.find(icon => icon.id === id);

    dispatch(
      handleChangeStyles({
        style: "palette",
        id: layoutColors?.id,
      })
    );
  };
  const handleartworkTheme = (id: number | undefined) => {
    const theme = themes.find(style => style.id === id);

    dispatch(
      handleChangeStyles({
        style: "theme",
        id: theme?.id,
      })
    );
  };
  const handleSelectSize = (id: number) => {
    const size = sizes.find(style => style.id === id);
    dispatch(handleChangeAttributes({ attr: "size", value: size }));
  };
  const handleSelectOrientations = (id: number) => {
    const orientation = orientations.find(style => style.id === id);
    dispatch(
      handleChangeAttributes({ attr: "orientation", value: orientation })
    );
  };
  const handleChangeLabel = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => {
    dispatch(handleChangeLables({ label, value }));
  };

  const router = useRouter();
  const { product_id } = router.query;

  useEffect(() => {
    if (product_id) {
      dispatch(initLayout(product_id));
    }
  }, [product_id]);

  const styles = {
    "--text-color": paletteArtwork[Number(posterStyles?.palette)]?.textColor,
    "--bg-color": paletteArtwork[Number(posterStyles?.palette)]?.bg,
    "--illustration-color":
      paletteArtwork[Number(posterStyles?.palette)]?.illustrationColor,
  };

  const editorUI = {
    0: (
      <LineArt
        theme={themes[Number(posterStyles?.theme)]?.applyName}
        figure={svgList[Number(posterStyles?.artwork)].icon}
        styles={styles}
        texts={{
          heading: posterLabels?.heading,
          subline: posterLabels?.subline,
          tagline: posterLabels?.tagline,
          divider: posterLabels?.divider,
        }}
        className={classNames({
          [`lineart poster-${posterAttributes?.size?.name.replaceAll(
            "cm",
            ""
          )}`]: posterAttributes?.size?.name,
        })}
      />
    ),
    1: (
      <LineArt
        theme={themes[Number(posterStyles?.theme)]?.applyName}
        figure={<SkyMap />}
        styles={styles}
        texts={{
          heading: posterLabels?.heading,
          subline: posterLabels?.subline,
          tagline: posterLabels?.tagline,
          divider: posterLabels?.divider,
        }}
        className={classNames({
          [`skymap poster-${posterAttributes?.size?.name.replaceAll(
            "cm",
            ""
          )}`]: posterAttributes?.size?.name,
        })}
      />
    ),
    2: (
      <LineArt
        theme={themes[Number(posterStyles?.theme)]?.applyName}
        figure={<MapContainer />}
        styles={styles}
        texts={{
          heading: posterLabels?.heading,
          subline: posterLabels?.subline,
          tagline: posterLabels?.tagline,
          divider: posterLabels?.divider,
        }}
        className={classNames({
          [`map poster-${posterAttributes?.size?.name.replaceAll("cm", "")}`]:
            posterAttributes?.size?.name,
        })}
      />
    ),
  };

  const panelUI = {
    0: (
      <LineArtPanelContent
        handleSelectFigure={handleSelectFigure}
        handleArtworkColor={handleArtworkColor}
        handleartworkTheme={handleartworkTheme}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
        handleChangeLabel={handleChangeLabel}
      />
    ),
    1: (
      <SkyMapPanelContent
        handleArtworkColor={handleArtworkColor}
        handleChangeLabel={handleChangeLabel}
      />
    ),
    2: (
      <MapPanelContent
        handleArtworkColor={handleArtworkColor}
        handleChangeLabel={handleChangeLabel}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
      />
    ),
  };

  return (
    <>
      <PageLayout>
        <div className="flex">
          <div className="layout-settings min-w-[400px] max-w-[400px] w-full bg-light p-3 overflow-y-auto editor-panel">
            {productId == Number(product_id) && panelUI[Number(productId)]}
          </div>
          <LayoutPreviewWrapper>
            {productId == Number(product_id) && editorUI[Number(productId)]}
          </LayoutPreviewWrapper>
        </div>
      </PageLayout>
    </>
  );
}
