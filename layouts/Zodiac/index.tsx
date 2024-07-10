import { useEffect } from "react";
// icons
// masks
import { maskOverlays, masks } from "@/layouts/wallartSettings/skyMapMasks";
import SkyForZodiacPoster from "@/public/zodiacs/sky.svg";

import { zodiacIcons } from "@/layouts/wallartSettings/zodiacIcons";

import { useTypedSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { handleChangeLables } from "@/redux/layout";

import "./zodiac.scss";

export const Zodiac = () => {
  const layout = useTypedSelector(({ layout }) => layout?.layout);
  const dispatch: AppDispatch = useDispatch();
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  useEffect(() => {
    if (posterStyles.artwork == 0) {
      dispatch(
        handleChangeLables({
          label: "heading",
          value: zodiacIcons[0].name,
        })
      );

      dispatch(
        handleChangeLables({
          label: "tagline",
          value: zodiacIcons[0].tagline,
        })
      );

      dispatch(
        handleChangeLables({
          label: "subline",
          value: zodiacIcons[0].subline,
        })
      );

      dispatch(
        handleChangeLables({
          label: "divider",
          value: zodiacIcons[0].date,
        })
      );
    }
  }, [posterStyles.artwork]);

  return (
    <div className="h-full w-full relative zodiac-inner">
      <div className="zodiac-wrp h-full flex flex-col items-center justify-center">
        <div className="h-full w-full zodiac-bg-wrapper">
          <div className="zodiac-bg flex items-center justify-center rounded-full">
            {posterStyles.isOverlay && (
              <div className="mask">
                {maskOverlays[posterStyles?.overlayId]?.figure}
              </div>
            )}
            <SkyForZodiacPoster />
            <div className="zodiac-figure">
              {zodiacIcons[Number(layout.poster?.styles?.artwork)]?.figure}
            </div>
          </div>
        </div>
      </div>
      <div className="zodiac-icon">
        {zodiacIcons[Number(layout.poster?.styles?.artwork)]?.icon}
      </div>
    </div>
  );
};
