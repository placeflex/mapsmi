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
import { mapColors, mapMarkers } from "@/layouts/LayoutSettings/mapColors";
import { ROUTE_TYPES } from "@/layouts/LayoutAttributes";

// constants
import {
  RENDER_SCALE_RENDER_PAGE,
  RENDER_SCALE_EDITOR_PAGE,
} from "@/constants/defaultLayoutSettings";

// stores
import { useDispatch } from "react-redux";
import {
  handleSaveCustomCoordinatesForMap,
  renderMarkersController,
  renderLabelsController,
} from "@/redux/layout";
import { useTypedSelector, AppDispatch } from "@/redux/store";

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

  const [geometries, setGeo]: any = useState([]);

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

  const locationsMarkers = useTypedSelector(({ layout }) =>
    layout.layout?.locations?.map(item => item.markerId)
  );

  const routeTypeId = useTypedSelector(({ layout }) => layout.layout.routeType);

  const [viewState, setViewState] = useState({
    center: [0, 0],
    zoom: 2,
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

    const locationsDropdown = currentPosterLocations
      .map(el => {
        return el.center;
      })
      .map((point, index, source) => {
        const offset = 0.2;

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

    console.log("RENDER MARKERS");

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
        const size = render
          ? "150px Verdana,Courier,Helvetica,Arial,sans-serif"
          : "12px Verdana,Courier,Helvetica,Arial,sans-serif";
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

    dispatch(renderMarkersController(true));
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
    const vectorSource = new VectorSource();

    currentPosterLocations.forEach(coordinate => {
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
    for (let i = 0; i < locations.length - 1; i++) {
      let start = locations[i];
      let end = locations[i + 1];
      await handleGetWalkingOrDrivingRoute(start, end);
    }
  };

  const handleGetWalkingOrDrivingRoute = async (start, end) => {
    var url = `https://api.mapbox.com/directions/v5/mapbox/${ROUTE_TYPES[routeTypeId]}/${start.lng},${start.lat};${end.lng},${end.lat}?steps=true&geometries=geojson&overview=full&access_token=${process.env.MAPBOX_TOKEN}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        if (
          data.code == "InvalidInput" ||
          data.message == "Route exceeds maximum distance limitation"
        ) {
          return toast.warning(data.message);
        }

        var coordinates = data.routes[0].geometry.coordinates;

        var lineString = new LineString(coordinates.map(s => fromLonLat(s)));

        var lineFeature = new Feature({
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
    if (map && renderMarkers && locationsMarkers.length > 0) {
      handleRemoveMarkers();
      handleRenderMarkers();
    }
  }, [JSON.stringify(locationsMarkers), map]);

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
      console.log(" ROUTE_TYPES[routeTypeId]", ROUTE_TYPES[routeTypeId]);

      if (
        ROUTE_TYPES[routeTypeId] !== "walking" &&
        ROUTE_TYPES[routeTypeId] !== "driving"
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
          ROUTE_TYPES[routeTypeId] == "walking" ||
          ROUTE_TYPES[routeTypeId] == "driving"
        ) {
          handleRemoveCustomLineForWalkingOrDriving();
          handleRemoveRouteLine();
          handleGetWalkingOrDrivingRoutes(currentPosterLocations);
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
  }, [routeTypeId, map, connectLocations, currentPosterLocations.length]);

  // FOR CENTER MAP AFTER UPDATE LOCATIONS LENGTH
  useEffect(() => {
    if (map) {
      // getRoute(locations[0], locations[1]);
      // TODO align and clear custom coordinates

      if (currentPosterLocations.length == 1 && isEmpty(customCoordinates)) {
        handleRemoveCustomLineForWalkingOrDriving();
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

  // RENDER MARKERS OR ROUTE LINE
  useEffect(() => {
    if (map) {
      // if (connectLocations) {
      //   handleAddAirplaneRoute();
      // }

      if (renderLabels || renderMarkers) {
        handleRenderMarkers();
      }

      if (!renderMarkers) {
        handleRemoveMarkers();
      }

      // if (!connectLocations) {
      //   handleRemoveRouteLine();
      // }

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

  // INIT MAP
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
