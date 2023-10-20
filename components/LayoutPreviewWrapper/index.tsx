import { useEffect, useRef, useState } from "react";

// stores
import { useTypedSelector } from "@/redux/store";

// styles
import styles from "./LayoutPreviewWrapper.module.scss";

interface PropsScale {
  width?: number;
  height?: number;
  scale?: number;
  isRendered?: boolean;
}
interface LayoutPreviewWrapperProps {
  children?: React.ReactNode;
}

const GAP_FOR_SMALL_POSTER = 180;
const GAP_FOR_MEDIUM_POSTER = 110;
const GAP_FOR_BIG_POSTER = 80;

const initArtworkStyles = {
  width: 900,
  height: 400,
  scale: 1,
};

const handleGetPosterGap = (sizeId: number) => {
  switch (sizeId) {
    case 0:
      return GAP_FOR_SMALL_POSTER;
    case 1:
      return GAP_FOR_MEDIUM_POSTER;
    default:
      return GAP_FOR_BIG_POSTER;
  }
};

export const LayoutPreviewWrapper = ({
  children,
}: LayoutPreviewWrapperProps) => {
  const refLayoutWrapper = useRef<HTMLDivElement>(null);
  const refArtworkWrapper = useRef<HTMLDivElement>(null);
  const posterSizeId = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes?.size?.id
  );
  const posterOrientationId = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes?.orientation?.id
  );

  const [artworkStyles, setArtworkStyles] =
    useState<PropsScale>(initArtworkStyles);

  const handleChangeScale = () => {
    if (refLayoutWrapper.current && refArtworkWrapper.current) {
      let gap = handleGetPosterGap(Number(posterSizeId));

      if (artworkStyles.width && artworkStyles.height) {
        const parentWidth = refLayoutWrapper.current.offsetWidth - gap;
        const parentHeight = refLayoutWrapper.current.offsetHeight - gap;
        const childWidth = artworkStyles.width;
        const childHeight = artworkStyles.height;
        const scaleWidth = parentWidth / childWidth;
        const scaleHeight = parentHeight / childHeight;
        const scale = Math.min(scaleWidth, scaleHeight);

        // for test

        setArtworkStyles(prev => ({
          ...prev,
          scale,
        }));

        // if (posterSizeId === 0) {
        //   setArtworkStyles(prev => ({
        //     ...prev,
        //     scale: 1,
        //   }));
        // } else {
        //   setArtworkStyles(prev => ({
        //     ...prev,
        //     scale,
        //   }));
        // }
      }
    }
  };

  const handleResize = () => {
    if (refLayoutWrapper.current) {
      let gap = handleGetPosterGap(Number(posterSizeId));

      if (posterOrientationId === 0) {
        let height = 2000 - gap;
        let width = height / 1.44;

        setArtworkStyles({
          width,
          height,
        });

        // switch (posterSizeId) {
        //   case 0:
        //     setArtworkStyles({
        //       width: 354.4,
        //       height: 472.5,
        //     });
        //     break;
        //   case 1:
        //     setArtworkStyles({
        //       width: 590.6,
        //       height: 826.8,
        //     });
        //     break;
        //   default:
        //     setArtworkStyles({
        //       width: 826.8,
        //       height: 1181.2,
        //     });
        //     break;
        // }
      } else {
        // let width = refLayoutWrapper.current.offsetWidth - gap;
        // let height = width / 1.44;

        // let width = (refLayoutWrapper.current.clientWidth - gap) * 4;
        // let height = width / 1.44;

        // setArtworkStyles({
        //   width: width,
        //   height: height,
        // });

        switch (posterSizeId) {
          case 0:
            setArtworkStyles({
              width: 472.5,
              height: 354.4,
            });
            break;
          case 1:
            setArtworkStyles({
              width: 826.8,
              height: 590.6,
            });
            break;
          default:
            setArtworkStyles({
              width: 1181.2,
              height: 826.8,
            });
            break;
        }
      }
    }
  };

  // const initSize = () => {
  //   const width = refLayoutWrapper.current?.clientWidth;
  //   const height = refLayoutWrapper.current?.clientHeight;

  //   if (posterOrientationId === 0) {
  //     const availableIndent = Number(height) / 1.2;

  //     setArtworkStyles(prev => ({
  //       ...prev,
  //       width: availableIndent / 1.4,
  //       height: availableIndent,
  //     }));
  //   } else {
  //     const availableIndent = Number(width) / 1.2;

  //     setArtworkStyles(prev => ({
  //       ...prev,
  //       width: availableIndent,
  //       height: availableIndent / 1.4,
  //     }));
  //   }
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
      handleChangeScale();
      window.addEventListener("resize", handleChangeScale);
      return () => window.removeEventListener("resize", handleChangeScale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // refLayoutWrapper.current,
    // refArtworkWrapper.current,
    artworkStyles.width,
    artworkStyles.height,
    posterSizeId,
    posterOrientationId,
  ]);

  return (
    <div className={`poster ${styles.posterWrapper}`} ref={refLayoutWrapper}>
      <div
        className={`${styles.artwork}`}
        style={{
          width: `${artworkStyles?.width}px`,
          height: `${artworkStyles?.height}px`,
          transform: `translate(-50%, -50%) scale(${artworkStyles?.scale})`,
        }}
        ref={refArtworkWrapper}
      >
        {children}
      </div>
    </div>
  );
};
