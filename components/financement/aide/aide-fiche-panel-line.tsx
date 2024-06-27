import clsx from "clsx";
import { AidesTerritoiresAideLine } from "@/components/financement/aide/aide-info-lines";
import React from "react";
import { AideInfoLineShowMore } from "./aide-info-lines-show-more";
import { processDescription } from "../helpers";

type AideFichePanelLineProps = {
  line: AidesTerritoiresAideLine;
  pictoClassname?: string;
  classname?: string;
  showMore?: boolean;
};

export const AideFichePanelLine = ({ line, pictoClassname, classname, showMore }: AideFichePanelLineProps) => {
  const description = processDescription(line.description);
  console.log(line.title === "Subvention" ? line.description : "");

  return (
    <div className={clsx(classname)}>
      <div className="mb-2 flex flex-row">
        <i className={clsx(`${line.picto} mr-2`, pictoClassname)} />
        <span className="font-bold">{line.title}</span>
      </div>
      <div>
        {description ? (
          Array.isArray(line.description) ? (
            <AideInfoLineShowMore text={line.description} showMore={showMore} />
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
