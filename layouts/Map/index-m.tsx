import { useEffect } from "react";
import Image from "next/image";
import React, { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";

// settings
import { mapColors } from "@/layouts/LayoutSettings/mapColors";

import _ from "lodash";

// stores
import { useDispatch } from "react-redux";
import { handleSaveCustomCoordinatesForMap } from "@/redux/layout";
import { useTypedSelector, AppDispatch } from "@/redux/store";

// apis
import { api } from "@/axios";

declare global {
  interface Window {
    CustomMap: any;
    mapUpdate: any;
  }
}

interface MapContainerProps {
  render?: boolean;
}

function formatBounds(bounds) {
  const { _ne, _sw } = bounds;
  return [
    [_ne.lng, _ne.lat],
    [_sw.lng, _sw.lat],
  ];
}

export const MapContainer = ({ render = false }: MapContainerProps) => {
  const [map, setMap] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const [viewport, setViewport] = useState({});
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout?.layout.selectedAttributes
  );
  const currentPosterLocation: any = useTypedSelector(
    ({ layout }) => layout.layout.locations
  );
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  const [style, setStyle] = useState(
    "mapbox://styles/luxmapdev/clqr3uz7w00rj01r5d4g40b2x"
  );
  const [src, setSrc] = useState("");

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
    console.log("INIT", currentPosterLocation);

    if (currentPosterLocation?.customCoordinates?.bounds) {
      return map?.fitBounds(currentPosterLocation.customCoordinates.bounds, {
        animate: false,
      });
    }

    if (currentPosterLocation.bbox && currentPosterLocation.bbox.length) {
      return map.fitBounds(currentPosterLocation.bbox, {
        animate: false,
        padding: 20,
      });
    }

    // if (currentPosterLocation?.center && currentPosterLocation?.center.length) {
    //   setViewport(prev => ({
    //     ...prev,
    //     latitude: currentPosterLocation?.center[1],
    //     longitude: currentPosterLocation?.center[0],
    //   }));
    // }
  };

  const onLoadEvent = (map: any) => {
    setMap(map.target);
    window.CustomMap = map.target;
    map.target.fitBounds(currentPosterLocation.customCoordinates.bounds);

    // setTimeout(() => {
    //   map?.target.fitBounds(currentPosterLocation.customCoordinates.bounds, {
    //     animate: false,
    //   });
    // }, 500);
    // window.mapUpdate = vals => {
    //   setViewport(prev => ({ ...prev, ...vals }));
    // };
    // const bounds = map.target.getBounds();

    // setTimeout(() => {
    //   const format = formatBounds({
    //     _sw: {
    //       lng: -86.71315229339228,
    //       lat: 21.66306956268042,
    //     },
    //     _ne: {
    //       lng: -77.46226917227729,
    //       lat: 33.468689825418096,
    //     },
    //   });

    //   map.target.fitBounds(format);
    // }, 1000);

    // const centerCoordinates = [37.7577, -122.4376];
    // const defaultZoom = 8;

    // setViewport(prev => ({
    //   ...prev,
    //   zoom: render ? 11.34 : defaultZoom,
    //   latitude: centerCoordinates[0],
    //   longitude: centerCoordinates[1],
    // }));

    // bounds: [
    //   -88940430.88092162, 4197585.615743603, -88160216.46194203,
    //   5313936.101152484,
    // ],
    // center: [-88550323.67143182, 4755760.858448043],
    // resolution: 946.8621589557947,
    // rotation: 0,
    // zoom: 3,
    // map.target.fitBounds(boundsArray, {
    //   animate: false,
    // });
    // map.target.setZoom(8);

    if (render) {
      map.target.scrollZoom.disable();
      // Отключение зумирования колесом мыши
      map.target.dragPan.disable();
      // Отключение зумирования при двойном клике
      map.target.doubleClickZoom.disable();
      // Отключение пинч-зума на сенсорных устройствах
      map.target.touchZoomRotate.disable();
    }

    // setTimeout(() => {
    //   if (render) {
    //     console.log("SUCCESS");

    //     const v = map.target.getCanvas().toDataURL("image/png");

    //     console.log("v", v);

    //     setSrc(v);

    //     const imgElement = document.querySelector(".blob-img");

    //     if (imgElement) {
    //       imgElement.style.backgroundImage = `url(${v})`;
    //       imgElement.style.backgroundSize = "cover";
    //     }
    //   }
    // }, 6000);

  };

  const onIdle = map => {
    console.log("ONIDLE", map);
    // map.target.fitBounds(currentPosterLocation.customCoordinates.bounds);
    // if (map.target._fullyLoaded) {
    //   initBounds();
    // }

    // map.target?.resize();
    // if (render) {
    // const dataURL = map.target.getCanvas().toDataURL("image/png");
    // const dataURL = map.target.getCanvas().toBlob(async function (blob) {
    //   // const formData = new FormData();
    //   // formData.append("image", blob);
    //   console.log("blob", blob);
    //   api.post("/save-image", blob).then(data => {
    //     console.log("DATA", data);
    //   });
    // });
    // const imgElement = document.querySelector(".blob-img");
    // if (imgElement) {
    //   imgElement.style.backgroundImage = `url(${v})`;
    //   imgElement.style.backgroundSize = "cover";
    // }
    // }

    // const boundsArray = [
    //   -15.034326881007019, 18.963489408100045, 26.40454065734326,
    //   61.790396912980526,
    // ];

    // setViewport(prev => ({
    //   ...prev,
    //   bounds: boundsArray,
    // }));

    // console.log("IDLE");

    // if (render) {
    //   initBounds();
    //   const v = map.target.getCanvas().toDataURL("image/png");
    //   setSrc(v);
    //   const imgElement = document.querySelector(".blob-img");
    //   if (imgElement) {
    //     imgElement.style.backgroundImage = `url(${v})`;
    //     imgElement.style.backgroundSize = "cover";
    //   }
    // }
  };

  const onZoomEnd = ({ target, viewState }: any) => {
    const bounds = formatBounds(target.getBounds());

    setViewport({
      ...viewport,
      ...viewState,
      bounds: bounds,
    });

    dispatch(
      handleSaveCustomCoordinatesForMap({
        ...viewport,
        ...viewState,
        bounds: bounds,
      })
    );
  };

  const onDragEnd = ({ target, viewState }: any) => {
    const bounds = formatBounds(target.getBounds());
    setViewport({
      ...viewport,
      ...viewState,
      bounds: bounds,
    });

    dispatch(
      handleSaveCustomCoordinatesForMap({
        ...viewport,
        ...viewState,
        bounds: bounds,
      })
    );
  };

  // useEffect(() => {
  //   if (map) {
  //     initBounds();
  //   }
  // }, [viewport, map]);

  // useEffect(() => {
  //   if (map) {
  //     initBounds();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [posterAttributes?.orientation?.name, posterAttributes?.size?.name, map]);

  // useEffect(() => {
  //   if (map) {
  //     dispatch(handleSaveCustomCoordinatesForMap({}));
  //     initBounds();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPosterLocation.bbox, currentPosterLocation.center]);

  // useEffect(() => {
  //   dispatch(handleSaveCustomCoordinatesForMap(viewport));
  // }, [viewport]);

  // useEffect(() => {
  //   if (map) {
  //     initBounds();
  //   }
  // }, [currentPosterLocation, map]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* {render && src && <img src={src} alt="" className="blob-img" />} */}
      {/* {render && src && (
        // <Image
        //   src={src}
        //   alt="Mountains"
        //   blurDataURL={src}
        //   quality={100}
        //   priority
        //   fill
        //   sizes="100vw"
        //   style={{
        //     objectFit: "cover",
        //     zIndex: 1,
        //   }}
        //   className="blob-img"
        // />
        // <Image
        //   src={src}
        //   alt="Image Alt Text"
        //   priority
        //   la
        //   style={{
        //     display: "block",
        //     width: "100%",
        //     height: "100%",
        //     position: "absolute",
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     zIndex: 1,
        //   }}
        // />
      )} */}

      <Map
        {...viewport}
        mapboxAccessToken="pk.eyJ1IjoibHV4bWFwZGV2IiwiYSI6ImNscHB1dGg1ZjBuenYycGwzam5zbTFqaWoifQ.DI3Gp0mNKTdlYABEkPyXpQ"
        // onMove={({ target, viewState }: any) => {
        //   const bounds = formatBounds(target.getBounds());

        //   return setViewport(prev => ({
        //     ...prev,
        //     ...viewState,
        //     bounds: bounds,
        //   }));
        // }}
        // onDragEnd={onDragEnd}
        // onZoomEnd={onZoomEnd}
        onLoad={onLoadEvent}
        onIdle={onIdle}
        mapStyle={"http://localhost:8080/styles/blueprint/style.json"}
      ></Map>

      {/* <Map
          {...viewport}
          mapboxAccessToken="pk.eyJ1IjoibHV4bWFwZGV2IiwiYSI6ImNscHB1dGg1ZjBuenYycGwzam5zbTFqaWoifQ.DI3Gp0mNKTdlYABEkPyXpQ"
          onMove={({ target, viewState }: any) => {
            const bounds = formatBounds(target.getBounds());
            // const boundsArray = [
            //   bounds._sw.lng,
            //   bounds._sw.lat,
            //   bounds._ne.lng,
            //   bounds._ne.lat,
            // ];
            // console.log("boundsArray", boundsArray);
            // console.log("boundsArray", boundsArray);
            return setViewport(prev => ({
              ...prev,
              ...viewState,
              bounds: bounds,
            }));
          }}
          onDragEnd={onDragEnd}
          onZoomEnd={onZoomEnd}
          onLoad={onLoadEvent}
          onIdle={onIdle}
          // mapStyle={"http://localhost:8080/styles/blueprint/style.json"}
        >
          <Source
            id="raster-tiles-source"
            type="raster"
            tiles={[
              `http://localhost:8080/styles/blueprint/{z}/{x}/{y}@2x.png`,
            ]}
            // tiles={[
            //   `https://tileserver.mapiful.com/mono/{z}/{x}/{y}${
            //     render ? "@10x" : "@2x"
            //   }.png`,
            // ]}
            // tileSize={render ? 2560 : 216}
            // tiles={[
            //   `https://api.mapbox.com/styles/v1/luxmapdev/clppv0up8012v01o0h0gmaznv/tiles/512/{z}/{x}/{y}${
            //     render ? "@2x" : "@2x"
            //   }/?access_token=sk.eyJ1IjoibHV4bWFwZGV2IiwiYSI6ImNscHB2cTBqaTEzYXQya29iZ2pxNHFpMnAifQ.n79a29D6mU1tLj2EQM1L6Q`,
            // ]}
          >
            <Layer
              id="raster-tiles-layer"
              type="raster"
              source="raster-tiles-source"
            />
          </Source>
        </Map> */}
    </div>
  );
};
