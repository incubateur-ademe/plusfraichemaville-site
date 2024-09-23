import clsx from "clsx";
import { useState } from "react";
import CmsRichText from "./CmsRichText";

type ShowMoreRichTextProps = {
  richText: string;
  className?: string;
};

export const ShowMoreRichText = ({ richText, className }: ShowMoreRichTextProps) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return (
    <>
      <div className={clsx("overflow-hidden", show ? "line-clamp-none" : `line-clamp-4`)}>
        <CmsRichText label={richText} className={className} />
      </div>
      <button onClick={toggle} className={clsx("mb-4 text-sm font-medium")}>
        voir {show ? "moins" : "plus"}
      </button>
    </>
  );
};
