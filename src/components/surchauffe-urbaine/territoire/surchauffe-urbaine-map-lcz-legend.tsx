import clsx from "clsx";
import { LCZ_LEGENDS } from "@/src/components/surchauffe-urbaine/territoire/lcz-legend";

export const SurchauffeUrbaineMapLczLegend = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(className, "flex flex-col gap-4")}>
      {LCZ_LEGENDS.map((legend) => (
        <div key={legend.description} className="flex flex-row gap-2">
          <div className={clsx("mt-1 size-3.5 shrink-0", legend.color)}></div>
          {legend.description}
        </div>
      ))}
    </div>
  );
};
