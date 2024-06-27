import { generateRandomId } from "@/helpers/common";
import clsx from "clsx";

type TooltipProps = {
  text: string[];
  tooltipText: string[];
  slice?: number;
};

export const AideInfoLineTooltip = ({ text, tooltipText, slice = 3 }: TooltipProps) => {
  const id = `tooltip-${generateRandomId()}`;
  const slicedText = text.slice(0, slice);
  const remainingElements = text.length - slice;
  return text.length > 3 ? (
    <div className="relative">
      {slicedText.join(", ")}{" "}
      <span aria-describedby={id} id="link">
        {`(et ${remainingElements} ${remainingElements > 1 ? "autres" : "autre"})`}
      </span>
      <span className={clsx("fr-tooltip fr-placement")} id={id} role="tooltip" aria-hidden="true">
        {tooltipText.join(", ")}
      </span>
    </div>
  ) : (
    <div>{text.join(", ")}</div>
  );
};
