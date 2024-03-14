import clsx from "clsx";
import { useState } from "react";
import CmsRichText from "./CmsRichText";

function cutTextWithoutBlank(str: string, maxLength?: number) {
  if (maxLength) {
    if (str.length <= maxLength) return str;
    let cutPosition = str.substring(0, maxLength + 1).lastIndexOf(" ");
    if (cutPosition === -1) cutPosition = maxLength;

    return str.substring(0, cutPosition);
  }
}

export const TruncateRichText = ({
  richText,
  maxHeight = 4.5, // rem
  maxChars = 200,
}: {
  richText: string;
  maxHeight?: number;
  maxChars?: number;
}) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const currentRichText = show ? richText : `${cutTextWithoutBlank(richText, maxChars)} ...`;
  return (
    <>
      <div className={clsx("overflow-hidden", show ? "max-h-auto" : `max-h-[${maxHeight}rem]`)}>
        <CmsRichText label={currentRichText} className="text-sm" />
      </div>
      <button onClick={toggle} className={clsx("mb-4 text-sm font-medium")}>
        voir {show ? "moins" : "plus"}
      </button>
    </>
  );
};
