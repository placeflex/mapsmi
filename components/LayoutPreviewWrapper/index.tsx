import { useEffect, useRef, useState } from "react";

// styles
import styles from "./layoutPreviewWrapper.module.scss";

interface PropsScale {
  width?: number;
  height?: number;
  scale?: number;
}

interface LayoutPreviewWrapperProps {
  children?: React.ReactNode;
}

const GAP_FOR_BORDER = 100;

export const LayoutPreviewWrapper = ({
  children,
}: LayoutPreviewWrapperProps) => {
  const refLayoutWrapper = useRef<HTMLDivElement>(null);
  const refArtworkWrapper = useRef<HTMLDivElement>(null);

  const [artworkStyles, setArtworkStyles] = useState<PropsScale>({
    width: 0,
    height: 0,
    scale: 1,
  });

  const handleChangeScale = () => {
    if (refLayoutWrapper.current && refArtworkWrapper.current) {
      const gap =
        refLayoutWrapper.current.offsetHeight -
        refArtworkWrapper.current.offsetHeight;
      const parentWidth = refLayoutWrapper.current.offsetWidth - gap;
      const parentHeight = refLayoutWrapper.current.offsetHeight - gap;
      const childWidth = refArtworkWrapper.current.offsetWidth;
      const childHeight = refArtworkWrapper.current.offsetHeight;
      const scaleWidth = parentWidth / childWidth;
      const scaleHeight = parentHeight / childHeight;
      const scale = Math.min(scaleWidth, scaleHeight);

      setArtworkStyles(prev => ({
        ...prev,
        scale,
      }));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
      handleChangeScale();
      window.addEventListener("resize", handleChangeScale);
      return () => {
        window.removeEventListener("resize", handleChangeScale);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refLayoutWrapper.current, refArtworkWrapper.current]);

  const handleResize = () => {
    if (refLayoutWrapper.current) {
      let height = refLayoutWrapper.current.offsetHeight - GAP_FOR_BORDER;
      let width = height / 1.44;

      setArtworkStyles({
        width,
        height,
      });
    }
  };

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
