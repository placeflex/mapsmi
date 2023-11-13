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
import { paletteArtwork } from "@/layouts/LayoutSettings/colorsList";
import { artworkTheme as themes } from "@/layouts/LayoutSettings/artworkStylesList";
import { sizes, orientations } from "@/layouts/LayoutAttributes";

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
import { handleSaveProjectInAccount } from "@/redux/user";

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

  // const posterStyles = useTypedSelector(
  //   ({ layout }) => layout?.layout.poster?.styles
  // );

  // const posterAttributes = useTypedSelector(
  //   ({ layout }) => layout?.layout.selectedAttributes
  // );
  // const posterLabels = useTypedSelector(
  //   ({ layout }) => layout?.layout.poster?.labels
  // );

  // const editingProfileProject = useTypedSelector(
  //   ({ layout }) => layout?.layout.editingProfileProject
  // );

  // const productId = useTypedSelector(({ layout }) => layout?.layout.productId);

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
  const handleArtworkTheme = (id: number | undefined) => {
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

  const handleUPDATEACCOUNT = () => {
    try {
      if (id) {
        dispatch(handleSaveProjectInAccount({ id: product_id, update: true }));
      } else {
        dispatch(handleSaveProjectInAccount({ id: product_id, update: false }));
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
      paletteArtwork[Number(layout.poster?.styles?.palette)]?.textColor,
    "--bg-color": paletteArtwork[Number(layout.poster?.styles?.palette)]?.bg,
    "--illustration-color":
      paletteArtwork[Number(layout.poster?.styles?.palette)]?.illustrationColor,
  };

  const editorUI = {
    0: (
      <LayoutContent
        theme={themes[Number(layout.poster?.styles?.theme)]?.applyName}
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
        theme={themes[Number(layout.poster?.styles?.theme)]?.applyName}
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
        theme={themes[Number(layout.poster?.styles?.theme)]?.applyName}
        figure={<MapContainer />}
        styles={styles}
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
        handleArtworkColor={handleArtworkColor}
        handleArtworkTheme={handleArtworkTheme}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
      />
    ),
    1: (
      <SkyMapPanelContent
        handleArtworkColor={handleArtworkColor}
        handleArtworkTheme={handleArtworkTheme}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
      />
    ),
    2: (
      <MapPanelContent
        handleArtworkColor={handleArtworkColor}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
        handleArtworkTheme={handleArtworkTheme}
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
            {layout.editingProfileProject && (
              <Button
                classNames="w-full"
                type="button"
                onClick={handleUPDATEACCOUNT}
              >
                Update
              </Button>
            )}
            {isUserLogged && (
              <Button
                classNames="w-full mt-auto"
                type="button"
                onClick={handleUPDATEACCOUNT}
              >
                Add To Collection
              </Button>
            )}

            <Button classNames="w-full mt-auto" type="button">
              Add To Cart
            </Button>
          </div>
          <LayoutPreviewWrapper>
            {layout.productId == Number(product_id) &&
              editorUI[layout.productId as keyof typeof panelUI]}
          </LayoutPreviewWrapper>
        </div>
      </PageLayout>
    </>
  );
}
