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
import { MapContainer } from "@/layouts/Map/";
import { Zodiac } from "@/layouts/Zodiac";

// lineart settings ( panel )
import { lineArtIconsList } from "@/layouts/LayoutSettings/lineArtIconsList";
import { zodiacIconsList } from "@/layouts/LayoutSettings/zodiacIconsList";
import { basicColors } from "@/layouts/LayoutSettings/colorsList";
import { masks } from "@/layouts/LayoutSettings/skyMapMasks";
import {
  basicLayoutStyles,
  mapLayoutStyles,
  skyMapLayoutStyles,
} from "@/layouts/LayoutSettings/artworkStylesList";
import {
  sizes,
  orientations,
  materials,
  frames,
  MATERIAL_PRICES,
  FRAMES_PRICES,
} from "@/layouts/LayoutAttributes";
import { fontsList } from "@/layouts/LayoutSettings/layoutFonts";
import { mapColors } from "@/layouts/LayoutSettings/mapColors";

// panels
import { SkyMapPanelContent } from "@/modules/LayoutPanels/SkyMapPanelContent";
import { LineArtPanelContent } from "@/modules/LayoutPanels/LineArtPanelContent";
import { MapPanelContent } from "@/modules/LayoutPanels/MapPanelContent";
import { ZodiacPanelContent } from "@/modules/LayoutPanels/ZodiacPanelContent";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";

import {
  initLayout,
  handleChangeStyles,
  handleChangeAttributes,
  initFromProfile,
  handleChangeFrame,
} from "@/redux/layout";

import { handleSaveProject, handleUpdateProject } from "@/redux/user";
import { handleAddToPopularProjects } from "@/redux/popular-wallarts";

// types
import { UserFieldsProps } from "@/redux/user";

// constants
import { RENDER_SCALE_EDITOR_PAGE } from "@/constants/defaultLayoutSettings";

// styles
import "@/modules/LayoutPanels/editor.scss";

