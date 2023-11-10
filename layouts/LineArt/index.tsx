interface Texts {
  heading?: string;
  subline?: string;
  tagline?: string;
  divider?: string;
}

interface LineArtProps {
  className?: string;
  theme: string;
  figure: React.ReactNode | string;
  styles?: Object;
  texts?: Texts;
}

// styles
import "./lineart.scss";

export const LineArt = ({
  className = "",
  theme = "minimalist",
  figure,
  styles,
  texts,
}: LineArtProps) => {
  let withoutText =
    !texts?.heading && !texts?.subline && !texts?.divider && !texts?.tagline;
  return (
    <div
      className={`artwork relative flex ${className} ${theme}`}
      style={styles}
    >
      <div className="border artwork-wrapper relative">
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
