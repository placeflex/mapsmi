import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import clsx from "clsx";

// components
import { Layout as PageLayout } from "@/components/Layout";
import { LayoutPreviewWrapper } from "@/components/LayoutPreviewWrapper";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";

// layout ui
import { WallartContent } from "@/layouts/WallartContent";
import { SkyMap } from "@/layouts/SkyMap";
import { MapContainer } from "@/layouts/Map/";
import { Zodiac } from "@/layouts/Zodiac";

// lineart settings ( panel )
import { lineArtIcons } from "@/layouts/wallartSettings/lineArtIcons";
import { zodiacIcons } from "@/layouts/wallartSettings/zodiacIcons";
import { basicColors } from "@/layouts/wallartSettings/colorsList";
import { masks } from "@/layouts/wallartSettings/skyMapMasks";
import {
  basicLayoutStyles,
  mapLayoutStyles,
  skyMapLayoutStyles,
} from "@/layouts/wallartSettings/wallartStyles";
import {
  sizes,
  orientations,
  materials,
  frames,
  MATERIAL_PRICES,
} from "@/layouts/wallartAttributes";
import { fontsList } from "@/layouts/wallartSettings/wallartFonts";
import { mapColors } from "@/layouts/wallartSettings/mapColors";

// panels
import { SkyMapPanelContent } from "@/modules/LayoutPanels/SkyMapPanelContent";
import { LineArtPanelContent } from "@/modules/LayoutPanels/LineArtPanelContent";
import { MapPanelContent } from "@/modules/LayoutPanels/MapPanelContent";
import { ZodiacPanelContent } from "@/modules/LayoutPanels/ZodiacPanelContent";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { handleShowProjectSettingsModal } from "@/redux/modals";
import { handleGetCart } from "@/redux/cart";

import {
  initLayout,
  handleChangeStyles,
  handleChangeAttributes,
  handleChangeFrame,
} from "@/redux/layout";

// types
import { UserFieldsProps, handleSaveProject } from "@/redux/user";

// constants
import {
  RENDER_SCALE_EDITOR_PAGE,
  RENDER_SCALE_RENDER_PAGE,
} from "@/layouts/wallartSettings/defaultWallartSettings";
import { productsVariations } from "@/constants/constants";

// helpers
import {
  updateUserCartStorage,
  storagePoster,
  updateCartItem,
  saveCartStorage,
  getCartStorage,
} from "@/helpers/storageData";
import { debounce, isEqual, isEmpty, omit } from "lodash";
export const debouncedApply = debounce(callback => {
  callback();
}, 500);

// styles
import "@/modules/LayoutPanels/editor.scss";

// test
import { api } from "@/axios";

