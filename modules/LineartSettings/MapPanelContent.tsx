import React, { useEffect, useState } from "react";

import { Accordion } from "@/components/Accordion";

import { debounce } from "lodash";

import { api } from "@/axios";

import { paletteArtwork } from "@/modules/LineartSettings/colorsList";
import { sizes, orientations } from "@/layouts/LayoutAttributes";
// components
import { AutoComplete } from "@/components/AutoComplete";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { setDate, setLocations, setCurrentLocation } from "@/redux/layout";

const debouncedSearch = debounce(callback => callback(), 1000);

interface MapPanelContentInterface {
  handleArtworkColor: (id: number) => void;
  handleChangeLabel: ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => void;
  handleSelectSize: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
}

export const MapPanelContent = ({
  handleArtworkColor,
  handleChangeLabel,
  handleSelectSize,
  handleSelectOrientations,
}: MapPanelContentInterface) => {
  const dispatch: AppDispatch = useDispatch();
  const [location, setLocation] = useState("");
  const locations = useTypedSelector<any>(
    ({ layout }) => layout.layout.locations
  );
  const currentPosterLocation = useTypedSelector(
    ({ layout }) => layout.layout?.currentLocation
  );

  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes
  );
  const posterLabels = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.labels
  );

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

    handleChangeLabel({
      label: "heading",
      value: spltName[0],
    });
    handleChangeLabel({
      label: "subline",
      value: spltName[1],
    });

    if (spltName[2]) {
      handleChangeLabel({
        label: "tagline",
        value: spltName[2],
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
            title: "Location",
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
              </>
            ),
          },
          {
            title: "Change the size",
            content: (
              <>
                <div className="flex flex-col mb-4">
                  <h5 className="font-bold text-sm mb-2">Select poster size</h5>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(({ id, name }): React.ReactNode => {
                      return (
                        <button
                          className={`border bg-bg text-xs cursor-pointer flex items-center justify-center px-4 py-3 rounded-md grow hover:bg-black hover:text-white shadow-sm border-2  ${
                            Number(posterAttributes?.size?.id) == id
                              ? "border-black"
                              : ""
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
                  <h5 className="font-bold text-sm mb-2">Select orientation</h5>
                  <div className="flex flex-wrap gap-2">
                    {orientations.map(({ id, name }): React.ReactNode => {
                      return (
                        <button
                          className={`border bg-bg text-xs cursor-pointer flex items-center justify-center px-4 py-3 rounded-md grow hover:bg-black hover:text-white shadow-sm border-2 ${
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
            ),
          },
        ]}
      />
    </>
  );
};
