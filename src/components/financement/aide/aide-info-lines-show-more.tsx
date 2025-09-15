import clsx from "clsx";
import { useState } from "react";

type TooltipProps = {
  text: string[];
  slice?: number;
  showMore?: boolean;
};

export const AideInfoLineShowMore = ({ text, slice = 3, showMore }: TooltipProps) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  const slicedText = text.slice(0, slice);
  const currentText = show ? text : slicedText;
  const remainingElements = text.length - slice;

  return text.length > 3 ? (
    showMore ? (
      <div className="relative">
        {currentText.join(", ")}{" "}
        <button onClick={toggle} className={clsx("mb-4 block text-sm font-medium underline")}>
          voir {show ? "moins" : `les ${remainingElements} ${remainingElements > 1 ? "autres" : "autre"}`}
        </button>
      </div>
    ) : (
      <div className="relative">
        {slicedText.join(", ")}{" "}
        <span id="link">{`(et ${remainingElements} ${remainingElements > 1 ? "autres" : "autre"})`}</span>
      </div>
    )
  ) : (
    <div>{text.filter(Boolean).join(", ")}</div>
  );
};
