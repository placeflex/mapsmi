import { useEffect, useMemo } from "react";
import { isEmpty } from "lodash";

import React, { useState } from "react";
import { Map, Feature, Overlay } from "ol";
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
import { mapColors } from "@/layouts/wallartSettings/mapColors";
import { mapMarkers } from "@/layouts/wallartSettings/mapMarkers";
import { ROUTE_TYPES } from "@/layouts/wallartAttributes";

// constants
import {
  RENDER_SCALE_RENDER_PAGE,
  RENDER_SCALE_EDITOR_PAGE,
} from "@/layouts/wallartSettings/defaultWallartSettings";
import { basisMarkerSize } from "@/layouts/wallartSettings/mapMarkers";

// stores
import { useDispatch } from "react-redux";
import {
  handleSaveCustomCoordinatesForMap,
  renderMarkersController,
  renderLabelsController,
  handleChangeLables,
} from "@/stores/layout";
import { useTypedSelector, AppDispatch } from "@/stores/store";

// helpers
import { toast } from "react-toastify";

import markerIcon from "@/public/test_marker.png";
import markerIconSmall from "@/public/test_marker_small.png";
import Dot from "@/public/dot.svg";
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
  return [bounds[0], bounds[1], bounds[2], bounds[3]];
}

const MIN_ZOOM = 1;

