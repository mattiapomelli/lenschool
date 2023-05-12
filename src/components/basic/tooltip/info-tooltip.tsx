import InfoIcon from "@icons/info.svg";

import { Tooltip, TooltipProps } from "./tooltip";

export const InfoTooltip = (props: Omit<TooltipProps, "children">) => {
  return (
    <Tooltip {...props}>
      <span>
        <InfoIcon className="h-4 w-4" />
      </span>
    </Tooltip>
  );
};
