import clsx from "clsx";
import { useState } from "react";
import CmsRichText from "./CmsRichText";

type ShowMoreRichTextProps = {
  richText: string;
  lines: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export const ShowMoreRichText = ({ richText, lines = 4, className }: ShowMoreRichTextProps) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <>
      <div className={clsx("overflow-hidden", show ? "line-clamp-none" : `line-clamp-${lines}`)}>
        <CmsRichText label={richText} className={className} />
      </div>
      <button onClick={toggle} className={clsx("mb-4 text-sm font-medium")}>
        voir {show ? "moins" : "plus"}
      </button>
    </>
  );
};
