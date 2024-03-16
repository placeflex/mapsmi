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
  size = 16,
}: CustomTooltipProps) => {
  return (
    <Tooltip placement={placement} title={text} arrow={arrow}>
      <TooltipIcon width={size} height={size} />
    </Tooltip>
  );
};
