import { Input } from "@/components/Input";
import { Accordion } from "@/components/Accordion";

// lineart settings ( panel )
import { svgList } from "@/modules/LineartSettings/iconsList";
import { paletteArtwork } from "@/modules/LineartSettings/colorsList";
import { artworkTheme as themes } from "@/modules/LineartSettings/artworkStylesList";
import { sizes, orientations } from "@/layouts/LayoutAttributes";

// stores
import { useTypedSelector } from "@/redux/store";

interface LineArtPanelContentInterface {
  handleSelectFigure: (id: number) => void;
  handleArtworkColor: (id: number) => void;
  handleartworkTheme: (id: number) => void;
  handleChangeLabel: ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => void;
  handleSelectSize: (id: number) => void;
  handleSelectOrientations: (id: number) => void;
}

export const LineArtPanelContent = ({
  handleSelectFigure,
  handleArtworkColor,
  handleartworkTheme,
  handleChangeLabel,
  handleSelectSize,
  handleSelectOrientations,
}: LineArtPanelContentInterface) => {
  const posterStyles = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.styles
  );
  const posterAttributes = useTypedSelector(
    ({ layout }) => layout.layout?.selectedAttributes
  );
  const posterLabels = useTypedSelector(
    ({ layout }) => layout.layout?.poster?.labels
  );
  return (
    <Accordion
      items={[
        {
          title: "Select illustration",
          content: (
            <div className="icons h-[300px] overflow-y-auto grid pr-4 grid-cols-3 gap-2 w-full">
              {svgList.map(({ icon, id }): React.ReactNode => {
                return (
                  <div
                    key={id}
                    className={`h-[120px] bg-white p-4 cursor-pointer border-2 ${
                      id === Number(posterStyles?.artwork) ? "border-black" : ""
                    }`}
                    onClick={() => handleSelectFigure(id)}
                  >
                    {icon}
                  </div>
                );
              })}
            </div>
          ),
        },
        {
          title: "Customize the colors",
          content: (
            <div className="icons h-[300px] overflow-y-auto grid grid-cols-4 gap-2 ">
              {paletteArtwork.map(({ icon, bg, id }): React.ReactNode => {
                return (
                  <div
                    key={id}
                    className={`flex items-center justify-center h-[50px] bg-white cursor-pointer border-2 ${
                      id === Number(posterStyles?.palette) ? "border-black" : ""
                    }`}
                    onClick={() => handleArtworkColor(id)}
                    style={{ background: bg }}
                  >
                    <div className="w-[20px]">{icon}</div>
                  </div>
                );
              })}
            </div>
          ),
        },
        {
          title: "Customize the style",
          content: (
            <div className="icons overflow-y-auto flex flex-wrap gap-1">
              {themes.map(({ name, id }) => {
                return (
                  <button
                    key={id}
                    className={`bg-white text-xs cursor-pointer flex items-center justify-center px-4 py-2 rounded-md w-[calc(33%-2)] hover:bg-black hover:text-white shadow-sm border-2 ${
                      id === Number(posterStyles?.theme) ? "border-black" : ""
                    }`}
                    onClick={() => handleartworkTheme(id)}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          ),
        },
        {
          title: "Customize the text",
          content: (
            <>
              <div className="mb-4">
                <Input
                  label="Headline"
                  className="text-xs"
                  onChange={v =>
                    handleChangeLabel({
                      label: "heading",
                      value: v.target.value,
                    })
                  }
                  maxlength={40}
                  value={posterLabels?.heading}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Subline"
                  className="text-xs"
                  onChange={v =>
                    handleChangeLabel({
                      label: "subline",
                      value: v.target.value,
                    })
                  }
                  maxlength={60}
                  value={posterLabels?.subline}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Divider"
                  className="text-xs"
                  onChange={v =>
                    handleChangeLabel({
                      label: "divider",
                      value: v.target.value,
                    })
                  }
                  maxlength={40}
                  value={posterLabels?.divider}
                />
              </div>
              <Input
                label="Tagline"
                className="text-xs"
                onChange={v =>
                  handleChangeLabel({
                    label: "tagline",
                    value: v.target.value,
                  })
                }
                maxlength={40}
                value={posterLabels?.tagline}
              />
            </>
          ),
        },
        {
          title: "Change the size",
          content: (
            <>
              <div className="flex flex-col mb-4">
                <h5 className="font-bold text-sm mb-2">Select poster size</h5>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(({ id, name }): React.ReactNode => {
                    return (
                      <button
                        className={`border bg-bg text-xs cursor-pointer flex items-center justify-center px-4 py-3 rounded-md grow hover:bg-black hover:text-white shadow-sm border-2  ${
                          Number(posterAttributes?.size?.id) == id
                            ? "border-black"
                            : ""
                        }`}
                        key={id}
                        onClick={() => handleSelectSize(id)}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-sm mb-2">Select orientation</h5>
                <div className="flex flex-wrap gap-2">
                  {orientations.map(({ id, name }): React.ReactNode => {
                    return (
                      <button
                        className={`border bg-bg text-xs cursor-pointer flex items-center justify-center px-4 py-3 rounded-md grow hover:bg-black hover:text-white shadow-sm border-2 ${
                          id === Number(posterAttributes?.orientation?.id)
                            ? "border-black"
                            : ""
                        }`}
                        key={id}
                        onClick={() => handleSelectOrientations(id)}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
};
