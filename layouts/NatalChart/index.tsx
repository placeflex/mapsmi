import { useEffect, useState } from "react";
import { basicColors } from "@/layouts/wallartSettings/colorsList";

// stores
import { useTypedSelector } from "@/stores/store";

// styles
import "./styles/default.scss";

// masks
import { maskOverlays } from "@/layouts/wallartSettings/skyMapMasks";
import Arrow from "@/public/icons/arrow.svg";

// declare global {
//   interface Window {
//     Celestial: any;
//   }
// }

export const NatalChart = () => {
  const [radix, setRadix] = useState<any>();

  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );
  const posterattrs = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes
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

  var data = {
    planets: {
      Pluto: [63],
      Neptune: [110],
      Uranus: [318],
      Saturn: [201],
      Jupiter: [192],
      Mars: [210],
      Moon: [268],
      Sun: [281],
      Mercury: [312],
      Venus: [330],
    },
    cusps: [10, 15, 4, 200, 75, 94, 116, 170, 210, 236, 255, 274],
  };

  const draw = () => {
    import("@astrodraw/astrochart").then(({ Chart }) => {
      if (typeof window != "undefined") {
        const b = document.getElementById("paper");

        if (b) {
          b.innerHTML = "";
        }
      }
      var chart = new Chart("paper", 800, 800, {
        COLOR_ARIES: styles.ilstr,
        COLOR_TAURUS: styles.bg,
        COLOR_GEMINI: styles.ilstr,
        COLOR_CANCER: styles.bg,
        COLOR_LEO: styles.ilstr,
        COLOR_VIRGO: styles.bg,
        COLOR_LIBRA: styles.ilstr,
        COLOR_SCORPIO: styles.bg,
        COLOR_SAGITTARIUS: styles.ilstr,
        COLOR_CAPRICORN: styles.bg,
        COLOR_AQUARIUS: styles.ilstr,
        COLOR_PISCES: styles.bg,
        STROKE_ONLY: false,
        SHOW_DIGNITIES_TEXT: false,
        CUSPS_STROKE: 2,
        CUSPS_FONT_COLOR: "#fff",
        SYMBOL_AXIS_STROKE: 0,
        SHIFT_IN_DEGREES: 0,
        CIRCLE_STRONG: 3,
        PADDING: 15,
        SIGNS_STROKE: 1,
        MARGIN: 4,
        // POINTS_COLOR: "#fff",
        SYMBOL_SCALE: 1,
        LINE_COLOR: styles.ilstr,
        SYMBOL_AXIS_FONT_COLOR: "#fff",
      });

      var radix = chart.radix(data).aspects();

      // radix.aspects();
      //   setRadix(radix);
      // return radix;
    });
  };

  useEffect(() => {
    // import("@astrodraw/astrochart").then(({ Chart }) => {
    //   const radix = draw(Chart);

    //   setRadix(radix);
    // });
    draw();
  }, []);

  useEffect(() => {
    // draw({ Chart: radix });
    draw();
  }, [styles]);

  // useEffect(() => {
  //   var date = { year: 2012, month: 1, day: 1, hour: 0 };
  //   var flag = swisseph.SEFLG_SPEED;
  // }, []);

  //   useEffect(() => {
  //     if (cls && posterDate && currentPosterLocation[0]?.center[1]) {
  //       cls.skyview({
  //         date: new Date(posterDate),
  //         location: [
  //           currentPosterLocation[0]?.center[1],
  //           currentPosterLocation[0]?.center[0],
  //         ],
  //       });
  //     }
  //   }, [cls, currentPosterLocation, posterDate]);

  //   useEffect(() => {
  //     if (cls) {
  //       cls?.apply(config);
  //     }
  //   }, [posterStyles]);

  //   useEffect(() => {
  //     if (cls) {
  //       cls?.reload();
  //     }
  //   }, [posterattrs.size.id]);

  return (
    // <div>
    <div id="paper"></div>
    // </div>
  );
};
