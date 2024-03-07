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

const GAP_FOR_SMALL_POSTER = 220;
const GAP_FOR_MEDIUM_POSTER = 160;
const GAP_FOR_BIG_POSTER = 110;

const initArtworkStyles = {
  width: 400,
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
  const posterMaterialId = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes?.material?.id
  );
  const posterOrientationId = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes?.orientation?.id
  );
  const layout = useTypedSelector(({ layout }) => layout.layout);

  const [artworkStyles, setArtworkStyles] =
    useState<PropsScale>(initArtworkStyles);

  const handleChangeScale = () => {
    if (refLayoutWrapper.current && refArtworkWrapper.current) {
      let gap = render ? 0 : handleGetPosterGap(Number(posterSizeId));

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
            scale: scale >= 1 ? 1 : scale,
            // scale: scale > 2.5 ? 2.5 : scale,
            isRender: true,
          };
        });
      }
    }
  };

  const handleResize = () => {
    if (refLayoutWrapper.current) {
      let gap = render ? 0 : handleGetPosterGap(Number(posterSizeId));

      if (posterOrientationId === 0) {
        let width = layout.selectedAttributes?.size?.width - gap;
        let height = layout.selectedAttributes?.size?.height - gap;

        setArtworkStyles(prev => ({
          ...prev,
          width: render ? width : (width / 100) * 10,
          height: render ? height : (height / 100) * 10,
        }));
      } else {
        let width = layout.selectedAttributes?.size?.height - gap;
        let height = layout.selectedAttributes?.size?.width - gap;
        setArtworkStyles(prev => ({
          ...prev,
          width: render ? width : (width / 100) * 10,
          height: render ? height : (height / 100) * 10,
        }));
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
    artworkStyles.width,
    artworkStyles.height,
    posterSizeId,
    posterOrientationId,
    layout.productId,
    layout.selectedAttributes,
  ]);

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
            ? ``
            : `translate(-50%, -50%) scale(${artworkStyles?.scale})`,
        }}
        ref={refArtworkWrapper}
      >
        {children}
      </div>
    </div>
  );
};
