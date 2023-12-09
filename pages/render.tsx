import { useEffect } from "react";
import { useRouter } from "next/router";

import classNames from "classnames";

// components
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";

// layout ui
import { LayoutContent } from "@/layouts/LayoutContent";
import { SkyMap } from "@/layouts/SkyMap";
import { MapContainer } from "@/layouts/Map";
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

// types
import { UserFieldsProps } from "@/redux/user";

// styles
import "@/modules/LayoutPanels/editor.scss";

export default function Editor() {
  const router = useRouter();
  const { product_id } = router.query;

  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const project = localStorage.getItem("profile-storage");

    if (project) {
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
  };

  const mapStyles = {
    "--text-color": mapColors[Number(layout.poster?.styles?.color)]?.textColor,
    "--font": fontsList[Number(layout.poster?.styles?.font)]?.font.variable,
    "--gradientColor":
      mapColors[Number(layout.poster?.styles?.color)]?.gradientColor,
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
            [`lineart poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase()
        )}
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
            [`skymap poster-${layout?.selectedAttributes?.size?.name.replaceAll(
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
      />
    ),
    2: (
      <LayoutContent
        layoutStyle={
          mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
        }
        figure={<MapContainer />}
        styles={mapStyles}
        texts={{
          heading: layout.poster?.labels?.heading,
          subline: layout.poster?.labels?.subline,
          tagline: layout.poster?.labels?.tagline,
          divider: layout.poster?.labels?.divider,
        }}
        className={classNames(
          {
            [`map poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase()
        )}
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
            [`zodiac poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          {
            ["overlayApply"]: layout.poster?.styles?.isOverlay,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase()
        )}
      />
    ),
  };

  return (
    <>
      <div className="h-full">
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
