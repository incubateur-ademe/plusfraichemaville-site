import clsx from "clsx";
import { AidesTerritoiresAideLine } from "@/src/components/financement/aide/aide-info-lines";

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
  return (
    <div className={clsx("flex items-start gap-[10px]", classname)}>
      <i className={clsx(`${line.picto} block shrink-0`, "before:!pt-[20px] before:!align-[-1px]", pictoClassname)} />
      <div>
        <span className=" font-bold">{line.title}</span>
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
