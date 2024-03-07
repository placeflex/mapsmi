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

// types
import { UserFieldsProps } from "@/redux/user";

// styles
import "@/modules/LayoutPanels/editor.scss";

export default function Editor() {
  const router = useRouter();
  const { product_id, id } = router.query;
  const FRAME_SCALE = `${1 * 1.5}vmin`;
  const RENDER_SCALE = 1;
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
    "--render-scale": RENDER_SCALE,
    "--frame-scale": FRAME_SCALE,
  };

  const mapStyles = {
    "--text-color": mapColors[Number(layout.poster?.styles?.color)]?.textColor,
    "--font": fontsList[Number(layout.poster?.styles?.font)]?.font.variable,
    "--gradientColor":
      mapColors[Number(layout.poster?.styles?.color)]?.gradientColor,
    "--render-scale": RENDER_SCALE,
    "--frame-scale": FRAME_SCALE,
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
        <div className="flex editor-wrapper">
          <LayoutPreviewWrapper
            className={`${
              fontsList[Number(layout.poster?.styles?.font)]?.font.variable
            }`}
          >
            {layout.productId == Number(product_id) &&
              editorUI[layout.productId as keyof typeof editorUI]}
          </LayoutPreviewWrapper>

          <div className="min-w-[600px] max-w-[600px] w-full bg-white p-3 overflow-y-auto editor-panel flex flex-col relative">
            <div className="mb-4 h-full overflow-y-auto">
              {layout.productId == Number(product_id) &&
                panelUI[layout.productId as keyof typeof panelUI]}
            </div>

            <div className="mt-auto p-4">
              <Button
                classNames="w-full"
                type="button"
                onClick={handleUPDATEACCOUNT}
              >
                Add To Collection
              </Button>

              <Button classNames="w-full mt-2" type="button">
                {RESULT_PRICE}
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
