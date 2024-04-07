import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat, toLonLat, transformExtent } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import Modify from "ol/interaction/Modify";

import { debounce } from "lodash";
import axios from "axios";
const debouncedApply = debounce(callback => callback(), 1500);

import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import {
  setLocations,
  setCurrentLocation,
  handleSaveCustomCoordinatesForMap,
  setCurrentLocationForSkyMap,
} from "@/redux/layout";

import { AutoComplete } from "@/components/AutoComplete";

import { api } from "@/axios";

import Pin from "@/public/pin.svg";
import { it } from "node:test";

function formatBounds(bounds) {
  const { _ne, _sw } = bounds;
  return [
    [bounds[0], bounds[1]],
    [bounds[2], bounds[3]],
  ];
}

export const SelectLocationOnMap = () => {
  //   const mapRef = useRef();
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState<any>(null);
  const [currentLocationName, setCurrentLocationName] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const locationsDropdown = useTypedSelector<any>(
    ({ layout }) => layout.layout.locationsDropdown
  );

  const locations = useTypedSelector<any>(
    ({ layout }) => layout.layout.locations
  );

  const fetchLocation = async locationName => {
    setCurrentLocationName(locationName);
    try {
      const response: [] = await api.post("/locations", {
        locationName: locationName,
      });

      const modifyLocations = response.map((opt: any) => {
        return {
          value: opt.description,
          label: opt.description,
          ...opt,
        };
      });

      dispatch(setLocations(modifyLocations));
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleInputChange = (locationName: any) => {
    // setLocation(locationName);

    if (locationName) {
      debouncedApply(() => fetchLocation(locationName));
    } else {
      dispatch(setLocations([]));
    }
  };

  const handleSelectLocation = async (location: any, opt: any) => {
    const response: any = await api.get(`/locations?placeId=${opt.place_id}`);

    setLocation(response);
    // if (productId == 2) {
    //   dispatch(
    //     setCurrentLocation({
    //       ...opt,
    //       ...response,
    //       markerId: 0,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     setCurrentLocationForSkyMap({
    //       ...opt,
    //       ...response,
    //     })
    //   );
    // }

    // handleUpdateLabels(response.description);

    // if (productId == 2) {
    //   dispatch(handleSaveCustomCoordinatesForMap({}));
    // }
  };

  useEffect(() => {
    const map = new Map({
      target: "maponside",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: "EPSG:3857",
      }),
    });

    map.once("rendercomplete", function (event) {
      setMap(map);
      console.log("RENDER COMPLETE SECOND MAP");
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (location && map) {
      const center = transformExtent(
        location?.bbox ?? [0, 0, 0, 0],
        "EPSG:4326",
        "EPSG:3857"
      );

      if (center) {
        map.getView().fit(center, map.getSize());
      }
    }
  }, [location, map]);

  const getCenter = async () => {
    var extent = map.getView().calculateExtent(map.getSize());
    var bounds = formatBounds(
      transformExtent(extent, "EPSG:3857", "EPSG:4326")
    );

    console.log("bounds", bounds);

    const center = map.getView().getCenter();
    const centerLonLat = toLonLat(center);

    console.log("centerLonLat", centerLonLat);

    // lng = 30 , centerLonLat[0]

    const response: [] = await api.get(
      `/location-details?location=${centerLonLat[1]},${centerLonLat[0]}`
    );

    // const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/details/json?location=${centerLonLat[1]},${centerLonLat[0]}&key=AIzaSyAKTvkEE0rTN3fmKqPejI3zVdEJWjeVgL4`
    // );

    // const isReady = locations.find(it => it.place_id === location.place_id);

    // setCurrentLocation({});
  };

  return (
    <div className="w-full">
      <AutoComplete
        options={locationsDropdown}
        placeholder="Search for a location, street or landmark"
        className="w-full"
        onChange={handleInputChange}
        onSelect={handleSelectLocation}
        label="Search for place"
      />

      <div className="relative">
        <div className="absolute z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] pointer-events-none">
          <Pin width={50} height={50} />
        </div>

        <div id="maponside" className="h-[80rem] w-full z-0"></div>
      </div>

      <button onClick={getCenter}>Сохранить локацию</button>
    </div>
  );
};
