// icons
// masks
import { maskOverlays, masks } from "@/layouts/wallartSettings/skyMapMasks";
import SkyForZodiacPoster from "@/public/zodiacs/sky.svg";

import { zodiacIcons } from "@/layouts/wallartSettings/zodiacIcons";

import { useTypedSelector, AppDispatch } from "@/redux/store";

import "./zodiac.scss";

export const Zodiac = () => {
  const layout = useTypedSelector(({ layout }) => layout?.layout);
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <div className="h-full w-full relative">
      <div className="zodiac-wrp h-full flex flex-col items-center justify-center">
        {posterStyles.isOverlay && (
          <div className="mask">
            {maskOverlays[posterStyles?.overlayId]?.figure}
          </div>
        )}
        <div className="zodiac-bg flex items-center justify-center rounded-full relative">
          <SkyForZodiacPoster />
          <div className="zodiac-figure">
            {zodiacIcons[Number(layout.poster?.styles?.artwork)]?.figure}
          </div>
        </div>
      </div>
      <div className="zodiac-icon">
        {zodiacIcons[Number(layout.poster?.styles?.artwork)]?.icon}
      </div>
    </div>
  );
};
