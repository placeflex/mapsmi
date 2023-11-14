import { useEffect, useState } from "react";
import { paletteArtwork } from "@/layouts/LayoutSettings/colorsList";

// stores
import { useTypedSelector } from "@/redux/store";

// styles
import "./skymap.scss";

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
    stroke: paletteArtwork[Number(posterStyles?.palette)]?.textColor,
    bg: paletteArtwork[Number(posterStyles?.palette)]?.bg,
    ilstr: paletteArtwork[Number(posterStyles?.palette)]?.illustrationColor,
  };

  const config = {
    container: "map",
    form: false,
    advanced: false,
    interactive: false,
    disableAnimations: false,
    zoomlevel: null,
    zoomextend: 1,
    projection: "orthographic",
    transform: "horizontal",
    follow: "zenith",
    width: 800,
    height: 600,
    background: {
      fill: styles.ilstr,
      stroke: styles.stroke,
      opacity: 1,
      width: 0,
    },
    lines: {
      graticule: {
        show: true,
        stroke: styles.bg,
        strokeWidth: 0.1,
        opacity: 0.3,
      },
      equatorial: { show: true },
      ecliptic: { show: false },
      galactic: { show: false },
      supergalactic: { show: false },
    },
    datapath: "https://ofrohn.github.io/data/",
    planets: {
      show: false,
      which: ["mer", "ven", "ter", "lun", "mar", "jup", "sat"],
      symbolType: "disk",
      names: false,
      nameStyle: {
        fill: "#00ccff",
        font: `14px ${FONT}`,
        align: "center",
        baseline: "top",
      },
      namesType: "en",
    },
    dsos: {
      show: false,
      names: false,
    },
    constellations: {
      names: false,
      namesType: "iau",
      nameStyle: {
        fill: "#000",
        align: "center",
        baseline: "middle",
        font: [`14px ${FONT}`, `8px ${FONT}`, `0px ${FONT}`],
      },
      lines: true,
      lineStyle: { stroke: styles.bg, width: 0.5, opacity: 0.5 },
    },
    mw: {
      show: true,
      style: { fill: styles.bg, opacity: 0.2 },
    },
    daylight: {
      //Show day sky as a gradient, if location is set and map projection is hemispheric
      show: false,
    },
    stars: {
      show: true, // Отображение звезд
      // Отображение звезд ярче этой звездной величины
      colors: false, // Отображение звезд в цвете (или только белые)

      size: 5,
      limit: 500,
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
      propernameLimit: 0,
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
    if (cls && JSON.stringify(currentPosterLocation) !== "{}") {
      cls.skyview({
        location: [
          currentPosterLocation?.center[1],
          currentPosterLocation?.center[0],
        ],
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
      cls.skyview({
        location: [
          currentPosterLocation?.center[1],
          currentPosterLocation?.center[0],
        ],
        date: new Date(posterDate),
      });
      cls.rotate();
    }
  }, [currentPosterLocation, posterDate]);

  return (
    <div className="map-wrapper">
      <div id="map"></div>
    </div>
  );
};
