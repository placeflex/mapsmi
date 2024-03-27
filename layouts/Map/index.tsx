import { useEffect } from "react";
import { isEmpty } from "lodash";

import React, { useState } from "react";
import { Map, Feature } from "ol";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat, transformExtent } from "ol/proj";
import { Point, LineString } from "ol/geom";
import { Style, Icon, Stroke, Text, Fill } from "ol/style";
import { createXYZ } from "ol/tilegrid";
import * as turf from "@turf/turf";

// settings
import { mapColors } from "@/layouts/LayoutSettings/mapColors";

// constants
import {
  RENDER_SCALE_RENDER_PAGE,
  RENDER_SCALE_EDITOR_PAGE,
} from "@/constants/defaultLayoutSettings";

// stores
import { useDispatch } from "react-redux";
import { handleSaveCustomCoordinatesForMap } from "@/redux/layout";
import { useTypedSelector, AppDispatch } from "@/redux/store";

// styles
import "ol/ol.css";

declare global {
  interface Window {
    CustomMap: any;
    alignMapForAllMarkers: any;
    CustomMapIsReady: any;
  }
}

interface MapContainerProps {
  render?: boolean;
}

function formatBounds(bounds) {
  const { _ne, _sw } = bounds;
  return [
    [bounds[0], bounds[1]],
    [bounds[2], bounds[3]],
  ];
}

const MIN_ZOOM = 1;

