import clsx from "clsx";
import { AidesTerritoiresAideLine } from "@/components/financement/aide/aide-info-lines";
import React from "react";
import { AideInfoLineTooltip } from "./aide-info-lines-tooltip";
import { processDescription } from "../helpers";

type AideFichePanelLineProps = {
  line: AidesTerritoiresAideLine;
  pictoClassname?: string;
  classname?: string;
  withTooltip?: boolean;
};

export const AideFichePanelLine = ({ line, pictoClassname, classname, withTooltip }: AideFichePanelLineProps) => {
  const description = processDescription(line.description);

  return (
    <div className={clsx("flex items-start gap-[10px]", classname)}>
      <i className={clsx(`${line.picto} block shrink-0`, "before:!pt-[20px] before:!align-[-1px]", pictoClassname)} />
      <div>
        <span className=" font-bold">{line.title}</span>
        {description ? (
          withTooltip && Array.isArray(line.description) ? (
            <AideInfoLineTooltip text={line.description} tooltipText={line.description} />
          ) : (
            <div className="mb-0 text-pretty">{description}</div>
          )
        ) : (
          <div>Non communiqué</div>
        )}
      </div>
    </div>
  );
};