export default function Editor() {
  const router = useRouter();
  const { product_id, id } = router.query;
  const FRAME_SCALE = `${1 * 1.5}vmin`;
  const user: UserFieldsProps = useTypedSelector(({ user }) => user.user);
  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const dispatch: AppDispatch = useDispatch();

  const handleSelectFigure = async (id: number) => {
    const figure = lineArtIconsList.find(icon => icon.id === id);
    dispatch(
      handleChangeStyles({
        style: "artwork",
        id: figure?.id,
      })
    );
  };

  const handleSelectZodiacFigure = async (id: number) => {
    const figure = zodiacIconsList.find(icon => icon.id === id);
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
    const currentMaterialId = layout.selectedAttributes.material.id;

    const size = materials[currentMaterialId].sizes[id];

    dispatch(handleChangeAttributes({ attr: "size", value: size }));
  };

  const handleSelectOrientations = (id: number) => {
    const orientation = orientations.find(style => style.id === id);
    dispatch(
      handleChangeAttributes({ attr: "orientation", value: orientation })
    );
  };

  const handleSelectMaterial = (id: number) => {
    const material = materials.find(material => material.id === id);

    dispatch(handleChangeAttributes({ attr: "material", value: material }));
  };

  const handleSelectFrame = (id: number) => {
    const currentFrame = frames[id];

    dispatch(handleChangeFrame(currentFrame));
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

  const handleAddPupularProject = () => {
    dispatch(handleAddToPopularProjects({ id: product_id }));
  };

  useEffect(() => {
    if (id) {
      const project = user?.projects?.find(project => project.uuid == id);
      dispatch(initFromProfile(project));
    } else {
      dispatch(initLayout(product_id));
    }
    // dispatch(initLayout(product_id));
  }, [product_id, user.projects]);

  // useEffect(() => {
  //   const dpi = 300;
  //   Object.defineProperty(window, "devicePixelRatio", {
  //     get: function () {
  //       return 10;
  //     },
  //   });
  // }, []);

  const styles = {
    "--text-color":
      basicColors[Number(layout.poster?.styles?.color)]?.textColor,
    "--bg-color": basicColors[Number(layout.poster?.styles?.color)]?.bg,
    "--illustration-color":
      basicColors[Number(layout.poster?.styles?.color)]?.illustrationColor,
    "--font": fontsList[Number(layout.poster?.styles?.font)]?.font.variable,
    "--mask": `url(${masks[Number(layout.poster?.styles?.maskId)]?.src})`,
    "--render-scale": RENDER_SCALE_EDITOR_PAGE,
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
    "--frame-scale": FRAME_SCALE,
    "--render-scale": RENDER_SCALE_EDITOR_PAGE,
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
          layout?.selectedAttributes?.orientation?.name.toLowerCase(),
          mapColors[Number(layout.poster?.styles?.color)]?.name
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

  const panelUI = {
    0: (
      <LineArtPanelContent
        handleSelectFigure={handleSelectFigure}
        handleChangeLayoutColor={handleChangeLayoutColor}
        handleChangeLayoutStyle={handleChangeLayoutStyle}
        handleSelectSize={handleSelectSize}
        handleSelectOrientations={handleSelectOrientations}
        handleSelectMaterial={handleSelectMaterial}
        handleChangeFont={handleChangeFont}
        handleSelectFrame={handleSelectFrame}
      />
    ),
    1: (
      <SkyMapPanelContent
        handleChangeLayoutColor={handleChangeLayoutColor}
        handleChangeLayoutStyle={handleChangeLayoutSkyMapStyle}
        handleSelectSize={handleSelectSize}
        handleSelectMaterial={handleSelectMaterial}
        handleSelectOrientations={handleSelectOrientations}
        handleChangeFont={handleChangeFont}
        handleSelectFrame={handleSelectFrame}
      />
    ),
    2: (
      <MapPanelContent
        handleChangeLayoutColor={handleChangeLayoutColor}
        handleChangeLayoutStyle={handleChangeLayoutMapStyle}
        handleSelectSize={handleSelectSize}
        handleSelectMaterial={handleSelectMaterial}
        handleSelectOrientations={handleSelectOrientations}
        handleChangeFont={handleChangeFont}
        handleSelectFrame={handleSelectFrame}
      />
    ),
    3: (
      <ZodiacPanelContent
        handleSelectFigure={handleSelectZodiacFigure}
        handleChangeLayoutColor={handleChangeLayoutColor}
        handleChangeLayoutStyle={handleChangeLayoutSkyMapStyle}
        handleSelectSize={handleSelectSize}
        handleSelectMaterial={handleSelectMaterial}
        handleSelectOrientations={handleSelectOrientations}
        handleChangeFont={handleChangeFont}
        handleSelectFrame={handleSelectFrame}
      />
    ),
  };

  const RESULT_PRICE =
    layout?.selectedAttributes?.frame?.id !== 0
      ? MATERIAL_PRICES[layout?.selectedAttributes?.material?.id]?.prices[
          layout.selectedAttributes.size.id
        ].price + FRAMES_PRICES[layout?.selectedAttributes?.frame?.id]?.price
      : MATERIAL_PRICES[layout?.selectedAttributes?.material?.id]?.prices[
          layout.selectedAttributes.size.id
        ].price;

  return (
    <>
      <PageLayout>
        <div className="flex flex-row-reverse editor-wrapper">
          <LayoutPreviewWrapper
            className={`${
              fontsList[Number(layout.poster?.styles?.font)]?.font.variable
            }`}
          >
            {layout.productId == Number(product_id) &&
              editorUI[layout.productId as keyof typeof editorUI]}
          </LayoutPreviewWrapper>

          <div className="flex flex-col  border-r-[.2rem]">
            <div className="editor-panel min-w-[480px] max-w-[480px] w-full overflow-y-auto flex flex-col relative p-[2rem]">
              <div className="h-full overflow-y-auto">
                {layout.productId == Number(product_id) &&
                  panelUI[layout.productId as keyof typeof panelUI]}
              </div>
            </div>

            <div className="mt-auto">
              {/* <Button
                classNames="w-full"
                type="button"
                onClick={handleUPDATEACCOUNT}
              >
                Add To Collection
              </Button> */}

              <Button
                classNames="w-full"
                type="button"
                onClick={handleUPDATEACCOUNT}
              >
                {RESULT_PRICE}
                Add To Cart
              </Button>
              <Button
                classNames="w-full"
                type="button"
                onClick={handleAddPupularProject}
              >
                POPULAR
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
