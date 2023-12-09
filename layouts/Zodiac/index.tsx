// icons
// masks
import { maskOverlays, masks } from "@/layouts/LayoutSettings/skyMapMasks";
import SkyForZodiacPoster from "@/public/zodiacs/sky.svg";

import { zodiacIconsList } from "@/layouts/LayoutSettings/zodiacIconsList";

import { useTypedSelector, AppDispatch } from "@/redux/store";

import "./zodiac.scss";

export const Zodiac = () => {
  const layout = useTypedSelector(({ layout }) => layout?.layout);
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="zodiac-bg flex items-center justify-center rounded-full relative">
        {posterStyles.isOverlay && (
          <div className="mask">
            {maskOverlays[posterStyles?.overlayId]?.figure}
          </div>
        )}
        <SkyForZodiacPoster />
        <div className="zodiac-figure">
          {zodiacIconsList[Number(layout.poster?.styles?.artwork)]?.figure}
        </div>
      </div>

      <div className="zodiac-icon">
        {zodiacIconsList[Number(layout.poster?.styles?.artwork)]?.icon}
      </div>
    </div>
  );
};
