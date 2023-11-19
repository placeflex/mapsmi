import { useEffect } from "react";
import { useRouter } from "next/router";

import classNames from "classnames";

// components
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";

// layout ui
import { LayoutContent } from "@/layouts/LayoutContent";
import { SkyMap } from "@/layouts/SkyMap";
import { MapContainer } from "@/layouts/Map";

// lineart settings ( panel )
import { svgList } from "@/layouts/LayoutSettings/iconsList";
import { basicColors } from "@/layouts/LayoutSettings/colorsList";
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
import { initLayout, initFromProfile } from "@/redux/layout";

// types
import { UserFieldsProps } from "@/redux/user";

// styles
import "@/modules/LayoutPanels/editor.scss";

export default function Editor() {
  const router = useRouter();
  const { product_id, id } = router.query;

  const user: UserFieldsProps = useTypedSelector(({ user }) => user.user);
  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const project = localStorage.getItem("profile-storage");

    if (project) {
      dispatch(initFromProfile(JSON.parse(project)));
    }
    // dispatch(initLayout(product_id));
  }, [product_id]);

  const styles = {
    "--text-color":
      basicColors[Number(layout.poster?.styles?.color)]?.textColor,
    "--bg-color": basicColors[Number(layout.poster?.styles?.color)]?.bg,
    "--illustration-color":
      basicColors[Number(layout.poster?.styles?.color)]?.illustrationColor,
    "--font": fontsList[Number(layout.poster?.styles?.font)]?.font.variable,
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
        figure={svgList[Number(layout.poster?.styles?.artwork)]?.icon}
        styles={styles}
        texts={{
          heading: layout.poster?.labels?.heading,
          subline: layout.poster?.labels?.subline,
          tagline: layout.poster?.labels?.tagline,
          divider: layout.poster?.labels?.divider,
        }}
        className={classNames({
          [`lineart poster-${layout?.selectedAttributes?.size?.name.replaceAll(
            "cm",
            ""
          )}`]: layout?.selectedAttributes?.size?.name,
        })}
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
        className={classNames({
          [`skymap poster-${layout?.selectedAttributes?.size?.name.replaceAll(
            "cm",
            ""
          )}`]: layout?.selectedAttributes?.size?.name,
        })}
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
        className={classNames({
          [`map poster-${layout?.selectedAttributes?.size?.name.replaceAll(
            "cm",
            ""
          )}`]: layout?.selectedAttributes?.size?.name,
        })}
      />
    ),
  };

  return (
    <>
      <div className="h-full">
        <LayoutPreviewWrapper
          className={`${
            fontsList[Number(layout.poster?.styles?.font)]?.font.variable
          }`}
          render
        >
          {layout.productId == Number(product_id) &&
            editorUI[layout.productId as keyof typeof editorUI]}
        </LayoutPreviewWrapper>
      </div>
    </>
  );
}
