import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import React, { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { MapRef } from "react-map-gl";

import { useTypedSelector, AppDispatch } from "@/redux/store";

export const MapContainer = () => {
  const mapRef = useRef<MapRef>(null);
  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Широта вашей начальной точки
    longitude: -122.4194, // Долгота вашей начальной точки
    zoom: 10,
  });
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout?.layout.selectedAttributes
  );
  const currentPosterLocation = useTypedSelector(
    ({ layout }) => layout.layout.currentLocation
  );

  const initBounds = () => {
    if (
      mapRef.current &&
      JSON.stringify(currentPosterLocation?.data) !== "{}"
    ) {
      mapRef.current.resize();

      if (currentPosterLocation.bbox && currentPosterLocation.bbox.length) {
        mapRef.current.fitBounds(
          [
            currentPosterLocation.bbox[0],
            currentPosterLocation.bbox[1],
            currentPosterLocation.bbox[2],
            currentPosterLocation.bbox[3],
          ],
          { padding: 40, animate: false }
        );
      }
      // else {
      //   mapRef.current.jumpTo({
      //     center: currentPosterLocation.center,
      //     animated,
      //   });
      // }
    }
  };

  // useEffect(() => {
  //   mapboxgl.accessToken =
  //     "pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbW5kMDhocTB2cnIycm56ZjFkcXBhc3YifQ.LNW37jwQ_L-HLXtmDdeOVg";

  //   const map = new mapboxgl.Map({
  //     container: "map-container",
  //     style: "mapbox://styles/placeflex/cln7pj29z03h301r74qs543st/draft",
  //     center: [31.222285269128662, 45.56524124624892],
  //     zoom: 4.8,
  //     minZoom: 4,
  //   });

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

  //   map.on("moveend", () => {
  //     const bounds = map.getBounds();
  //     const center = map.getCenter();
  //     const zoom = map.getZoom();

  //     const boundsSave = {
  //       bounds,
  //       center,
  //       zoom,
  //     };
  //   });

  //   mapRef.current = map;

  //   return () => mapRef.current.remove();
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     initBounds();
  //   }, 100);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.resize();
    }, 0);
  }, [posterAttributes?.orientation?.name, posterAttributes?.size?.name]);

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("currentPosterLocation", currentPosterLocation);

    //   mapRef.current?.flyTo({
    //     center: currentPosterLocation?.center,
    //   });
    // }, 0);
    setTimeout(() => {
      initBounds();
    }, 0);
  }, [currentPosterLocation]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        initialViewState={viewport}
        mapboxAccessToken="pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbnltZDZrbjBzMnIyanFrOXpqbmR4Y20ifQ.rIHgECYOkgtU3yugLFHcLQ"
        ref={mapRef}
      >
        <Source
          id="raster-tiles-source"
          type="raster"
          tiles={[
            "https://api.mapbox.com/styles/v1/placeflex/cln7pj29z03h301r74qs543st/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbnltZDZrbjBzMnIyanFrOXpqbmR4Y20ifQ.rIHgECYOkgtU3yugLFHcLQ",
          ]}
          tileSize={256}
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
