import { useEffect } from "react";
import { Layout } from "@/components/Layout";

import { AboutUs } from "@/modules/About/AboutUs";
import { AboutSteps } from "@/modules/About/Steps";

import { Chart } from "@astrodraw/astrochart";

import dynamic from "next/dynamic";

// const AstroChart = dynamic(() => import("@astrodraw/astrochart"), {
//   ssr: false, // Отключение SSR (Server-Side Rendering), если это требуется
// });
const Natal = () => {
  useEffect(() => {
    import("@astrodraw/astrochart").then(({ Chart }) => {
      var chart = new Chart("paper", 800, 800, {
        COLOR_ARIES: "#eeff00",
        COLOR_TAURUS: "#ff4500",
        COLOR_GEMINI: "#eeff00",
        COLOR_CANCER: "#ff4500",
        COLOR_LEO: "#eeff00",
        COLOR_VIRGO: "#ff4500",
        COLOR_LIBRA: "#eeff00",
        COLOR_SCORPIO: "#ff4500",
        COLOR_SAGITTARIUS: "#eeff00",
        COLOR_CAPRICORN: "#ff4500",
        COLOR_AQUARIUS: "#eeff00",
        COLOR_PISCES: "#ff4500",
      });

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
      };

      var radix = chart.radix(data);
    });
  }, []);

  return (
    <Layout headerProps={{ classNames: "bg-secondary" }} scroll={true}>
      <div id="paper"></div>
    </Layout>
  );
};

export default Natal;
