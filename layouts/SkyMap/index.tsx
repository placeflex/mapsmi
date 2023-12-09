import { useEffect, useState } from "react";
import { basicColors } from "@/layouts/LayoutSettings/colorsList";

// stores
import { useTypedSelector } from "@/redux/store";

// styles
import "./skymap.scss";

// masks
import { maskOverlays } from "@/layouts/LayoutSettings/skyMapMasks";

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
    ({ layout }) => layout.layout?.currentLocation
  );

  const FONT = "var(--font-main)";

  const styles = {
    stroke: basicColors[Number(posterStyles?.color)]?.textColor,
    bg: basicColors[Number(posterStyles?.color)]?.bg,
    ilstr: basicColors[Number(posterStyles?.color)]?.illustrationColor,
  };

  const config = {
    container: "map",
    form: false,
    advanced: false,
    controls: false,
    lang: "",
    interactive: false,
    disableAnimations: false,
    zoomlevel: null,
    zoomextend: 1,
    projection: "orthographic",
    transform: "equatorial",
    follow: "zenith",
    width: 800,
    height: 800,
    background: {
      fill: styles.ilstr,
      stroke: styles.stroke,
      opacity: 1,
      width: 0,
    },
    lines: {
      graticule: {
        show: posterStyles?.grid,
        stroke: styles.bg,
        strokeWidth: 0.1,
        opacity: 0.3,
      },
      equatorial: { show: false },
      ecliptic: { show: false },
      galactic: { show: false },
      supergalactic: { show: false },
    },
    datapath: datapath,
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
    constellations: {
      names: true,
      namesType: "iau",
      nameStyle: {
        fill: `${styles.bg}`,
        align: "center",
        baseline: "middle",
        font: [`14px ${FONT}`, `8px ${FONT}`, `0px ${FONT}`],
      },
      lines: posterStyles?.lines,
      lineStyle: { stroke: styles.bg, width: 0.5, opacity: 0.5 },
      bounds: false,
      boundStyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] },
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

      size: 6,
      limit: 7,
      exponent: -0.28,
      designation: false,
      style: {
        // Стиль отображения звезд
        fill: styles.bg, // Цвет
        opacity: 1, // Прозрачность
      },
      propername: false,
      propernameType: "name",
      propernameStyle: {
        fill: "red",
        font: `8px ${FONT}`,
        align: "right",
        baseline: "center",
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
            currentPosterLocation?.center[1],
            currentPosterLocation?.center[0],
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
  }, [posterStyles, config]);

  useEffect(() => {
    if (cls) {
      if (JSON.stringify(currentPosterLocation) !== "{}") {
        cls.skyview({
          location: [
            currentPosterLocation?.center[1],
            currentPosterLocation?.center[0],
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
    <>
      <div className="map-wrapper" id="map">
        {posterStyles.isOverlay && (
          <div className="mask">
            {maskOverlays[posterStyles.overlayId].figure}
          </div>
        )}
      </div>
    </>
  );
};
