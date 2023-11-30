import { useEffect } from "react";
import { useRouter } from "next/router";

import classNames from "classnames";

// components
import { Layout as PageLayout } from "@/components/Layout";
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";
import { Button } from "@/components/Button";

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
import { sizes, orientations } from "@/layouts/LayoutAttributes";
import { fontsList } from "@/layouts/LayoutSettings/layoutFonts";
import { mapColors } from "@/layouts/LayoutSettings/mapColors";

// panels
import { SkyMapPanelContent } from "@/modules/LayoutPanels/SkyMapPanelContent";
import { LineArtPanelContent } from "@/modules/LayoutPanels/LineArtPanelContent";
import { MapPanelContent } from "@/modules/LayoutPanels/MapPanelContent";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import {
  initLayout,
  handleChangeStyles,
  handleChangeAttributes,
  initFromProfile,
} from "@/redux/layout";
import { handleSaveProject, handleUpdateProject } from "@/redux/user";

// types
import { UserFieldsProps } from "@/redux/user";

// styles
import "@/modules/LayoutPanels/editor.scss";

export default function Editor() {
  const router = useRouter();
  const { product_id, id } = router.query;

  const user: UserFieldsProps = useTypedSelector(({ user }) => user.user);
  const isUserLogged = useTypedSelector(({ user }) => user.loggedIn);
  const layout = useTypedSelector(({ layout }) => layout?.layout);

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

  const handleChangeLayoutColor = (id: number) => {
    const layoutColors = basicColors.find(icon => icon.id === id);

    dispatch(
      handleChangeStyles({
        style: "color",
        id: layoutColors?.id,
      })
    );
  };

  const handleChangeLayoutStyle = (id: number) => {
    const layoutStyle = basicLayoutStyles.find(style => style.id === id);

    dispatch(
      handleChangeStyles({
        style: "layoutStyle",
        id: layoutStyle?.id,
      })
    );
  };

  const handleChangeLayoutMapStyle = (id: number) => {
    const layoutStyle = mapLayoutStyles.find(style => style.id === id);

    dispatch(
      handleChangeStyles({
        style: "layoutStyle",
        id: layoutStyle?.id,
      })
    );
  };

  const handleChangeLayoutSkyMapStyle = (id: number) => {
    const layoutStyle = skyMapLayoutStyles.find(style => style.id === id);

    dispatch(
      handleChangeStyles({
        style: "layoutStyle",
        id: layoutStyle?.id,
      })
    );
  };

  const handleChangeFont = (id: number) => {
    const layoutFont = fontsList.find(font => font.id === id);

    dispatch(
      handleChangeStyles({
        style: "font",
        id: layoutFont?.id,
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

  const handleUPDATEACCOUNT = () => {
    try {
      if (id) {
        dispatch(handleUpdateProject({ id: product_id }));
      } else {
        dispatch(handleSaveProject({ id: product_id }));
      }
    } catch {
      console.log("SOMETHING WRONG");
    }
  };

  useEffect(() => {
    if (id) {
      const project = user?.projects?.find(project => project.uuid == id);
      dispatch(initFromProfile(project));
    } else {
      dispatch(initLayout(product_id));
    }
  }, [product_id, user.projects]);

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

  const panelUI = {
    0: (
      <LineArtPanelContent
        handleSelectFigure={handleSelectFigure}
        handleChangeLayoutColor={handleChangeLayoutColor}
        handleChangeLayoutStyle={handleChangeLayoutStyle}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
        handleChangeFont={handleChangeFont}
      />
    ),
    1: (
      <SkyMapPanelContent
        handleChangeLayoutColor={handleChangeLayoutColor}
        handleChangeLayoutStyle={handleChangeLayoutSkyMapStyle}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
        handleChangeFont={handleChangeFont}
      />
    ),
    2: (
      <MapPanelContent
        handleChangeLayoutColor={handleChangeLayoutColor}
        handleChangeLayoutStyle={handleChangeLayoutMapStyle}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
        handleChangeFont={handleChangeFont}
      />
    ),
  };

  return (
    <>
      <PageLayout>
        <div className="flex">
          <div className="min-w-[400px] max-w-[400px] w-full bg-white p-3 overflow-y-auto editor-panel flex flex-col">
            {layout.productId == Number(product_id) &&
              panelUI[layout.productId as keyof typeof panelUI]}
            {layout.editingProfileProject ? (
              <Button
                classNames="w-full mt-auto"
                type="button"
                onClick={handleUPDATEACCOUNT}
              >
                Update
              </Button>
            ) : (
              <Button
                classNames="w-full mt-auto"
                type="button"
                onClick={handleUPDATEACCOUNT}
              >
                Add To Collection
              </Button>
            )}

            <Button classNames="w-full mt-2" type="button">
              Add To Cart
            </Button>
          </div>
          <LayoutPreviewWrapper
            className={`${
              fontsList[Number(layout.poster?.styles?.font)]?.font.variable
            }`}
          >
            {layout.productId == Number(product_id) &&
              editorUI[layout.productId as keyof typeof editorUI]}
          </LayoutPreviewWrapper>
        </div>
      </PageLayout>
    </>
  );
}
