// import { fontsList } from "@/layouts/LayoutSettings/layoutFonts";
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
}

// styles
import "./globalLayoutStyles.scss";

// import { useTypedSelector } from "@/redux/store";

export const LayoutContent = ({
  className = "",
  layoutStyle = "minimalist",
  font,
  figure,
  styles,
  texts,
}: LineArtProps) => {
  let withoutText =
    !texts?.heading && !texts?.subline && !texts?.divider && !texts?.tagline;

  return (
    <div
      className={`artwork relative flex ${className} ${layoutStyle}`}
      style={styles}
    >
      <div className="border-holder artwork-wrapper relative">
        <div className={`artworkFigure ${withoutText ? "h-full" : ""}`}>
          {figure}
        </div>
        {!withoutText && (
          <div className="labels">
            {texts?.heading && <h1 className="headline">{texts?.heading}</h1>}
            {texts?.subline && <h3 className="subline">{texts?.subline}</h3>}
            {texts?.divider && (
              <span className="divider">{texts?.divider}</span>
            )}
            {texts?.tagline && <h2 className="tagline">{texts?.tagline}</h2>}
          </div>
        )}
      </div>
    </div>
  );
};
