import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

// components
import { Input } from "@/components/Input";
import { Switcher } from "@/components/Switcher";
import { SearchSelect } from "@/components/SearchSelect";
import { TabsPanel } from "@/components/TabsPanel";
import { SketchPicker, ChromePicker } from "react-color";
import ReactDragListView from "react-drag-listview";

// lineart settings ( panel )
import { lineArtIconsList } from "@/layouts/LayoutSettings/lineArtIconsList";
import { zodiacIconsList } from "@/layouts/LayoutSettings/zodiacIconsList";
import { basicColors } from "@/layouts/LayoutSettings/colorsList";
import { mapColors } from "@/layouts/LayoutSettings/mapColors";
import { maskOverlays, masks } from "@/layouts/LayoutSettings/skyMapMasks";
import {
  basicLayoutStyles,
  mapLayoutStyles,
  skyMapLayoutStyles,
} from "@/layouts/LayoutSettings/artworkStylesList";

import { fontsList } from "@/layouts/LayoutSettings/layoutFonts";

import dayjs from "dayjs";

import {
  sizes,
  orientations,
  materials,
  frames,
  MATERIAL_PRICES,
  FRAMES_PRICES,
} from "@/layouts/LayoutAttributes";

import { AutoComplete } from "@/components/AutoComplete";

// components
import { DatePickerComponent } from "@/components/Datepicker";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";

import { debounce } from "lodash";

import { api } from "@/axios";

import {
  setDate,
  setLocations,
  setCurrentLocation,
  handleResetLabels,
  handleChangeLables,
  handleStylesController,
  deleteLocation,
  reOrderLocations,
  renderMarkersController,
  connectLocationsController,
  renderLabelsController,
  handleSaveCustomCoordinatesForMap,
  setElementsColor,
  setMapLabelsColor,
  setCurrentLocationForSkyMap,
} from "@/redux/layout";

// icons
import Delete from "@/public/icons/close.svg";
import Drag from "@/public/icons/drag-icon.svg";

const debouncedSearch = debounce(callback => callback(), 1000);