export const MapContainer = ({ render = false }: MapContainerProps) => {
  const [map, setMap] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const [geometries, setGeo]: any = useState([]);

  const {
    locations,
    customCoordinates,
    connectLocations,
    renderMarkers,
    renderLabels,
    elementsColor,
    labelsTextColor,
    routeType,
    labelsStyle,
    poster,
  } = useTypedSelector(({ layout }) => layout.layout);

  const maskEnabled = poster?.styles?.isMask;

  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );
  const locationsIdsForReorder = locations?.map(item => item.place_id);
  const locationsMarkersIds = locations?.map(item => item.markerId);
  const locationsLabelsPosition = locations?.map(item => item.labelPosition);

  const [viewState, setViewState] = useState({
    center: [3398883.5667333677, 6516260.28551439],
    zoom: 10,
  });

  const handleAddAirplaneRoute = () => {
    handleRemoveRouteLine();

    const layerToRemove = map
      .getLayers()
      .getArray()
      .find(layer => layer.get("id") === "routeLine");

    if (layerToRemove) {
      map.removeLayer(layerToRemove);
    }

    const locationsDropdown = locations
      .map(el => {
        return el.geometry.coordinates;
      })
      .map((point, index, source) => {
        const offset = 0.0015;

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
            ? (RENDER_SCALE_RENDER_PAGE / 3) * RENDER_SCALE_RENDER_PAGE
            : RENDER_SCALE_RENDER_PAGE / 3,
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

    if (renderMarkers) {
      handleRenderMarkers();
    }
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

    locations.forEach(coordinate => {
      const point = new Point(fromLonLat(coordinate.geometry.coordinates));

      const svgData = mapMarkers(render, elementsColor)[coordinate.markerId]
        .icon;

      const style = new Style({
        image: new Icon({
          offset: [0, 0],
          src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            svgData
          )}`,
        }),
      });

      const marker = new Feature({
        geometry: point,
      });

      if (renderLabels) {
        const labelPosition = coordinate.labelPosition;
        const fontSize = render ? 12 * RENDER_SCALE_RENDER_PAGE : 12;
        const fontSettings = `${fontSize}px Courier,Helvetica,Arial,sans-serif`;
        const basisPadding = render ? 5 * RENDER_SCALE_RENDER_PAGE : 5;
        const paddings = [
          basisPadding,
          render ? basisPadding * 1.35 : basisPadding,
          basisPadding,
          basisPadding * 1.5,
        ];
        let offsetY;
        let offsetX;
        let textAlign;
        const LABEL_BORDER_WIDTH = render ? 1 * RENDER_SCALE_RENDER_PAGE : 1;
        const markerSize = render
          ? basisMarkerSize * RENDER_SCALE_RENDER_PAGE
          : basisMarkerSize;

        const tempElement = document.createElement("span");
        tempElement.style.font = fontSettings;
        tempElement.style.padding = `${paddings[0]}px ${paddings[1]}px ${paddings[2]}px ${paddings[3]}px`;

        tempElement.textContent = coordinate.value.split(",").length
          ? coordinate.value.split(",")[0]
          : coordinate.value;

        document.body.appendChild(tempElement);
        const labelWidth = tempElement.offsetWidth;
        const labelHeight = tempElement.offsetHeight;
        document.body.removeChild(tempElement);

        switch (labelPosition) {
          case "top":
            offsetY = -markerSize - basisPadding;
            textAlign = "center";
            break;
          case "left":
            offsetX = -markerSize;
            offsetY = 0;
            textAlign = "end";
            break;
          case "right":
            offsetX = markerSize;
            offsetY = 0;
            textAlign = "start";
            break;
          case "bottom":
            offsetX = 0;
            offsetY = +markerSize + basisPadding;
            textAlign = "center";
            break;
        }

        const labelLocalStyle =
          labelsStyle == "fill"
            ? {
                backgroundFill: new Fill({
                  color: elementsColor,
                }),
              }
            : {
                backgroundFill: new Fill({
                  color: "transparent",
                }),
                backgroundStroke: new Stroke({
                  color: elementsColor,
                  width: LABEL_BORDER_WIDTH,
                }),
              };

        const label = new Text({
          text: coordinate.value.split(",").length
            ? coordinate.value.split(",")[0]
            : coordinate.value,
          offsetY: offsetY,
          offsetX: offsetX,
          font: fontSettings,
          fill: new Fill({
            color: labelsTextColor,
          }),
          ...labelLocalStyle,
          padding: paddings,
          scale: 1.2,
          placement: "point",
          textAlign: textAlign, // Center text horizontally
          textBaseline: "middle", // Center text vertically
        });

        style.setText(label);
      }

      marker.setStyle(style);
      vectorSource.addFeature(marker);
    });

    dispatch(renderMarkersController(true));
  };

  const alignMapForOneLocation = () => {
    const center = transformExtent(
      locations[0]?.bbox ?? [0, 0, 0, 0],
      "EPSG:4326",
      "EPSG:3857"
    );

    if (center) {
      map.getView().fit(center, map.getSize());
    }
  };

  const alignMapForAllMarkers = () => {
    const vectorSource = new VectorSource();

    locations.forEach(coordinate => {
      const point = new Point(fromLonLat(coordinate.center));

      const marker = new Feature({
        geometry: point,
      });

      vectorSource.addFeature(marker);

      const extent = vectorSource.getExtent();

      map.getView().fit(extent, { padding: [100, 100, 100, 100] });
    });
  };

  const handleRemoveMarkers = () => {
    const layerToRemove = map
      .getLayers()
      .getArray()
      .find(layer => layer.get("id") === "markersLayer");

    if (layerToRemove) {
      map.removeLayer(layerToRemove);
    }

    // dispatch(renderMarkersController(false));
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

  const handleGetWalkingOrDrivingRoutes = async locations => {
    const coordinates = locations.reduce(
      (accString, location) => `${accString}${location.lng},${location.lat};`,
      ""
    );
    const coordinatesFetchValues = coordinates.slice(0, coordinates.length - 1);

    var url =
      await `https://api.mapbox.com/directions/v5/mapbox/${ROUTE_TYPES[routeType].name}/${coordinatesFetchValues}?steps=false&geometries=geojson&overview=full&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        if (
          data.code == "InvalidInput" ||
          data.message == "Route exceeds maximum distance limitation"
        ) {
          return toast.warning(data.message);
        }

        const coordinates = data.routes[0].geometry.coordinates;
        const lineString = new LineString(coordinates.map(s => fromLonLat(s)));
        const distance = data.routes.reduce(
          (acc, route) => acc + route.distance,
          0
        );

        const formattedDistance = (distance / 1000).toLocaleString("ru-RU", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });

        const distanceTitle =
          distance <= 1000
            ? `${distance.toFixed(0)} Meters`
            : `${formattedDistance} km`;

        const lineFeature = new Feature({
          geometry: lineString,
        });

        lineFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: elementsColor,
              width: render
                ? (RENDER_SCALE_RENDER_PAGE / 3) * RENDER_SCALE_RENDER_PAGE
                : RENDER_SCALE_RENDER_PAGE / 3,
              lineDash: render
                ? [
                    RENDER_SCALE_RENDER_PAGE * RENDER_SCALE_RENDER_PAGE,
                    RENDER_SCALE_RENDER_PAGE * RENDER_SCALE_RENDER_PAGE,
                  ]
                : [RENDER_SCALE_RENDER_PAGE, RENDER_SCALE_RENDER_PAGE],
            }),
          })
        );

        setGeo(prevState => [...prevState, lineFeature]);

        dispatch(
          handleChangeLables({
            label: "tagline",
            value: distanceTitle,
          })
        );
      })
      .catch(err => {
        console.log("err,", err);
      });
  };

  const handleRemoveCustomLineForWalkingOrDriving = () => {
    setGeo([]);

    const layerToRemove = map
      .getLayers()
      .getArray()
      .find(layer => layer.get("id") === "routecustomLine");

    if (layerToRemove) {
      map.removeLayer(layerToRemove);
    }
  };

  useEffect(() => {
    if (map && renderMarkers && locationsMarkersIds.length > 0) {
      handleRemoveMarkers();
      handleRenderMarkers();
    }
  }, [
    JSON.stringify(locationsMarkersIds),
    JSON.stringify(locationsLabelsPosition),
    labelsStyle,
    map,
  ]);

  useEffect(() => {
    if (geometries.length && map) {
      const layerToRemove = map
        .getLayers()
        .getArray()
        .find(layer => layer.get("id") === "routecustomLine");

      if (layerToRemove) {
        map.removeLayer(layerToRemove);
      }

      var vectorSource = new VectorSource({
        features: geometries,
      });

      var vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      vectorLayer.set("id", "routecustomLine");

      map.addLayer(vectorLayer);

      if (renderMarkers) {
        handleRenderMarkers();
      }

      // handleRenderMarkers();
    }
  }, [geometries, map]);

  // FOR CHANGE COLORS OF MARKERS AND LABELS
  useEffect(() => {
    if (map) {
      if (
        ROUTE_TYPES[routeType].name !== "walking" &&
        ROUTE_TYPES[routeType].name !== "driving"
      ) {
        if (connectLocations) {
          handleRemoveRouteLine();
          handleAddAirplaneRoute();
        }
      } else {
        if (connectLocations) {
          setGeo(prev => {
            return prev.map((item: any) => {
              item.setStyle(
                new Style({
                  stroke: new Stroke({
                    color: elementsColor,
                    width: render
                      ? (RENDER_SCALE_RENDER_PAGE / 3) *
                        RENDER_SCALE_RENDER_PAGE
                      : RENDER_SCALE_RENDER_PAGE / 3,
                    lineDash: render
                      ? [
                          RENDER_SCALE_RENDER_PAGE * RENDER_SCALE_RENDER_PAGE,
                          RENDER_SCALE_RENDER_PAGE * RENDER_SCALE_RENDER_PAGE,
                        ]
                      : [RENDER_SCALE_RENDER_PAGE, RENDER_SCALE_RENDER_PAGE],
                  }),
                })
              );

              return item;
            });
          });
        }

        if (renderMarkers) {
          setTimeout(() => {
            handleRenderMarkers();
          }, 200);

          return;
        }
      }

      if (renderMarkers) {
        handleRenderMarkers();
      }
    }
  }, [elementsColor, map, labelsTextColor]);

  useEffect(() => {
    if (map) {
      if (connectLocations) {
        if (
          ROUTE_TYPES[routeType].name == "walking" ||
          ROUTE_TYPES[routeType].name == "driving"
        ) {
          handleRemoveCustomLineForWalkingOrDriving();
          handleRemoveRouteLine();
          handleGetWalkingOrDrivingRoutes(locations);
        } else {
          handleRemoveCustomLineForWalkingOrDriving();
          handleRemoveRouteLine();
          handleAddAirplaneRoute();
        }
      } else {
        handleRemoveRouteLine();
        handleRemoveCustomLineForWalkingOrDriving();
      }
    }
  }, [
    routeType,
    map,
    connectLocations,
    JSON.stringify(locationsIdsForReorder),
  ]);

  // FOR CENTER MAP AFTER UPDATE LOCATIONS LENGTH
  useEffect(() => {
    if (map) {
      // getRoute(locations[0], locations[1]);
      // TODO align and clear custom coordinates

      if (locations.length == 1 && isEmpty(customCoordinates)) {
        handleRemoveCustomLineForWalkingOrDriving();
        alignMapForOneLocation();
      }

      // TODO align and clear custom coordinates
      if (locations.length >= 2 && isEmpty(customCoordinates)) {
        alignMapForAllMarkers();
      }
    }
  }, [map, locations.length]);

  // RENDER MARKERS OR ROUTE LINE
  useEffect(() => {
    if (map) {
      if (renderLabels || renderMarkers) {
        handleRenderMarkers();
      }

      if (!renderMarkers) {
        handleRemoveMarkers();
      }

      if (locations.length == 0) {
        handleRemoveRouteLine();
        // handleRemoveMarkers();
      }
    }
  }, [map, renderMarkers, locations.length, connectLocations, renderLabels]);

  // INIT MAP
  useEffect(() => {
    console.log("customCoordinates", customCoordinates);

    let savedBounds;
    let newView;

    if (customCoordinates && customCoordinates?.bounds?.length) {
      let savedBounds = transformExtent(
        [...customCoordinates.bounds],
        "EPSG:4326",
        "EPSG:3857"
      );

      const renderPosition = render ? { extent: savedBounds } : {};

      newView = new View({
        projection: "EPSG:3857",
        center: customCoordinates?.center,
        zoom: customCoordinates?.zoom,
        rotation: customCoordinates?.rotation,
        minZoom: MIN_ZOOM,
        ...renderPosition,
      });
    }

    const view = !isEmpty(customCoordinates)
      ? newView
      : new View({
          ...viewState,
          minZoom: MIN_ZOOM,
        });

    const tileSize = render ? 200 * 10 : 200;
    const scale = "@9x";

    const tileGrid = createXYZ({
      tileSize: tileSize,
    });

    const laptop = process.env.NEXT_PUBLC_BASE_TILESERVER;

    const source = render
      ? {
          url: `${laptop}/styles/${
            mapColors[posterStyles.color].name
          }/{z}/{x}/{y}${scale}.png`,
        }
      : {
          url: `${laptop}/styles/${
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

  return maskEnabled ? (
    <div className="w-full h-full overlay-wrapper relative">
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  ) : (
    <div id="map" style={{ width: "100%", height: "100%" }}></div>
  );
};
