import { useEffect, useState } from "react";
import { basicColors } from "@/layouts/wallartSettings/colorsList";

// stores
import { useTypedSelector } from "@/redux/store";

// styles
import "./skymap.scss";

// masks
import { maskOverlays } from "@/layouts/wallartSettings/skyMapMasks";

// import starts from "@/public/data";

declare global {
  interface Window {
    Celestial: any;
  }
}

export const SkyMap = () => {
  const [cls, setCls] = useState<any>();
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  const posterDate = useTypedSelector(({ layout }) => layout.layout?.date);
  const currentPosterLocation: any = useTypedSelector(
    ({ layout }) => layout.layout?.locations
  );

  const styles = {
    stroke: basicColors[Number(posterStyles?.color)]?.textColor,
    bg: basicColors[Number(posterStyles?.color)]?.bg,
    ilstr: basicColors[Number(posterStyles?.color)]?.illustrationColor,
  };

  const isImageLayout =
    posterStyles.layoutStyle == 6 ||
    posterStyles.layoutStyle == 7 ||
    posterStyles.layoutStyle == 8 ||
    posterStyles.layoutStyle == 9;

  const config = {
    date: new Date(posterDate),
    container: "map",
    form: false,
    advanced: false,
    controls: false,
    lang: "",
    interactive: false,
    disableAnimations: false,
    zoomlevel: null,
    zoomextend: 1,
    projection: "airy", //orthographic dafault
    // projection: "azimuthalEqualArea", //orthographic dafault
    // projection: "stereographic", //orthographic dafault
    // projection: "wiechel", //orthographic dafault
    transform: "equatorial",
    follow: "zenith",
    width: 1500,
    height: 1500,
    orientationfixed: false,
    projectionRatio: null,
    background: {
      fill: isImageLayout ? "transparent" : styles.ilstr,
      // fill: "transparent",
      stroke: styles.stroke,
      opacity: 1,
      width: isImageLayout ? 0.3 : 0.6,
    },
    lines: {
      graticule: {
        show: posterStyles?.grid,
        stroke: styles.bg,
        strokeWidth: 0.1,
        opacity: 1,
      },
      equatorial: { show: false },
      ecliptic: { show: false },
      galactic: { show: false },
      supergalactic: { show: false },
    },
    datapath: "/data",
    planets: {
      which: [
        "sol",
        "mer",
        "ven",
        "ter",
        "lun",
        "mar",
        "jup",
        "sat",
        "ura",
        "nep",
      ],
      symbolType: "disk",
      show: false,
    },
    dsos: {
      show: false,
      names: false,
    },
    culture: "",
    constellations: {
      names: posterStyles?.labels,
      namesType: "name",
      nameStyle: {
        fill: `${styles.bg}`,
        align: "center",
        baseline: "middle",
        font: isImageLayout
          ? "10px Helvetica, Arial, sans-serif"
          : "11px Helvetica, Arial, sans-serif",
      },
      lines: posterStyles?.lines,
      lineStyle: {
        stroke: styles.bg,
        width: isImageLayout ? 0.7 : 0.9,
        opacity: 1,
      },
      // lineStyle: { stroke: styles.stroke, width: 1.6, opacity: 1 },
      bounds: false,
      // boundStyle: { stroke: "red", width: 0.5, opacity: 0.8, dash: [2, 4] },
    },
    horizon: {
      //Show horizon marker, if location is set and map projection is all-sky
      show: false,
      stroke: "#cccccc", // Line
      width: 1.0,
      fill: "#000000", // Area below horizon
      opacity: 0.5,
    },
    mw: {
      show: posterStyles?.milkyway,
      style: { fill: styles.bg, opacity: 0.15 },
    },
    daylight: {
      //Show day sky as a gradient, if location is set and map projection is hemispheric
      show: false,
    },
    stars: {
      show: posterStyles?.stars, // Отображение звезд
      designationType: "desig", // Which kind of name is displayed as designation (fieldname in starnames.json)
      // Отображение звезд ярче этой звездной величины
      colors: false, // Отображение звезд в цвете (или только белые)
      size: isImageLayout ? 9 : 16,
      limit: 6,
      exponent: -0.35,
      designation: false,
      style: {
        // Стиль отображения звезд
        fill: styles.bg, // Цвет
        // fill: styles.stroke, // Цвет
        opacity: 1, // Прозрачность
      },
      propername: false,
      propernameType: "name",
      propernameStyle: {
        fill: "red",
        align: "center",
        baseline: "middle",
      },
      data: "stars.6.json",
    },
  };

  useEffect(() => {
    import("d3-celestial").then(celestial => {
      const Celestial = celestial.Celestial();
      Celestial?.display(config);
      setCls(Celestial);
    });
  }, []);

  useEffect(() => {
    if (cls) {
      if (JSON.stringify(currentPosterLocation) !== "{}") {
        cls.skyview({
          location: [
            currentPosterLocation[0]?.center[1],
            currentPosterLocation[0]?.center[0],
          ],
        });
      }

      cls.skyview({
        date: new Date(posterDate),
      });

      cls.rotate();
    }
  }, [cls]);

  useEffect(() => {
    if (cls) {
      cls?.apply(config);
    }
  }, [posterStyles, posterDate]);

  useEffect(() => {
    if (cls) {
      if (JSON.stringify(currentPosterLocation) !== "{}") {
        cls.skyview({
          location: [
            currentPosterLocation[0]?.center[1],
            currentPosterLocation[0]?.center[0],
          ],
        });
      }

      cls.skyview({
        date: new Date(posterDate),
      });

      cls.rotate();
    }
  }, [currentPosterLocation, posterDate]);

  return (
    <div className="h-full w-full flex flex-col skymap-wrapper">
      <div className="relative h-full w-full" id="map-holder">
        {posterStyles.isOverlay && (
          <div className="mask">
            {maskOverlays[posterStyles.overlayId]?.figure}
          </div>
        )}

        <div className="map-wrapper" id="map"></div>
      </div>
    </div>
  );
};
