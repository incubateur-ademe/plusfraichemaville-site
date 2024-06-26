import clsx from "clsx";
import { AidesTerritoiresAideLine } from "@/components/financement/aide/aide-info-lines";
import React from "react";

type AideFichePanelLineProps = {
  line: AidesTerritoiresAideLine;
  pictoClassname?: string;
  classname?: string;
};
export const AideFichePanelLine = ({ line, pictoClassname, classname }: AideFichePanelLineProps) => {
  const desc = Array.isArray(line.description) ? line.description?.filter(Boolean).join(", ") : line.description;

  return (
    <div className={clsx("flex items-start gap-[10px]", classname)}>
      <i className={clsx(`${line.picto} block shrink-0`, "before:!align-[-1px]", pictoClassname)} />
      <div>
        <span className=" font-bold">{line.title}</span>
        {line.description && <div className="mb-0 text-pretty">{desc}</div>}
      </div>
    </div>
  );
};