export const MapContainer = ({ render = false }: MapContainerProps) => {
  const [map, setMap] = useState<any>();
  const dispatch: AppDispatch = useDispatch();

  const posterAttributes = useTypedSelector(
    ({ layout }) => layout?.layout.selectedAttributes
  );
  const currentPosterLocations: any = useTypedSelector(
    ({ layout }) => layout.layout.locations
  );

  const customCoordinates: any = useTypedSelector(
    ({ layout }) => layout.layout.customCoordinates
  );

  const connectLocations = useTypedSelector(
    ({ layout }) => layout.layout.connectLocations
  );

  const renderMarkers = useTypedSelector(
    ({ layout }) => layout.layout.renderMarkers
  );

  const renderLabels = useTypedSelector(
    ({ layout }) => layout.layout.renderLabels
  );

  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  const elementsColor = useTypedSelector(
    ({ layout }) => layout.layout?.elementsColor
  );

  const labelsTextColor = useTypedSelector(
    ({ layout }) => layout.layout?.labelsTextColor
  );

  const [viewState, setViewState] = useState({
    center: [0, 0],
    zoom: 2,
  });

  useEffect(() => {
    if (map) {
      handleAddRoute();
      handleRenderMarkers();
    }
  }, [elementsColor, map, labelsTextColor]);

  const handleAddRoute = () => {
    handleRemoveRouteLine();

    const layerToRemove = map
      .getLayers()
      .getArray()
      .find(layer => layer.get("id") === "routeLine");

    if (layerToRemove) {
      map.removeLayer(layerToRemove);
    }

    const locationsDropdown = currentPosterLocations
      .map(el => {
        return el.center;
      })
      .map((point, index, source) => {
        const offset = 0.05;

        if (index < source.length - 1) {
          let route = turf.toWgs84({
            type: "LineString",
            coordinates: [point, source[index + 1]],
          });

          let routeLength = turf.lineDistance(route, {
            units: "kilometers",
          });
          let midPoint = turf.midpoint(
            route.coordinates[0],
            route.coordinates[1]
          );
          let centerBearingBasis = turf.bearing(
            route.coordinates[0],
            route.coordinates[1]
          );
          let centerBearing = centerBearingBasis + 90;
          let center = turf.destination(midPoint, routeLength, centerBearing);

          let bearing1 = turf.bearing(center, route.coordinates[0]);
          let bearing2 = turf.bearing(center, route.coordinates[1]);
          let arc = turf.toMercator(
            turf.lineArc(
              center,
              turf.distance(center, route.coordinates[0]),
              bearing1,
              bearing2,
              {
                units: "kilometers",
                steps: 1024,
              }
            )
          );
          let arcLength = turf.lineDistance(arc, { units: "kilometers" });
          try {
            arc = turf.lineSliceAlong(arc, offset, arcLength - offset);
          } catch (err) {}
          return turf.bezierSpline(arc);
        }
      })
      .filter(item => item);

    const vectorSource = new VectorSource({
      features: locationsDropdown.map(location => {
        return new Feature({
          geometry: new LineString(
            location.geometry.coordinates.map(m => fromLonLat(m))
          ),
        });
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: elementsColor,
          width: render
            ? (RENDER_SCALE_RENDER_PAGE / 2) * RENDER_SCALE_RENDER_PAGE
            : RENDER_SCALE_RENDER_PAGE / 2,
          lineDash: render
            ? [
                RENDER_SCALE_RENDER_PAGE * RENDER_SCALE_RENDER_PAGE,
                RENDER_SCALE_RENDER_PAGE * RENDER_SCALE_RENDER_PAGE,
              ]
            : [RENDER_SCALE_RENDER_PAGE, RENDER_SCALE_RENDER_PAGE],
        }),
      }),
    });

    vectorLayer.set("id", "routeLine");

    map.addLayer(vectorLayer);
  };

  const handleRenderMarkers = () => {
    handleRemoveMarkers();

    const layerToRemove = map
      .getLayers()
      .getArray()
      .find(layer => layer.get("id") === "markersLayer");

    if (layerToRemove) {
      map.removeLayer(layerToRemove);
    }

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    vectorLayer.set("id", "markersLayer");

    map.addLayer(vectorLayer);

    currentPosterLocations.forEach(coordinate => {
      const point = new Point(fromLonLat(coordinate.center));

      const style = new Style({
        image: new Icon({
          offset: [0, 0],
          src:
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(
              `<svg fill="${elementsColor}" width="${
                render ? 50 * 10 : 50
              }px" height="${
                render ? 50 * 10 : 50
              }px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">  <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" /> </svg>`
            ),
        }),
      });

      const marker = new Feature({
        geometry: point,
      });

      if (renderLabels) {
        const size = render
          ? "150px bold Courier New,sans-serif"
          : "14px bold Courier New,sans-serif";
        const paddings = render ? [60, 60, 60, 90] : [7, 7, 7, 10];
        const offset = render ? -280 : -30;

        const label = new Text({
          text: coordinate.value.split(",").length
            ? coordinate.value.split(",")[0]
            : coordinate.value, // Текст метки
          offsetY: offset, // Смещение метки вверх относительно маркера
          font: size, // Шрифт и размер текста
          fill: new Fill({
            color: labelsTextColor, // Цвет текста
          }),
          backgroundFill: new Fill({
            color: elementsColor, // Цвет фона текста (белый с непрозрачностью 0.8)
          }),
          padding: paddings,
        });

        style.setText(label);
      }

      marker.setStyle(style);
      vectorSource.addFeature(marker);
    });
  };

  const alignMapForOneLocation = () => {
    const center = transformExtent(
      currentPosterLocations[0]?.bbox ?? [0, 0, 0, 0],
      "EPSG:4326",
      "EPSG:3857"
    );

    if (center) {
      map.getView().fit(center, map.getSize());
    }
  };

  const alignMapForAllMarkers = () => {
    // const layerToRemove = map
    //   .getLayers()
    //   .getArray()
    //   .find(layer => layer.get("id") === "movePositionLayer");

    // if (layerToRemove) {
    //   map.removeLayer(layerToRemove);
    // }

    const vectorSource = new VectorSource();
    // const vectorLayer = new VectorLayer({
    //   source: vectorSource,
    // });

    // vectorLayer.set("id", "movePositionLayer");

    // map.addLayer(vectorLayer);

    // setTimeout(() => {
    currentPosterLocations.forEach(coordinate => {
      const point = new Point(fromLonLat(coordinate.center));

      const marker = new Feature({
        geometry: point,
      });

      vectorSource.addFeature(marker);

      const extent = vectorSource.getExtent();

      map.getView().fit(extent, { padding: [100, 100, 100, 100] });
    });
    // }, 500);
  };

  const handleRemoveMarkers = () => {
    const layerToRemove = map
      .getLayers()
      .getArray()
      .find(layer => layer.get("id") === "markersLayer");

    if (layerToRemove) {
      map.removeLayer(layerToRemove);
    }
  };

  const handleRemoveRouteLine = () => {
    const layerToRemove = map
      .getLayers()
      .getArray()
      .find(layer => layer.get("id") === "routeLine");

    if (layerToRemove) {
      map.removeLayer(layerToRemove);
    }
  };

  useEffect(() => {
    if (map) {
      // TODO align and clear custom coordinates

      if (currentPosterLocations.length == 1 && isEmpty(customCoordinates)) {
        alignMapForOneLocation();
      }

      // TODO align and clear custom coordinates
      if (currentPosterLocations.length >= 2 && isEmpty(customCoordinates)) {
        alignMapForAllMarkers();
      }
    }
  }, [map, currentPosterLocations.length]);

  // useEffect(() => {
  //   if (map) {
  //     dispatch(handleSaveCustomCoordinatesForMap({}));

  //     if (currentPosterLocations.length == 1 && isEmpty(customCoordinates)) {
  //       alignMapForOneLocation();
  //     }

  //     if (currentPosterLocations.length >= 2 && isEmpty(customCoordinates)) {
  //       alignMapForAllMarkers();
  //     }
  //   }
  // }, [map, posterAttributes.size.id]);

  useEffect(() => {
    if (map) {
      if (connectLocations) {
        handleAddRoute();
      }

      if (renderLabels || renderMarkers) {
        handleRenderMarkers();
      }

      if (!renderMarkers) {
        handleRemoveMarkers();
      }

      if (!connectLocations) {
        handleRemoveRouteLine();
      }

      if (currentPosterLocations.length == 0) {
        handleRemoveRouteLine();
        handleRemoveMarkers();
      }
    }
  }, [
    map,
    renderMarkers,
    currentPosterLocations.length,
    connectLocations,
    renderLabels,
  ]);

  useEffect(() => {
    console.log("INIT");
    let savedBounds;
    let newView;

    if (customCoordinates && customCoordinates?.bounds?.length) {
      savedBounds = transformExtent(
        [...customCoordinates?.bounds[0], ...customCoordinates?.bounds[1]],
        "EPSG:4326",
        "EPSG:3857"
      );

      const renderPosition = render ? { extent: savedBounds } : {};

      newView = new View({
        projection: "EPSG:3857",
        center: customCoordinates?.center,
        zoom: customCoordinates?.zoom,
        minZoom: MIN_ZOOM,
        ...renderPosition,
      });
    }

    const view = !isEmpty(customCoordinates)
      ? newView
      : new View({
          ...viewState,
          zoom: MIN_ZOOM,
          minZoom: MIN_ZOOM,
        });

    const tileSize = render ? 200 * 10 : 200;
    const scale = "@9x";

    const tileGrid = createXYZ({
      tileSize: tileSize,
    });
    const source = render
      ? {
          url: `http://localhost:8080/styles/${
            mapColors[posterStyles.color].name
          }/{z}/{x}/{y}${scale}.png`,
        }
      : {
          url: `http://localhost:8080/styles/${
            mapColors[posterStyles.color].name
          }/{z}/{x}/{y}@2x.png`,
        };

    // {
    //   tileUrlFunction: function (coordinate) {
    //     const zoom = coordinate[0];
    //     const x = coordinate[1];
    //     const y = coordinate[2];

    //     return `http://localhost:5050/getTile/${zoom}/${x}/${y}`;

    //     // return `/api/tiles?zoom=${zoom}&x=${x}&y=${y}`;
    //   },
    // };

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            ...source,
            tileGrid: tileGrid,
            tilePixelRatio: 2,
          }),
        }),
      ],
      view: view,
      pixelRatio: render ? 1 : 2,
    });

    map.on("error", function (event) {
      console.error("Map error:", event);
    });

    map.once("rendercomplete", function (event) {
      setMap(map);
      window.CustomMap = map;
      window.CustomMapIsReady = true;

      console.log("RENDER COMPLETE");

      map.getView().on("change:resolution", event => {
        // Код, который выполнится при изменении масштаба (zoom)
        // const newViewState = view.getProperties();
        console.log("Map zoom!");
        const newViewState = view.getProperties();

        var extent = map.getView().calculateExtent(map.getSize());
        var bounds = formatBounds(
          transformExtent(extent, "EPSG:3857", "EPSG:4326")
        );

        setViewState(prev => ({
          ...prev,
          ...newViewState,
        }));

        dispatch(
          handleSaveCustomCoordinatesForMap({ ...newViewState, bounds: bounds })
        );
      });

      map.getView().on("change:center", event => {
        // Код, который выполнится при изменении центра карты (перетаскивание)
        console.log("Map перетаскивание!");
        const newViewState = view.getProperties();

        var extent = map.getView().calculateExtent(map.getSize());
        var bounds = formatBounds(
          transformExtent(extent, "EPSG:3857", "EPSG:4326")
        );

        setViewState(prev => ({
          ...prev,
          ...newViewState,
        }));

        dispatch(
          handleSaveCustomCoordinatesForMap({ ...newViewState, bounds: bounds })
        );
      });

      map.on("moveend", event => {
        const newViewState = view?.getProperties();
        const center = view?.getCenter();

        var extent = map.getView().calculateExtent(map.getSize());
        var bounds = formatBounds(
          transformExtent(extent, "EPSG:3857", "EPSG:4326")
        );

        setViewState(prev => ({
          ...prev,
          ...newViewState,
        }));

        dispatch(
          handleSaveCustomCoordinatesForMap({ ...newViewState, bounds: bounds })
        );
      });
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [posterStyles.color]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};
