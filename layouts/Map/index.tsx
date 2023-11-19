import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

import React, { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";

// settings
import { mapColors } from "@/layouts/LayoutSettings/mapColors";

// stores
import { useDispatch } from "react-redux";
import { handleSaveCustomCoordinatesForMap } from "@/redux/layout";
import { useTypedSelector, AppDispatch } from "@/redux/store";

declare global {
  interface Window {
    CustomMap: any;
  }
}

export const MapContainer = () => {
  const [map, setMap] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout?.layout.selectedAttributes
  );
  const currentPosterLocation: any = useTypedSelector(
    ({ layout }) => layout.layout.currentLocation
  );
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  const [style, setStyle] = useState("");

  useEffect(() => {
    console.log("CHANGE");

    if (posterStyles) {
      const currentMapStyle = mapColors.find(
        style => style.id === posterStyles.color
      );

      if (currentMapStyle) {
        setStyle(currentMapStyle?.url);
      }
    }
  }, [posterStyles?.color]);

  const initBounds = () => {
    console.log(
      "currentPosterLocation.customCoordinates",
      currentPosterLocation.customCoordinates
    );

    if (
      currentPosterLocation.customCoordinates &&
      JSON.stringify(currentPosterLocation.customCoordinates) !== "{}"
    ) {
      return setViewport(currentPosterLocation.customCoordinates);
    }

    if (currentPosterLocation.bbox && currentPosterLocation.bbox.length) {
      map.fitBounds(currentPosterLocation.bbox, {
        animate: false,
        padding: 20,
      });
    } else {
      map.setCenter(currentPosterLocation.center);
      // map.fitBounds(currentPosterLocation.center, {
      //   animate: false,
      //   padding: 20,
      // });
      // map.flyTo({
      //   center: currentPosterLocation.center,
      // });
    }
  };

  useEffect(() => {
    if (map) {
      initBounds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const onLoadEvent = (map: any) => {
    setMap(map.target);
    window.CustomMap = map.target;
    map.target?.resize();
  };

  const onDragEnd = ({ viewState }: any) => {
    dispatch(handleSaveCustomCoordinatesForMap(viewState));
  };

  useEffect(() => {
    if (map) {
      initBounds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posterAttributes?.orientation?.name, posterAttributes?.size?.name]);

  useEffect(() => {
    if (map) {
      dispatch(handleSaveCustomCoordinatesForMap({}));
      initBounds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosterLocation.bbox, currentPosterLocation.center]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        {...viewport}
        mapboxAccessToken="pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbnltZDZrbjBzMnIyanFrOXpqbmR4Y20ifQ.rIHgECYOkgtU3yugLFHcLQ"
        onMove={evt => setViewport(evt.viewState)}
        onDragEnd={onDragEnd}
        onLoad={onLoadEvent}
      >
        <Source
          id="raster-tiles-source"
          type="raster"
          tiles={[
            `${style}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbnltZDZrbjBzMnIyanFrOXpqbmR4Y20ifQ.rIHgECYOkgtU3yugLFHcLQ`,
          ]}
        >
          <Layer
            id="raster-tiles-layer"
            type="raster"
            source="raster-tiles-source"
          />
        </Source>
      </Map>
    </div>
    //   id="map-container"
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //   }}
    // ></div>
  );
};
