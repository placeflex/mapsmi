import { useEffect } from "react";
import { useRouter } from "next/router";

import classNames from "classnames";

// components
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";

// layout ui
import { WallartContent } from "@/layouts/WallartContent";
import { SkyMap } from "@/layouts/SkyMap";
import { MapContainer } from "@/layouts/Map/";
import { Zodiac } from "@/layouts/Zodiac";
// lineart settings ( panel )
import { lineArtIcons } from "@/layouts/wallartSettings/lineArtIcons";
import { basicColors } from "@/layouts/wallartSettings/colorsList";
import { masks } from "@/layouts/wallartSettings/skyMapMasks";
import {
  basicLayoutStyles,
  mapLayoutStyles,
  skyMapLayoutStyles,
} from "@/layouts/wallartSettings/wallartStyles";
import { fontsList } from "@/layouts/wallartSettings/wallartFonts";
import { mapColors } from "@/layouts/wallartSettings/mapColors";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { initLayoutForRenderPage } from "@/redux/layout";

// constants
import { RENDER_SCALE_RENDER_PAGE } from "@/layouts/wallartSettings/defaultWallartSettings";
import { productsVariations } from "@/constants/constants";

// styles
import "@/modules/LayoutPanels/editor.scss";

export default function Editor() {
  const router = useRouter();
  const { product_id, preview } = router.query;

  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const dispatch: AppDispatch = useDispatch();

  const FRAME_SCALE = preview ? `${RENDER_SCALE_RENDER_PAGE * 0.5}vmin` : 0;

  useEffect(() => {
    const project = localStorage.getItem("render-storage");
    document.body.classList.add("render-page");

    window.devicePixelRatio = RENDER_SCALE_RENDER_PAGE;

    if (project) {
      const body = document.querySelector("body");
      if (body && body.style) {
        body.style.overflow = "auto";
      }

      dispatch(initLayoutForRenderPage(JSON.parse(project)));
    }
  }, [product_id]);

  const styles = {
    "--text-color":
      basicColors[Number(layout.poster?.styles?.color)]?.textColor,
    "--bg-color": basicColors[Number(layout.poster?.styles?.color)]?.bg,
    "--illustration-color":
      basicColors[Number(layout.poster?.styles?.color)]?.illustrationColor,
    "--font": fontsList[Number(layout.poster?.styles?.font)]?.font.variable,
    "--mask": `url(${masks[Number(layout.poster?.styles?.maskId)]?.src})`,
    "--render-scale": RENDER_SCALE_RENDER_PAGE,
    "--frame-scale": FRAME_SCALE,
  };

  const MAP_TEXT_COLOR =
    mapColors[Number(layout?.poster?.styles?.color)]?.layoutOverrides[
      mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
    ]?.textColor ?? mapColors[Number(layout?.poster?.styles?.color)]?.textColor;

  const MAP_GRADIENT_COLOR =
    mapColors[Number(layout?.poster?.styles?.color)]?.layoutOverrides[
      mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
    ]?.gradientColor ??
    mapColors[Number(layout?.poster?.styles?.color)]?.gradientColor;

  const MAP_BG_COLOR =
    mapColors[Number(layout?.poster?.styles?.color)]?.layoutOverrides[
      mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
    ]?.bgColor ?? mapColors[Number(layout?.poster?.styles?.color)]?.bgColor;

  const mapStyles = {
    "--font": fontsList[Number(layout.poster?.styles?.font)]?.font.variable,
    "--render-scale": RENDER_SCALE_RENDER_PAGE,
    "--frame-scale": FRAME_SCALE,
    "--text-color": MAP_TEXT_COLOR,
    "--gradientColor": MAP_GRADIENT_COLOR,
    "--bg-color": MAP_BG_COLOR,
  };

  const editorUI = {
    0: (
      <WallartContent
        layoutStyle={
          basicLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]
            ?.applyName
        }
        figure={lineArtIcons[Number(layout.poster?.styles?.artwork)]?.icon}
        styles={styles}
        texts={{
          heading: layout.poster?.labels?.heading,
          subline: layout.poster?.labels?.subline,
          tagline: layout.poster?.labels?.tagline,
          divider: layout.poster?.labels?.divider,
        }}
        className={classNames(
          {
            [`render lineart poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase()
        )}
        render={true}
      />
    ),
    1: (
      <WallartContent
        layoutStyle={
          skyMapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]
            ?.applyName
        }
        figure={<SkyMap />}
        styles={styles}
        texts={{
          heading: layout.poster?.labels?.heading,
          subline: layout.poster?.labels?.subline,
          tagline: layout.poster?.labels?.tagline,
          divider: layout.poster?.labels?.divider,
        }}
        className={classNames(
          {
            [`render skymap poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          {
            ["maskApply"]: layout.poster?.styles?.isMask,
            ["overlayApply"]: layout.poster?.styles?.isOverlay,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase()
        )}
        render={true}
      />
    ),
    2: (
      <WallartContent
        layoutStyle={
          mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
        }
        figure={<MapContainer render={true} />}
        styles={mapStyles}
        texts={{
          heading: layout.poster?.labels?.heading,
          subline: layout.poster?.labels?.subline,
          tagline: layout.poster?.labels?.tagline,
          divider: layout.poster?.labels?.divider,
        }}
        className={classNames(
          {
            [`render map poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase(),
          mapColors[Number(layout.poster?.styles?.color)]?.name
        )}
        render={true}
      />
    ),
    3: (
      <WallartContent
        layoutStyle={
          skyMapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]
            ?.applyName
        }
        figure={<Zodiac />}
        styles={styles}
        texts={{
          heading: layout.poster?.labels?.heading,
          subline: layout.poster?.labels?.subline,
          tagline: layout.poster?.labels?.tagline,
          divider: layout.poster?.labels?.divider,
        }}
        className={classNames(
          {
            [`render zodiac poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          {
            ["overlayApply"]: layout.poster?.styles?.isOverlay,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase()
        )}
        render={true}
      />
    ),
  };

  const isPreview =
    layout?.selectedAttributes?.frame?.id !== 0 && preview
      ? {
          padding: FRAME_SCALE,
        }
      : {
          padding: 0,
        };

  return (
    <>
      <div
        className={classNames("h-full w-fit", preview && "screen-wrapper")}
        style={isPreview}
      >
        <LayoutPreviewWrapper
          className={`${
            fontsList[Number(layout.poster?.styles?.font)]?.font.variable
          } render`}
          render
        >
          {layout.productId == Number(product_id) &&
            editorUI[layout.productId as keyof typeof editorUI]}
        </LayoutPreviewWrapper>
      </div>
    </>
  );
}
