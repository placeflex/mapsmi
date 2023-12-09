import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

// stores
import { useTypedSelector } from "@/redux/store";

// styles
import styles from "./layoutPreviewWrapper.module.scss";

interface PropsScale {
  width?: number;
  height?: number;
  scale?: number;
  isRender?: boolean;
}
interface LayoutPreviewWrapperProps {
  children?: React.ReactNode;
  className?: string;
  render?: boolean;
}

const GAP_FOR_SMALL_POSTER = 180;
const GAP_FOR_MEDIUM_POSTER = 110;
const GAP_FOR_BIG_POSTER = 80;

const initArtworkStyles = {
  width: 900,
  height: 400,
  scale: 1,
  isRender: false,
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
  className = "",
  render,
}: LayoutPreviewWrapperProps) => {
  const refLayoutWrapper = useRef<HTMLDivElement>(null);
  const refArtworkWrapper = useRef<HTMLDivElement>(null);
  const posterSizeId = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes?.size?.id
  );
  const posterOrientationId = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes?.orientation?.id
  );
  const layout = useTypedSelector(({ layout }) => layout.layout);

  // const router = useRouter();
  // const { product_id } = router.query;

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

        setArtworkStyles(prev => {
          return {
            ...prev,
            scale: scale,
            isRender: true,
          };
        });

        // if (
        //   typeof window !== "undefined" &&
        //   layout.productId === 2 &&
        //   window.CustomMap &&
        //   window.CustomMap.resize &&
        //   artworkStyles.isRender
        // ) {
        //   window.CustomMap?.resize();
        //   console.log("window.CustomMap", window.CustomMap);
        // }

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
        if (Number(layout.productId) == 2) {
          let height = 3000 - gap;
          let width = height / 1.44;

          setArtworkStyles(prev => ({
            ...prev,
            width,
            height,
          }));

          return;
        }

        switch (posterSizeId) {
          case 0:
            setArtworkStyles(prev => ({
              ...prev,
              width: 354.4,
              height: 472.5,
            }));
            break;
          case 1:
            setArtworkStyles(prev => ({
              ...prev,
              width: 590.6,
              height: 826.8,
            }));
            break;
          default:
            setArtworkStyles(prev => ({
              ...prev,
              width: 826.8,
              height: 1181.2,
            }));
            break;
        }
      } else {
        if (Number(layout.productId) == 2) {
          let width = 3000 - gap;
          let height = width / 1.44;

          setArtworkStyles(prev => ({
            ...prev,
            width,
            height,
          }));

          return;
        }

        switch (posterSizeId) {
          case 0:
            setArtworkStyles(prev => ({
              ...prev,
              width: 472.5,
              height: 354.4,
            }));
            break;
          case 1:
            setArtworkStyles(prev => ({
              ...prev,
              width: 826.8,
              height: 590.6,
            }));
            break;
          default:
            setArtworkStyles(prev => ({
              ...prev,
              width: 1181.2,
              height: 826.8,
            }));
            break;
        }
      }
    }
  };

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
    layout.productId,
  ]);

  // useEffect(() => {
  //   console.log("artworkStyles", artworkStyles);

  //   if (
  //     typeof window !== "undefined" &&
  //     layout.productId === 2 &&
  //     window.CustomMap &&
  //     window.CustomMap.resize &&
  //     artworkStyles.isRender &&
  //     refArtworkWrapper.current &&
  //     refLayoutWrapper.current
  //   ) {

  //     // window?.CustomMap?.resize();
  //   }
  // }, [posterOrientationId,posterSizeId]);

  return (
    <div
      className={`poster ${styles.posterWrapper} ${
        render ? styles.render : ""
      } ${className}`}
      ref={refLayoutWrapper}
    >
      <div
        className={`${styles.artwork} art`}
        style={{
          width: `${artworkStyles?.width}px`,
          height: `${artworkStyles?.height}px`,
          transform: render
            ? `scale(${artworkStyles?.scale})`
            : `translate(-50%, -50%) scale(${artworkStyles?.scale})`,
        }}
        ref={refArtworkWrapper}
      >
        {artworkStyles.isRender && layout.productId == 2 ? (
          <div className="w-full h-full" key={JSON.stringify(artworkStyles)}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