export default function Editor() {
  const router = useRouter();
  const {
    product_id,
    id,
    from,
    fields,
    renderScreenForCart = false,
  } = router.query;
  const FRAME_SCALE = `${1 * 1.5}vmin`;
  const isAdmin = useTypedSelector(({ user }) => user.isAdmin);
  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const dispatch: AppDispatch = useDispatch();

  const handleSelectFigure = async (id: number) => {
    const figure = lineArtIcons.find(icon => icon.id === id);
    dispatch(
      handleChangeStyles({
        style: "artwork",
        id: figure?.id,
      })
    );
  };

  const handleSelectZodiacFigure = async (id: number) => {
    const figure = zodiacIcons.find(icon => icon.id === id);
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

    console.log("currentMaterialId", currentMaterialId);

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
    const currentSizeId = layout.selectedAttributes.size.id;
    const { icon, ...frame } = frames[currentSizeId][id];

    dispatch(handleChangeFrame(frame));
  };

  const handleAddToCart = async () => {
    const storage = localStorage.getItem("cart-storage");

    if (storage) {
      const cartData = JSON.parse(storage);

      let existingItemIndex = -1;
      for (let i = cartData.length - 1; i >= 0; i--) {
        if (cartData[i].uuid === layout.uuid) {
          existingItemIndex = i;
          break;
        }
      }

      const existingItem = cartData[existingItemIndex];

      console.log("existingItemIndex", existingItemIndex);
      console.log("existingItem", existingItem);

      if (existingItemIndex !== -1 && !isEmpty(existingItem)) {
        console.log("объект с таким же uuid уже есть в массиве");

        const { path, quantity, fileId, ...ex } = existingItem;
        const { path: p, quantity: q, fileId: f, ...ls } = layout;

        const isEqualExceptPathAndQuantity =
          JSON.stringify(ex) == JSON.stringify(ls);
        // const isEqualExceptPathAndQuantity = isEqual(
        //   omit(existingItem, ["path", "quantity", "fileId"]),
        //   omit(layout, ["path", "quantity", "fileId"])
        // );

        console.log(
          "isEqualExceptPathAndQuantity",
          isEqualExceptPathAndQuantity
        );

        if (!isEqualExceptPathAndQuantity) {
          console.log("объект в корзине и  ОТЛИЧАЕТСЯ от добавляемого");

          const rq = api
            .post("cart", layout)
            .then(async ({ data, message }: any) => {
              cartData.push({ ...data, quantity: 1 });
              await saveCartStorage(cartData);
              dispatch(handleGetCart());

              toast.success(message);
            })
            .catch(({ error }) => {});

          toast.promise(rq, {
            pending: "Cart is updating! Please wait few seconds.",
          });
        } else {
          console.log("объект в корзине и не отличается от добавляемого");

          cartData[existingItemIndex] = {
            ...layout,
            path: existingItem.path,
            quantity: existingItem.quantity + 1,
          };

          await saveCartStorage(cartData);
          dispatch(handleGetCart());

          toast.success("Cart updated.");
        }
      } else {
        console.log("объект с таким uuid нет в массиве, добавляем его");

        const rq = api
          .post("cart", layout)
          .then(async ({ data, message }: any) => {
            cartData.push({ ...data, quantity: 1 });
            await saveCartStorage(cartData);
            dispatch(handleGetCart());
            toast.success(message);
          })
          .then(() => {})
          .catch(({ error }) => {});

        toast.promise(rq, {
          pending: "Project is adding to cart! Please wait few seconds.",
        });

        // if (!layout.path && !layout.fileId) {
        //   const rq = api
        //     .post("cart", layout)
        //     .then(async ({ data, message }: any) => {
        //       cartData.push({ ...data, quantity: 1 });
        //       await saveCartStorage(cartData);
        //       dispatch(handleGetCart());
        //       toast.success(message);
        //     })
        //     .then(() => {})
        //     .catch(({ error }) => {});

        //   toast.promise(rq, {
        //     pending: "Project is adding to cart! Please wait few seconds.",
        //   });
        // } else {
        //   cartData.push({ ...layout, quantity: 1 });
        //   await saveCartStorage(cartData);
        //   dispatch(handleGetCart());
        // }
      }
    }
  };

  const handleAddWallartToCart = async () => {
    handleAddToCart();
  };

  // useEffect(() => {
  //   if (layout.productId == 1) {
  //     window.devicePixelRatio = 2;
  //   }

  //   if (product_id) {
  //     if (fields) {
  //       const fields = router.asPath.split("fields=");

  //       // const decodedString = decodeURIComponent(
  //       //   fields[1].replace(/\+/g, " ")
  //       // );
  //       const decodedString = decodeURIComponent(fields[1]);

  //       storagePoster({
  //         productId: product_id,
  //         layout: JSON.parse(decodedString),
  //       });

  //       dispatch(initLayout(product_id));
  //     } else {
  //       dispatch(initLayout(product_id));
  //     }
  //   }
  // }, [product_id, from]);

  useEffect(() => {
    if (router.isReady) {
      // if (layout.productId == 1) {
      //   window.devicePixelRatio = 0.5;
      // }

      if (product_id) {
        if (fields) {
          const fields = router.asPath.split("fields=");

          const decodedString = decodeURIComponent(
            fields[1].replace(/\+/g, " ")
          );
          // const decodedString = decodeURIComponent(fields[1]);

          storagePoster({
            productId: product_id,
            layout: JSON.parse(decodedString),
          });

          dispatch(initLayout(product_id));
        } else {
          dispatch(initLayout(product_id));
        }
      }
    }
  }, [product_id, from, router.isReady]);

  useEffect(() => {
    if (product_id && !renderScreenForCart) {
      debouncedApply(() => {
        router.push({
          query: {
            ...router.query,
            product_id: layout.productId,
            fields: JSON.stringify(layout),
          },
        });
      });
    }
  }, [JSON.stringify(layout)]);

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

  const MAP_TEXT_COLOR = layout.poster?.styles?.isMask
    ? mapColors[Number(layout?.poster?.styles?.color)]?.maskOverrides[
        mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
      ]?.textColor
    : mapColors[Number(layout?.poster?.styles?.color)]?.layoutOverrides[
        mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
      ]?.textColor ??
      mapColors[Number(layout?.poster?.styles?.color)]?.textColor;

  const MAP_GRADIENT_COLOR = layout.poster?.styles?.isMask
    ? mapColors[Number(layout?.poster?.styles?.color)]?.maskOverrides[
        mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
      ]?.gradientColor
    : mapColors[Number(layout?.poster?.styles?.color)]?.layoutOverrides[
        mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
      ]?.gradientColor ??
      mapColors[Number(layout?.poster?.styles?.color)]?.gradientColor;

  const MAP_BG_COLOR = layout.poster?.styles?.isMask
    ? mapColors[Number(layout?.poster?.styles?.color)]?.maskOverrides[
        mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
      ]?.bgColor
    : mapColors[Number(layout?.poster?.styles?.color)]?.layoutOverrides[
        mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
      ]?.bgColor ?? mapColors[Number(layout?.poster?.styles?.color)]?.bgColor;

  const mapStyles = {
    "--font": fontsList[Number(layout.poster?.styles?.font)]?.font.variable,
    "--frame-scale": FRAME_SCALE,
    "--render-scale": RENDER_SCALE_EDITOR_PAGE,
    "--text-color": MAP_TEXT_COLOR,
    "--gradientColor": MAP_GRADIENT_COLOR,
    "--bg-color": MAP_BG_COLOR,
    //
    "--mask": `url(${masks[Number(layout.poster?.styles?.maskId)]?.src})`,
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
        className={clsx(
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
        className={clsx(
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
      <WallartContent
        layoutStyle={
          mapLayoutStyles[Number(layout.poster?.styles?.layoutStyle)]?.applyName
        }
        figure={<MapContainer key={layout.poster?.styles?.isMask} />}
        styles={mapStyles}
        texts={{
          heading: layout.poster?.labels?.heading,
          subline: layout.poster?.labels?.subline,
          tagline: layout.poster?.labels?.tagline,
          divider: layout.poster?.labels?.divider,
        }}
        className={clsx(
          {
            [`map poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          {
            ["maskApply"]: layout.poster?.styles?.isMask,
          },
          layout?.selectedAttributes?.orientation?.name.toLowerCase(),
          mapColors[Number(layout.poster?.styles?.color)]?.name,
          renderScreenForCart && "render"
        )}
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
        className={clsx(
          {
            [`zodiac poster-${layout?.selectedAttributes?.size?.name.replaceAll(
              "cm",
              ""
            )}`]: layout?.selectedAttributes?.size?.name,
          },
          { ["maskApply"]: layout.poster?.styles?.isMask },
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

  const RESULT_PRICE = layout?.selectedAttributes?.frame?.type
    ? MATERIAL_PRICES[layout?.selectedAttributes?.material?.id]?.prices[
        layout.selectedAttributes.size.id
      ].price +
      frames[layout?.selectedAttributes?.size?.id]?.[
        layout?.selectedAttributes?.frame?.id
      ]?.price
    : MATERIAL_PRICES[layout?.selectedAttributes?.material?.id]?.prices[
        layout.selectedAttributes.size.id
      ]?.price;

  return (
    <>
      {!renderScreenForCart && product_id ? (
        <PageLayout>
          <div className="flex flex-row-reverse editor-wrapper">
            <LayoutPreviewWrapper
              className={clsx(
                fontsList[Number(layout.poster?.styles?.font)]?.font.variable
              )}
            >
              {layout.productId == Number(product_id) &&
                editorUI[layout.productId as keyof typeof editorUI]}
            </LayoutPreviewWrapper>

            <div className="flex flex-col border-r-[.2rem] fixed lg:relative right-0 bottom-0 left-0 z-20 lg:min-w-[480px] lg:max-w-[480px]">
              <div className="editor-panel w-full overflow-y-auto flex flex-col relative ">
                <div className="h-full overflow-y-auto lg:p-[2rem]">
                  {layout.productId == Number(product_id) &&
                    panelUI[layout.productId as keyof typeof panelUI]}
                </div>
              </div>

              <div className="mt-auto editor-wrapper__buttons">
                <Button
                  className="w-full text-link relative h-[6rem] lg:h-[8rem] flex items-center justify-between uppercase pulse"
                  type="button"
                  color="primary"
                  onClick={handleAddWallartToCart}
                >
                  <span className="h-full flex items-center justify-center text-caption gap-[1rem]">
                    {/* <span className="line-through opacity-50">
                      {RESULT_PRICE} UAH
                    </span> */}
                    <span className="font-bold">
                      {Number(RESULT_PRICE).toFixed(2)} €
                    </span>
                  </span>
                  <span className="font-bold text-bodySmall">Add To Cart</span>
                </Button>

                {isAdmin && (
                  <Button
                    className="w-full"
                    type="button"
                    onClick={() => dispatch(handleShowProjectSettingsModal())}
                  >
                    SETTINGS
                  </Button>
                )}
              </div>
            </div>
          </div>
        </PageLayout>
      ) : (
        <div className="flex flex-row-reverse editor-wrapper render-cart-screen-wrapper">
          <LayoutPreviewWrapper
            className={clsx(
              fontsList[Number(layout.poster?.styles?.font)]?.font.variable
            )}
          >
            {layout.productId == Number(product_id) &&
              editorUI[layout.productId as keyof typeof editorUI]}
          </LayoutPreviewWrapper>
        </div>
      )}
    </>
  );
}
