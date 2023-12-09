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
    console.log("currentPosterLocation", currentPosterLocation);

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
    } else if (
      currentPosterLocation?.center &&
      currentPosterLocation?.center.length
    ) {
      setViewport(prev => ({
        ...prev,
        latitude: currentPosterLocation?.center[1],
        longitude: currentPosterLocation?.center[0],
      }));
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

  const onZoomEnd = ({ viewState }: any) => {
    dispatch(handleSaveCustomCoordinatesForMap(viewState));
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
        mapboxAccessToken="sk.eyJ1IjoibHV4bWFwZGV2IiwiYSI6ImNscHB2cTBqaTEzYXQya29iZ2pxNHFpMnAifQ.n79a29D6mU1tLj2EQM1L6Q"
        onMove={(evt: any) => setViewport(evt.viewState)}
        onDragEnd={onDragEnd}
        onZoomEnd={onZoomEnd}
        onLoad={onLoadEvent}
      >
        <Source
          id="raster-tiles-source"
          type="raster"
          tiles={[
            `${style}/tiles/512/{z}/{x}/{y}/?access_token=sk.eyJ1IjoibHV4bWFwZGV2IiwiYSI6ImNscHB2cTBqaTEzYXQya29iZ2pxNHFpMnAifQ.n79a29D6mU1tLj2EQM1L6Q`,
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
  );
};