export const IllustrationAccordion = ({ handleChange, className }: any) => {
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <div className="icons h-[300px] overflow-y-auto grid pr-4 grid-cols-3 gap-2 w-full">
      {lineArtIconsList.map(({ icon, id }): React.ReactNode => {
        return (
          <div
            key={id}
            className={`border h-[120px] bg-white p-4 cursor-pointer border-1 ${
              id === Number(posterStyles?.artwork) ? "border-black" : ""
            }`}
            onClick={() => handleChange(id)}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
};

export const ColorsAccordion = ({ handleChange }: any) => {
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <div className="icons h-[300px] overflow-y-auto grid grid-cols-4 gap-2 pr-4">
      {basicColors.map(({ icon, bg, id }): React.ReactNode => {
        return (
          <div
            key={id}
            className={`border flex items-center justify-center h-[50px] bg-white cursor-pointer border-1 ${
              id === Number(posterStyles?.color) ? "border-black" : ""
            }`}
            onClick={() => handleChange(id)}
            style={{ background: bg }}
          >
            <div className="w-[20px]">{icon}</div>
          </div>
        );
      })}
    </div>
  );
};

export const LayoutsAccordion = ({ handleChange }: any) => {
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <>
      <h2 className=" font-bold mb-2">Layouts</h2>
      <p className="mb-4  opacity-[0.4]">
        We are all for freedom of choice, if you want to try different
        combinations than our favorites - go ahead and click customize and roll
        your own.
      </p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {basicLayoutStyles.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white  cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
                id === Number(posterStyles?.layoutStyle) ? "border-black" : ""
              }`}
              onClick={() => handleChange(id)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export const TextsAccordion = () => {
  const dispatch: AppDispatch = useDispatch();

  const posterLabels = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.labels
  );

  const handleChange = ({ label, value }: { label: string; value: string }) => {
    dispatch(
      handleChangeLables({
        label: label,
        value: value,
      })
    );
  };

  return (
    <>
      <h2 className=" font-bold mb-2">Labels</h2>
      <p className="mb-4  opacity-[0.4]">
        You can customize your design using both text and colors. Use the
        suggested labels, or change them to something else!
      </p>
      <div className="mb-4">
        <Input
          label="Headline"
          className=""
          onChange={v =>
            handleChange({
              label: "heading",
              value: v.target.value,
            })
          }
          maxlength={40}
          value={posterLabels?.heading}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Subline"
          className=""
          onChange={v =>
            handleChange({
              label: "subline",
              value: v.target.value,
            })
          }
          maxlength={60}
          value={posterLabels?.subline}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Divider"
          className=""
          onChange={v =>
            handleChange({
              label: "divider",
              value: v.target.value,
            })
          }
          maxlength={40}
          value={posterLabels?.divider}
        />
      </div>
      <Input
        label="Tagline"
        className=""
        onChange={v =>
          handleChange({
            label: "tagline",
            value: v.target.value,
          })
        }
        maxlength={40}
        value={posterLabels?.tagline}
      />
    </>
  );
};

export const SizeAccordion = ({
  handleSelectSize,
  handleSelectOrientations,
  handleSelectMaterial,
  handleSelectFrame,
}: any) => {
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes
  );

  const onChange = (id: string) => {
    handleSelectMaterial(Number(id));
  };

  const materialItems =
    materials.length &&
    materials?.map(material => {
      return {
        key: material.id,
        label: <span className="">{material.name}</span>,
        children: (
          <div>
            {material?.sizes?.map((size, idx) => {
              return (
                <button
                  className={`border  cursor-pointer flex flex-col gap-1 items-center justify-center px-2 py-2 rounded-md grow hover:bg-black hover:text-white shadow-sm border-1  ${
                    Number(posterAttributes?.size?.id) == size.id
                      ? "border-black"
                      : ""
                  }`}
                  key={size.id}
                  onClick={() => handleSelectSize(size.id)}
                >
                  <span className="block">{size.name}</span>
                  <span></span>
                  <span className="block">
                    {MATERIAL_PRICES[material.id].prices[size.id]?.price} грн
                  </span>
                </button>
              );
            })}
          </div>
        ),
      };
    });

  return (
    <>
      <div className="flex flex-col mb-4">
        <h5 className="font-bold  mb-2">Select poster size</h5>
        <div className="flex flex-wrap gap-2">
          <TabsPanel
            defaultActiveKey={posterAttributes?.material?.id}
            items={materialItems}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h5 className="font-bold  mb-2">Select orientation</h5>
        <div className="flex flex-wrap gap-2">
          {orientations.map(({ id, name }): React.ReactNode => {
            return (
              <button
                className={`border  cursor-pointer flex items-center justify-center px-2 py-2 rounded-md grow hover:bg-black hover:text-white shadow-sm border-1 ${
                  id === Number(posterAttributes?.orientation?.id)
                    ? "border-black"
                    : ""
                }`}
                key={id}
                onClick={() => handleSelectOrientations(id)}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <h5 className="font-bold  mb-2">Select Frame</h5>
        <div className="flex flex-wrap justify-center">
          {frames.map(frame => {
            return (
              <div
                key={frame.id}
                onClick={() => handleSelectFrame(frame.id)}
                className="w-[calc(100%/4-1rem)] m-[0.5rem] relative cursor-pointer"
              >
                {frame.icon && (
                  <Image
                    src={frame.icon}
                    alt="frame"
                    objectFit="cover"
                    className="w-full block"
                  />
                )}
                <span>{FRAMES_PRICES[frame.id].price}$</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const LocationAccrodion = () => {
  const [location, setLocation] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const productId = useTypedSelector(({ layout }) => layout?.layout.productId);
  const layoutDate = useTypedSelector(({ layout }) => layout.layout.date);

  const locationsDropdown = useTypedSelector<any>(
    ({ layout }) => layout.layout.locationsDropdown
  );

  const currentPosterLocation: any = useTypedSelector(
    ({ layout }) => layout.layout?.locations
  );

  const connectLocations = useTypedSelector(
    ({ layout }) => layout.layout.connectLocations
  );

  const renderMarkers = useTypedSelector(
    ({ layout }) => layout.layout.renderMarkers
  );

  const renderLabels = useTypedSelector(
    ({ layout }) => layout.layout.renderLabels
  );

  const fetchLocation = async () => {
    try {
      const response: [] = await api.post("/locations", {
        locationName: location,
      });

      const modifyLocations = response.map((opt: { place_name: string }) => {
        return {
          value: opt.place_name,
          label: opt.place_name,
          ...opt,
        };
      });

      dispatch(setLocations(modifyLocations));
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleUpdateLabels = (name: string) => {
    dispatch(handleResetLabels());

    const spltName = name.split(",");

    if (productId == 1) {
      if (spltName.length > 1) {
        dispatch(
          handleChangeLables({
            label: "heading",
            value: spltName[0],
          })
        );

        dispatch(
          handleChangeLables({
            label: "subline",
            value: dayjs(layoutDate).format("MMMM D, YYYY h:mm A"),
          })
        );

        dispatch(
          handleChangeLables({
            label: "tagline",
            value: spltName[1],
          })
        );
      } else {
        dispatch(
          handleChangeLables({
            label: "heading",
            value: spltName[0],
          })
        );
        dispatch(
          handleChangeLables({
            label: "subline",
            value: dayjs(layoutDate).format("MMMM D, YYYY h:mm A"),
          })
        );
      }
    } else {
      dispatch(
        handleChangeLables({
          label: "heading",
          value: spltName[0],
        })
      );

      dispatch(
        handleChangeLables({
          label: "subline",
          value: spltName[1],
        })
      );

      if (spltName[2]) {
        dispatch(
          handleChangeLables({
            label: "tagline",
            value: spltName[2],
          })
        );
      }
    }
  };

  const handleInputChange = (locationName: any) => {
    setLocation(locationName);

    if (locationName) {
      debouncedSearch(fetchLocation);
    } else {
      dispatch(setLocations([]));
    }
  };

  const handleSelectLocation = (location: any, opt: any) => {
    if (productId == 2) {
      dispatch(
        setCurrentLocation({
          ...opt,
          name: opt.value,
          data: opt.locationData,
        })
      );
    } else {
      dispatch(
        setCurrentLocationForSkyMap({
          ...opt,
          name: opt.value,
          data: opt.locationData,
        })
      );
    }

    handleUpdateLabels(opt.value);

    if (productId == 2) {
      dispatch(handleSaveCustomCoordinatesForMap({}));
    }
  };

  const onChangeDatePicker = (date: any) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD HH:mm");
      dispatch(setDate(formattedDate));

      dispatch(
        handleChangeLables({
          label: "subline",
          value: dayjs(date).format("MMMM D, YYYY h:mm A"),
        })
      );
    }
  };

  const onMoveEnd = (newList: any) => {
    console.log("onMoveEnd", newList);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newLocations = [...currentPosterLocation];
      const [removed] = newLocations.splice(fromIndex, 1);
      newLocations.splice(toIndex, 0, removed);

      dispatch(reOrderLocations(newLocations));
    },
    nodeSelector: "div",
    handleSelector: ".drag",
    lineClassName: "lineName",
  };

  return (
    <>
      <h2 className=" font-bold mb-2">Location</h2>
      <p className="mb-4  opacity-[0.4]">
        You can search, drag/drop and zoom on the map to get the exact position
        you want on your poster.
      </p>

      <div className="">
        <AutoComplete
          options={locationsDropdown}
          placeholder="Search for a location, street or landmark"
          className="w-full"
          onChange={handleInputChange}
          onSelect={handleSelectLocation}
          value={
            productId == 2
              ? locationsDropdown[locationsDropdown.length - 1]?.value
              : currentPosterLocation[0]?.name
          }
          label="Search for place"
          key={currentPosterLocation?.length}
        />
      </div>

      {productId == 2 && currentPosterLocation.length ? (
        <div className="mt-[1rem]">
          <h3 className="font-bold">Your Locations</h3>
          <ReactDragListView {...dragProps}>
            {currentPosterLocation.map((loc, idx) => {
              return (
                <div
                  key={loc.id}
                  className="w-full flex justify-between items-center border-solid border border-main mt-2 px-[1rem] py-[1.1rem] overflow-hidden"
                >
                  <button className="drag mr-[1rem]">
                    <Drag width={20} />
                  </button>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis w-full text-caption">
                    {loc.value}
                  </span>

                  <button
                    className="flex flex-col items-center justify-center ml-4"
                    onClick={() => dispatch(deleteLocation(loc.id))}
                  >
                    <Delete width={14} stroke="#000" />
                  </button>
                </div>
              );
            })}
          </ReactDragListView>
        </div>
      ) : null}

      {productId == 2 && (
        <div className="mt-[2rem] flex items-center justify-between">
          <span>Connect Locations</span>
          <Switcher
            checked={connectLocations}
            disabled={currentPosterLocation.length < 2}
            onChange={() => {
              dispatch(connectLocationsController(!connectLocations));
            }}
          />
        </div>
      )}

      {productId == 2 && (
        <div className="mt-[2rem] flex items-center justify-between">
          <span>Markers</span>
          <Switcher
            checked={renderMarkers}
            disabled={!currentPosterLocation.length}
            onChange={() => {
              dispatch(renderMarkersController(!renderMarkers));
            }}
          />
        </div>
      )}

      {productId == 2 && (
        <div className="mt-[2rem] flex items-center justify-between">
          <span>Labels</span>
          <Switcher
            checked={renderLabels}
            disabled={!currentPosterLocation.length || !renderMarkers}
            onChange={() => {
              dispatch(renderLabelsController(!renderLabels));
            }}
          />
        </div>
      )}

      {productId == 1 && (
        <div className="mt-4">
          <DatePickerComponent
            label="PICK YOUR SPECIAL MOMENT"
            onChange={onChangeDatePicker}
            className="w-full"
            value={dayjs(layoutDate).format("YYYY-MM-DD HH:mm")}
          />
        </div>
      )}
    </>
  );
};

export const ColorsForMapAccordion = ({ handleChange }: any) => {
  const [showElementsColorPicker, setElementsColorPicker] = useState(false);
  const [showLabelsTextColorPicker, setLabelsTextColorPicker] = useState(false);

  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );
  const elementsColor = useTypedSelector(
    ({ layout }) => layout.layout?.elementsColor
  );
  const labelsColor = useTypedSelector(
    ({ layout }) => layout.layout?.labelsTextColor
  );

  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div className="icons overflow-y-auto items-start flex gap-2 h-[300px]">
        {mapColors.map(({ icon, id, name }): React.ReactNode => {
          return (
            <div
              key={id}
              className="flex flex-col justify-center h-[120px] w-[33.333%]"
              onClick={() => handleChange(id)}
            >
              <div className="block w-full h-full relative">{icon}</div>
              <span className="text-center mt-2">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center my-4">
        <h5 className="font-bold  mr-4">Elements Color:</h5>
        <div className="relative flex">
          <div
            className="p-1 border inline-block cursor-pointer"
            onClick={() => setElementsColorPicker(prev => !prev)}
          >
            <div
              className="w-[3.6rem] h-[1.4rem] border"
              style={{
                background: `${elementsColor}`,
              }}
            />
          </div>

          {showElementsColorPicker ? (
            <div className="absolute z-10">
              <div
                className="fixed top-0 right-0 bottom-0 left-0"
                onClick={() => setElementsColorPicker(prev => !prev)}
              />
              <ChromePicker
                disableAlpha
                color={elementsColor}
                onChange={e => {
                  dispatch(setElementsColor(e.hex));
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center my-4">
        <h5 className="font-bold  mr-4">Labels Text Color:</h5>
        <div className="relative flex">
          <div
            className="p-1 border inline-block cursor-pointer"
            onClick={() => setLabelsTextColorPicker(prev => !prev)}
          >
            <div
              className="w-[3.6rem] h-[1.4rem] border"
              style={{
                background: `${labelsColor}`,
              }}
            />
          </div>

          {showLabelsTextColorPicker ? (
            <div className="absolute z-10">
              <div
                className="fixed top-0 right-0 bottom-0 left-0"
                onClick={() => setLabelsTextColorPicker(prev => !prev)}
              />

              <ChromePicker
                disableAlpha
                color={labelsColor}
                onChange={e => {
                  dispatch(setMapLabelsColor(e.hex));
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export const LayoutsSkyMapAccordion = ({ handleChange }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const isMask = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles?.isMask
  );

  const productId = useTypedSelector(({ layout }) => layout.layout?.productId);

  const isOverlay = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles?.isOverlay
  );

  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <>
      <h2 className=" font-bold mb-2">Layouts</h2>
      <p className="mb-4  opacity-[0.4]">
        We are all for freedom of choice, if you want to try different
        combinations than our favorites - go ahead and click customize and roll
        your own.
      </p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {skyMapLayoutStyles.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white  cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
                id === Number(posterStyles?.layoutStyle) ? "border-black" : ""
              }`}
              onClick={() => handleChange(id)}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="mt-5 w-full">
        <div className="flex justify-between">
          <h5 className=" font-bold">Overlay</h5>
          <Switcher
            checked={isOverlay}
            onChange={() => {
              dispatch(
                handleStylesController({
                  field: "isOverlay",
                  value: !isOverlay,
                })
              );
              dispatch(
                handleStylesController({ field: "isMask", value: false })
              );
            }}
          />
        </div>

        {isOverlay && (
          <div className="icons max-h-[300px] overflow-y-auto grid grid-cols-4 gap-2 pr-4 mt-2">
            {maskOverlays.map(({ id, figure }) => {
              return (
                <div
                  key={id}
                  className={classNames(
                    "h-[80px] border border-1 p-4 cursor-pointer",
                    id === Number(posterStyles?.overlayId) ? "border-black" : ""
                  )}
                  onClick={() =>
                    dispatch(
                      handleStylesController({ field: "overlayId", value: id })
                    )
                  }
                >
                  {figure}
                </div>
              );
            })}
          </div>
        )}

        <>
          <div className="flex justify-between mt-4">
            <h5 className=" font-bold">Mask</h5>
            <Switcher
              checked={isMask}
              onChange={() => {
                dispatch(
                  handleStylesController({ field: "isOverlay", value: false })
                );
                dispatch(
                  handleStylesController({ field: "isMask", value: !isMask })
                );
              }}
            />
          </div>

          {isMask && (
            <div className="icons max-h-[300px] overflow-y-auto grid grid-cols-4 gap-2 pr-4 mt-2">
              {masks.map(({ id, src }) => {
                return (
                  <div
                    key={id}
                    className={classNames(
                      "h-[80px] border border-1 p-4 cursor-pointer flex justify-center items-center relative",
                      id === Number(posterStyles?.maskId) ? "border-black" : ""
                    )}
                    onClick={() =>
                      dispatch(
                        handleStylesController({ field: "maskId", value: id })
                      )
                    }
                  >
                    <Image src={src} priority={true} alt="name" layout="fill" />
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between mt-4">
            <h5 className=" font-bold">Stars</h5>
            <Switcher
              checked={posterStyles?.stars}
              onChange={() => {
                dispatch(
                  handleStylesController({
                    field: "stars",
                    value: !posterStyles?.stars,
                  })
                );
              }}
            />
          </div>

          <div className="flex justify-between mt-4">
            <h5 className=" font-bold">Labels</h5>
            <Switcher
              checked={posterStyles?.labels}
              onChange={() => {
                dispatch(
                  handleStylesController({
                    field: "labels",
                    value: !posterStyles?.labels,
                  })
                );
              }}
            />
          </div>

          <div className="flex justify-between mt-4">
            <h5 className=" font-bold">Grid</h5>
            <Switcher
              checked={posterStyles?.grid}
              onChange={() => {
                dispatch(
                  handleStylesController({
                    field: "grid",
                    value: !posterStyles?.grid,
                  })
                );
              }}
            />
          </div>
          <div className="flex justify-between mt-4">
            <h5 className=" font-bold">Lines</h5>
            <Switcher
              checked={posterStyles?.lines}
              onChange={() => {
                dispatch(
                  handleStylesController({
                    field: "lines",
                    value: !posterStyles?.lines,
                  })
                );
              }}
            />
          </div>
          <div className="flex justify-between mt-4">
            <h5 className=" font-bold">Milky Way</h5>
            <Switcher
              checked={posterStyles?.milkyway}
              onChange={() => {
                dispatch(
                  handleStylesController({
                    field: "milkyway",
                    value: !posterStyles?.milkyway,
                  })
                );
              }}
            />
          </div>
        </>
      </div>
    </>
  );
};

export const LayoutsMapAccordion = ({ handleChange }: any) => {
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <>
      <h2 className=" font-bold mb-2">Layouts</h2>
      <p className="mb-4  opacity-[0.4]">
        We are all for freedom of choice, if you want to try different
        combinations than our favorites - go ahead and click customize and roll
        your own.
      </p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {mapLayoutStyles.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white  cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
                id === Number(posterStyles?.layoutStyle) ? "border-black" : ""
              }`}
              onClick={() => handleChange(id)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export const FontsAccordion = ({ handleChange }: any) => {
  const currentFontId = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles?.font
  );

  return (
    <>
      <h2 className=" font-bold mb-2">Fonts</h2>
      <p className="mb-4  opacity-[0.4]">You can change fonts.</p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {fontsList.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white  cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
                id === Number(currentFontId) ? "border-black" : ""
              }`}
              onClick={() => handleChange(id)}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          );
        })}
      </div>
    </>
  );
};

export const ZodiacSelect = ({ handleChange }: any) => {
  const dispatch = useDispatch();

  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  const options = zodiacIconsList.map(zodiac => ({
    label: zodiac.name,
    value: zodiac.id,
    date: zodiac.date,
    figure: zodiac.figure,
  }));

  const handleUpdate = id => {
    const title = zodiacIconsList[id].name;
    const date = zodiacIconsList[id].date;

    console.log("title", title);

    console.log("date", date);

    dispatch(
      handleChangeLables({
        label: "heading",
        value: title,
      })
    );

    dispatch(
      handleChangeLables({
        label: "subline",
        value: date,
      })
    );

    handleChange(id);
  };

  return (
    <SearchSelect
      placeholder="Select an option"
      options={options}
      onChange={handleUpdate}
      className="w-full"
      value={posterStyles.artwork}
      optionRender={({ data }: any) => {
        return (
          <div key={data.label} className="flex items-center">
            <div className="flex items-end">
              <h5 className="font-bold">{data.label}</h5>
              <h6 className="ml-1">{data.date}</h6>
            </div>
            <span
              role="img"
              aria-label={data.label}
              className="w-[28px] ml-auto"
            >
              {data.figure}
            </span>
          </div>
        );
      }}
    />
  );
};
