import { useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import React, { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { MapRef } from "react-map-gl";

// stores
import { useDispatch } from "react-redux";
import { handleSaveCustomCoordinatesForMap } from "@/redux/layout";
import { useTypedSelector, AppDispatch } from "@/redux/store";

const DELEY_RENDER = 200;

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

  // useEffect(() => {
  //   // mapboxgl.accessToken =
  //   //   "pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbW5kMDhocTB2cnIycm56ZjFkcXBhc3YifQ.LNW37jwQ_L-HLXtmDdeOVg";

  //   // const map = new mapboxgl.Map({
  //   //   container: "map-container",
  //   //   style: "mapbox://styles/placeflex/cln7pj29z03h301r74qs543st/draft",
  //   //   center: [31.222285269128662, 45.56524124624892],
  //   //   zoom: 4.8,
  //   //   minZoom: 4,
  //   // });

  //   console.log("mapRef.current", mapRef.current);

  //   // if (mapRef.current) {
  //   mapRef?.current?.on("moveend", map => {
  //     const bounds = mapRef.current.getBounds();
  //     const center = mapRef.current.getCenter();
  //     const zoom = mapRef.current.getZoom();

  //     const boundsSave = {
  //       bounds,
  //       center,
  //       zoom,
  //     };

  //     console.log("CHANGE");

  //     // dispatch(handleSaveCustomCoordinatesForMap(boundsSave));
  //   });
  //   // }

  //   // if (localStorage.getItem("map-bounds")) {
  //   //   const { bounds, center, zoom } = JSON.parse(
  //   //     localStorage.getItem("map-bounds")
  //   //   );

  //   //   map.fitBounds([bounds._sw, bounds._ne], { padding: 20 });
  //   //   map.setZoom(zoom);
  //   //   map.flyTo({
  //   //     center: center,
  //   //   });
  //   // }
  // }, []);

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

    // else {
    //   mapRef.current.jumpTo({
    //     center: currentPosterLocation.center,
    //     animated,
    //   });
    // }
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
            "https://api.mapbox.com/styles/v1/placeflex/cln7pj29z03h301r74qs543st/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbnltZDZrbjBzMnIyanFrOXpqbmR4Y20ifQ.rIHgECYOkgtU3yugLFHcLQ",
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
