import { useEffect, useState } from "react";
import { basicColors } from "@/layouts/wallartSettings/colorsList";

// stores
import { useTypedSelector } from "@/redux/store";

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
    cusps: [296, 350, 30, 56, 75, 94, 116, 170, 210, 236, 255, 274],
    birth: {
      year: 2024,
      month: 2,
      day: 8,
      hour: 20,
      minute: 0,
      city: "New York",
      country: "US",
    },
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

        // CUSTOM_SYMBOL_FN: ("SYMBOL_MOON", -4,-1,Arrow) => Arrow,

        // SYMBOL_MOON: "Moon",
        // SYMBOL_MERCURY: "Mercury",
        // SYMBOL_VENUS: "Venus",
        // SYMBOL_MARS: "Mars",
        // SYMBOL_JUPITER: "Jupiter",
        // SYMBOL_SATURN: "Saturn",
        // SYMBOL_URANUS: "Uranus",
        // SYMBOL_NEPTUNE: "Neptune",
        // SYMBOL_PLUTO: "Pluto",
        // SYMBOL_CHIRON: "Chiron",
        // SYMBOL_LILITH: "Lilith",
        // SYMBOL_NNODE: "NNode",
        // SYMBOL_SNODE: "SNode",
        // SYMBOL_FORTUNE: "Fortune",
        // STROKE_ONLY: true,
      });

      var radix = chart.radix(data).aspects();

      // radix.aspects();
      //   setRadix(radix);
      return radix;
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
