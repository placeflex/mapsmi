import React, { useEffect, useState, useRef } from "react";

import { Accordion } from "@/components/Accordion";
import dayjs from "dayjs";

import { debounce } from "lodash";

import { api } from "@/axios";

import { paletteArtwork } from "@/modules/LineartSettings/colorsList";

// components
import { DatePickerComponent } from "@/components/Datepicker";
import { Input } from "@/components/Input";
import { SearchSelect } from "@/components/SearchSelect";
import { AutoComplete } from "@/components/AutoComplete";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { setDate, setLocations, setCurrentLocation } from "@/redux/layout";

const debouncedSearch = debounce(callback => callback(), 1000);

interface SkyMapPanelContentInterface {
  handleArtworkColor: (id: number) => void;
  handleChangeLabel: ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => void;
}

export const SkyMapPanelContent = ({
  handleArtworkColor,
  handleChangeLabel,
}: SkyMapPanelContentInterface) => {
  const picker = useRef<any>();
  const dispatch: AppDispatch = useDispatch();
  const [location, setLocation] = useState("");
  const layoutDate = useTypedSelector(({ layout }) => layout.layout.date);
  const locations = useTypedSelector<any>(
    ({ layout }) => layout.layout.locations
  );
  const currentPosterLocation = useTypedSelector(
    ({ layout }) => layout.layout?.currentLocation
  );
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  const onChangeDatePicker = (date: any) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD HH:mm");
      dispatch(setDate(formattedDate));

      handleChangeLabel({
        label: "subline",
        value: dayjs(date).format("MMMM D, YYYY h:mm A"),
      });
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await api.post("/locations", {
        locationName: location,
      });

      const modifyLocations = response.map(opt => {
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

  const handleInputChange = locationName => {
    setLocation(locationName);

    if (locationName) {
      debouncedSearch(fetchLocation);
    } else {
      dispatch(setLocations([]));
    }
  };

  const handleUpdateLabels = name => {
    const spltName = name.split(",");

    if (spltName.length > 1) {
      handleChangeLabel({
        label: "heading",
        value: spltName[0],
      });
      handleChangeLabel({
        label: "subline",
        value: dayjs(layoutDate).format("MMMM D, YYYY h:mm A"),
      });
      handleChangeLabel({
        label: "tagline",
        value: spltName[1],
      });
    } else {
      handleChangeLabel({
        label: "heading",
        value: spltName[0],
      });
      handleChangeLabel({
        label: "subline",
        value: dayjs(layoutDate).format("MMMM D, YYYY h:mm A"),
      });
    }
  };

  const handleSelectLocation = (location, opt) => {
    dispatch(
      setCurrentLocation({
        ...opt,
        name: opt.value,
        data: opt.locationData,
      })
    );

    handleUpdateLabels(opt.value);
  };

  useEffect(() => {
    if (currentPosterLocation?.value) {
      handleUpdateLabels(currentPosterLocation.value);
    }
  }, [currentPosterLocation]);

  return (
    <>
      <Accordion
        items={[
          {
            title: "Moment",
            content: (
              <>
                <div className="mb-4">
                  <AutoComplete
                    options={locations}
                    placeholder="Search for a location, street or landmark"
                    className="w-full"
                    onChange={handleInputChange}
                    onSelect={handleSelectLocation}
                    value={currentPosterLocation}
                  />
                </div>
                <div>
                  <DatePickerComponent
                    label="PICK YOUR SPECIAL MOMENT"
                    onChange={onChangeDatePicker}
                    className="w-full"
                    value={dayjs(layoutDate).format("YYYY-MM-DD HH:mm")}
                    ref={picker}
                  />
                </div>
              </>
            ),
          },
          {
            title: "Customize the colors",
            content: (
              <div className="icons h-[300px] overflow-y-auto grid pr-4 grid-cols-4 gap-2 ">
                {paletteArtwork.map(({ icon, bg, id }): React.ReactNode => {
                  return (
                    <div
                      key={id}
                      className={`flex items-center justify-center h-[50px] bg-white cursor-pointer border-2 ${
                        id === Number(posterStyles?.palette)
                          ? "border-black"
                          : ""
                      }`}
                      onClick={() => handleArtworkColor(id)}
                      style={{ background: bg }}
                    >
                      <div className="w-[20px]">{icon}</div>
                    </div>
                  );
                })}
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
