import { useEffect } from "react";
import { useRouter } from "next/router";

import classNames from "classnames";

// components
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";

// layout ui
import { LayoutContent } from "@/layouts/LayoutContent";
import { SkyMap } from "@/layouts/SkyMap";
import { MapContainer } from "@/layouts/Map/";
import { Zodiac } from "@/layouts/Zodiac";
// lineart settings ( panel )
import { lineArtIconsList } from "@/layouts/LayoutSettings/lineArtIconsList";
import { basicColors } from "@/layouts/LayoutSettings/colorsList";
import { masks } from "@/layouts/LayoutSettings/skyMapMasks";
import {
  basicLayoutStyles,
  mapLayoutStyles,
  skyMapLayoutStyles,
} from "@/layouts/LayoutSettings/artworkStylesList";
import { fontsList } from "@/layouts/LayoutSettings/layoutFonts";
import { mapColors } from "@/layouts/LayoutSettings/mapColors";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { initFromProfile } from "@/redux/layout";

// constants
import { RENDER_SCALE_RENDER_PAGE } from "@/constants/defaultLayoutSettings";

// styles
import "@/modules/LayoutPanels/editor.scss";

export default function Editor() {
  const router = useRouter();
  const { product_id, preview } = router.query;

  console.log("router.query", router.query);

  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const dispatch: AppDispatch = useDispatch();

  const FRAME_SCALE = preview ? `${RENDER_SCALE_RENDER_PAGE * 0.5}vmin` : 0;

  useEffect(() => {
    const project = localStorage.getItem("profile-storage");

    window.devicePixelRatio = RENDER_SCALE_RENDER_PAGE;

    if (project) {
      const body = document.querySelector("body");
      if (body && body.style) {
        body.style.overflow = "auto";
      }
      dispatch(initFromProfile(JSON.parse(project)));
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
    mapColors[Number(layout?.poster?.styles?.color)]?.layoutsColor[
      mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
    ]?.textColor ?? mapColors[Number(layout?.poster?.styles?.color)]?.textColor;

  const MAP_GRADIENT_COLOR =
    mapColors[Number(layout?.poster?.styles?.color)]?.layoutsColor[
      mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
    ]?.gradientColor ??
    mapColors[Number(layout?.poster?.styles?.color)]?.gradientColor;

  const MAP_BG_COLOR =
    mapColors[Number(layout?.poster?.styles?.color)]?.layoutsColor[
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
      <LayoutContent
        layoutStyle={
          basicLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]
            ?.applyName
        }
        figure={lineArtIconsList[Number(layout.poster?.styles?.artwork)]?.icon}
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
      <LayoutContent
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
      <LayoutContent
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
      <LayoutContent
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
