import classNames from "classnames";
import { useRouter } from "next/router";
interface Texts {
  heading?: string;
  subline?: string;
  tagline?: string;
  divider?: string;
}

interface LineArtProps {
  className?: string;
  layoutStyle: string;
  figure: React.ReactNode | string;
  styles?: Object;
  texts?: Texts;
  font?: any;
  render?: boolean;
}

// styles
import "./globalLayoutStyles.scss";

import { useTypedSelector } from "@/redux/store";

export const LayoutContent = ({
  className = "",
  layoutStyle = "minimalist",
  figure,
  styles,
  texts,
  render,
}: LineArtProps) => {
  const router = useRouter();
  const { preview } = router.query;
  const frame = useTypedSelector(
    ({ layout }) => layout?.layout?.selectedAttributes?.frame
  );
  let withoutText =
    !texts?.heading && !texts?.subline && !texts?.divider && !texts?.tagline;

  return (
    <div
      className={`artwork relative flex ${className} ${layoutStyle}`}
      style={styles}
    >
      <div className="border-holder artwork-wrapper relative">
        <div className="custom-line main"></div>
        <div className="custom-line second"></div>

        <div className={`artworkFigure ${withoutText ? "h-full" : ""}`}>
          {/* <div className="h-full w-full">{figure}</div> */}
          {figure}

          {!withoutText && (
            <div className="labels">
              {texts?.heading && <h1 className="headline">{texts?.heading}</h1>}
              {texts?.subline && <h2 className="subline">{texts?.subline}</h2>}
              {texts?.divider && <h3 className="divider">{texts?.divider}</h3>}
              {texts?.tagline && (
                <span className="tagline">{texts?.tagline}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {frame.id !== 0 && (!render || preview) && (
        <div
          id="poster-mount"
          className={classNames(frame.name, frame.color, frame.material)}
        ></div>
      )}
    </div>
  );
};
