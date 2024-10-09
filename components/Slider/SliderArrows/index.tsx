import Arrow from "@/public/slider/arrow.svg";
import { FC } from "react";

import clsx from "clsx";

interface ISliderArrows {
  wrapperClasses?: string;
  arrowClasses?: string;
  prevArrowClasses?: string;
  nextArrowClasses?: string;
  wrapper?: boolean;
}

export const SliderArrows: FC<ISliderArrows> = ({
  wrapperClasses,
  arrowClasses,
  prevArrowClasses,
  nextArrowClasses,
  wrapper = true,
}) => {
  return wrapper ? (
    <div className={clsx("flex z-10", wrapperClasses)}>
      <button
        className={clsx(
          "flex items-center justify-center rounded-full z-10 w-[40px] h-[40px] bg-button",
          prevArrowClasses
        )}
      >
        <Arrow
          width={14}
          className="rotate-180 relative left-[-1px]"
          fill="#fff"
        />
      </button>
      <button
        className={clsx(
          "flex items-center justify-center w-[40px] h-[40px] bg-button rounded-full",
          nextArrowClasses
        )}
      >
        <Arrow width={14} fill="#fff" className="relative right-[-1px]" />
      </button>
    </div>
  ) : (
    <>
      <button
        className={clsx(
          "absolute flex items-center justify-center rounded-full z-10 w-[40px] h-[40px] bg-button",
          prevArrowClasses
        )}
      >
        <Arrow
          width={14}
          className="rotate-180 relative left-[-1px]"
          fill="#fff"
        />
      </button>
      <button
        className={clsx(
          "absolute flex items-center justify-center w-[40px] h-[40px] bg-button rounded-full",
          nextArrowClasses
        )}
      >
        <Arrow width={14} fill="#fff" className="relative right-[-1px]" />
      </button>
    </>
  );
};
