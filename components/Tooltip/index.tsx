import { Tooltip } from "antd";

import TooltipIcon from "public/icons/tooltip.svg";

interface CustomTooltipProps {
  text?: string;
  arrow?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  size?: number;
}

export const CustomTooltip = ({
  text = "Tooltip",
  arrow = true,
  placement = "top",
  size = 20,
}: CustomTooltipProps) => {
  return (
    <Tooltip
      trigger="click"
      placement={placement}
      title={text}
      arrow={arrow}
      className="cursor-pointer text-caption"
    >
      <TooltipIcon width={size} height={size} />
    </Tooltip>
  );
};
