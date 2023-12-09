import React, { useEffect, useState } from "react";

import classNames from "classnames";

// components
import { Input } from "@/components/Input";
import { Switcher } from "@/components/Switcher";
import { SearchSelect } from "@/components/SearchSelect";

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

import { sizes, orientations } from "@/layouts/LayoutAttributes";

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
} from "@/redux/layout";

const debouncedSearch = debounce(callback => callback(), 1000);

export const IllustrationAccordion = ({ handleChange }: any) => {
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
      <h2 className="text-2xl font-bold mb-2">Layouts</h2>
      <p className="mb-4 text-xs opacity-[0.4]">
        We are all for freedom of choice, if you want to try different
        combinations than our favorites - go ahead and click customize and roll
        your own.
      </p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {basicLayoutStyles.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white text-xs cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
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
      <h2 className="text-2xl font-bold mb-2">Labels</h2>
      <p className="mb-4 text-xs opacity-[0.4]">
        You can customize your design using both text and colors. Use the
        suggested labels, or change them to something else!
      </p>
      <div className="mb-4">
        <Input
          label="Headline"
          className="text-xs"
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
          className="text-xs"
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
          className="text-xs"
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
        className="text-xs"
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
}: any) => {
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes
  );

  return (
    <>
      <div className="flex flex-col mb-4">
        <h5 className="font-bold text-xs mb-2">Select poster size</h5>
        <div className="flex flex-wrap gap-2">
          {sizes.map(({ id, name }): React.ReactNode => {
            return (
              <button
                className={`border text-xs cursor-pointer flex items-center justify-center px-2 py-2 rounded-md grow hover:bg-black hover:text-white shadow-sm border-1  ${
                  Number(posterAttributes?.size?.id) == id ? "border-black" : ""
                }`}
                key={id}
                onClick={() => handleSelectSize(id)}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <h5 className="font-bold text-xs mb-2">Select orientation</h5>
        <div className="flex flex-wrap gap-2">
          {orientations.map(({ id, name }): React.ReactNode => {
            return (
              <button
                className={`border text-xs cursor-pointer flex items-center justify-center px-2 py-2 rounded-md grow hover:bg-black hover:text-white shadow-sm border-1 ${
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
    </>
  );
};

export const LocationAccrodion = () => {
  const [location, setLocation] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const productId = useTypedSelector(({ layout }) => layout?.layout.productId);
  const layoutDate = useTypedSelector(({ layout }) => layout.layout.date);

  const locations = useTypedSelector<any>(
    ({ layout }) => layout.layout.locations
  );

  const currentPosterLocation: any = useTypedSelector(
    ({ layout }) => layout.layout?.currentLocation
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
    dispatch(
      setCurrentLocation({
        ...opt,
        name: opt.value,
        data: opt.locationData,
      })
    );

    handleUpdateLabels(opt.value);
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

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Location</h2>
      <p className="mb-4 text-xs opacity-[0.4]">
        You can search, drag/drop and zoom on the map to get the exact position
        you want on your poster.
      </p>
      <div>
        <AutoComplete
          options={locations}
          placeholder="Search for a location, street or landmark"
          className="w-full"
          onChange={handleInputChange}
          onSelect={handleSelectLocation}
          value={currentPosterLocation}
          label="SEARCH FOR A PLACE"
          key={currentPosterLocation?.value}
        />
      </div>

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
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <div className="icons overflow-y-auto grid grid-cols-4 gap-2 pr-4">
      {mapColors.map(({ icon, id }): React.ReactNode => {
        return (
          <div
            key={id}
            className={`border h-[100px] flex flex-col cursor-pointer border-1 ${
              id === Number(posterStyles?.color) ? "border-black" : ""
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
      <h2 className="text-2xl font-bold mb-2">Layouts</h2>
      <p className="mb-4 text-xs opacity-[0.4]">
        We are all for freedom of choice, if you want to try different
        combinations than our favorites - go ahead and click customize and roll
        your own.
      </p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {skyMapLayoutStyles.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white text-xs cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
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
          <h5 className="text-xs font-bold">Overlay</h5>
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

        {productId == 1 && (
          <>
            <div className="flex justify-between mt-4">
              <h5 className="text-xs font-bold">Mask</h5>
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
                        "h-[80px] border border-1 p-4 cursor-pointer flex justify-center items-center",
                        id === Number(posterStyles?.maskId)
                          ? "border-black"
                          : ""
                      )}
                      onClick={() =>
                        dispatch(
                          handleStylesController({ field: "maskId", value: id })
                        )
                      }
                    >
                      <img src={src} alt="mask" />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between mt-4">
              <h5 className="text-xs font-bold">Stars</h5>
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
              <h5 className="text-xs font-bold">Grid</h5>
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
              <h5 className="text-xs font-bold">Lines</h5>
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
              <h5 className="text-xs font-bold">Milky Way</h5>
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
        )}
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
      <h2 className="text-2xl font-bold mb-2">Layouts</h2>
      <p className="mb-4 text-xs opacity-[0.4]">
        We are all for freedom of choice, if you want to try different
        combinations than our favorites - go ahead and click customize and roll
        your own.
      </p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {mapLayoutStyles.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white text-xs cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
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
      <h2 className="text-2xl font-bold mb-2">Fonts</h2>
      <p className="mb-4 text-xs opacity-[0.4]">You can change fonts.</p>
      <div className="icons overflow-y-auto flex flex-wrap gap-1">
        {fontsList.map(({ name, id }) => {
          return (
            <button
              key={id}
              className={`border bg-white text-xs cursor-pointer flex items-center justify-center px-3 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-1 grow ${
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
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  const options = zodiacIconsList.map(zodiac => ({
    label: zodiac.name,
    value: zodiac.id,
    date: zodiac.date,
    figure: zodiac.figure,
  }));

  return (
    <SearchSelect
      placeholder="Select an option"
      options={options}
      onChange={handleChange}
      className="w-full"
      value={posterStyles.artwork}
      optionRender={({ data }: any) => {
        return (
          <div key={data.label} className="flex items-center">
            <div className="flex items-end">
              <h5 className="font-bold text-small">{data.label}</h5>
              <h6 className="text-extraSmall ml-1">{data.date}</h6>
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
