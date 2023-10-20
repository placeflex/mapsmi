import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { useTypedSelector, AppDispatch } from "@/redux/store";

export const MapContainer = () => {
  const mapRef = useRef<any>(null);
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout?.layout.selectedAttributes
  );
  const currentPosterLocation = useTypedSelector(
    ({ layout }) => layout.layout?.currentLocation
  );

  const initBounds = () => {
    mapRef.current.resize();
    if (mapRef.current && JSON.stringify(currentPosterLocation.data) !== "{}") {
      if (currentPosterLocation.bbox && currentPosterLocation.bbox.length) {
        mapRef.current.fitBounds(
          [
            currentPosterLocation.bbox[0],
            currentPosterLocation.bbox[1],
            currentPosterLocation.bbox[2],
            currentPosterLocation.bbox[3],
          ],
          { padding: 40 }
        );
      } else {
        mapRef.current.flyTo({
          center: currentPosterLocation.center,
        });
      }
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbW5kMDhocTB2cnIycm56ZjFkcXBhc3YifQ.LNW37jwQ_L-HLXtmDdeOVg";

    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/placeflex/cln7pj29z03h301r74qs543st/draft",
      center: [31.222285269128662, 45.56524124624892],
      zoom: 4.8,
      minZoom: 4,
    });

    // if (localStorage.getItem("map-bounds")) {
    //   const { bounds, center, zoom } = JSON.parse(
    //     localStorage.getItem("map-bounds")
    //   );

    //   map.fitBounds([bounds._sw, bounds._ne], { padding: 20 });
    //   map.setZoom(zoom);
    //   map.flyTo({
    //     center: center,
    //   });
    // }

    map.on("moveend", () => {
      const bounds = map.getBounds();
      const center = map.getCenter();
      const zoom = map.getZoom();

      const boundsSave = {
        bounds,
        center,
        zoom,
      };
    });

    mapRef.current = map;

    return () => mapRef.current.remove();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      initBounds();
    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      initBounds();
    }, 0);
  }, [posterAttributes?.orientation?.name, posterAttributes?.size?.name]);

  useEffect(() => {
    setTimeout(() => {
      initBounds();
    }, 0);
  }, [currentPosterLocation]);

  return (
    <div
      id="map-container"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};
