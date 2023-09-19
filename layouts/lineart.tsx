interface LineArtProps {
  className?: string;
  theme: string;
  figure: React.ReactNode | string;
  styles?: Object;
}

// styles
import "./lineart.scss";

export const LineArt = ({
  className,
  theme = "minimalist",
  figure,
  styles,
}: LineArtProps) => {
  return (
    <div className={`artwork relative ${className} ${theme}`} style={styles}>
      <div className="border h-full artwork-wrapper">
        <div className={`artworkFigure`}>{figure}</div>

        <div className="labels">
          <h1 className="headline">Kiev</h1>
          <h3 className="subline">Ukraine</h3>
          <span className="divider">COOrdinates</span>
          <h2 className="tagline">Troeshina</h2>
        </div>
      </div>
    </div>
  );
};
