import clsx from "clsx";
import { climadiagIndicateursData } from "./climadia-indicateurs-data";
import { ClimadiagYear } from "./types";

type ClimadiagIndicateursLineLegendProps = {
  legend: string[];
  year: ClimadiagYear;
};

export const ClimadiagIndicateursLineLegend = ({ legend, year }: ClimadiagIndicateursLineLegendProps) => {
  return (
    <div className="flex justify-between text-pfmv-grey pt-8">
      <p className="max-w-[450px] text-sm">
        {legend.map((line, index) => (
          <span className="mb-4 block" key={index}>
            {line}
          </span>
        ))}
      </p>
      <div className="flex w-[520px]">
        {climadiagIndicateursData.legend.map((d, index) => (
          <div className="w-[130px] flex gap-3" key={index}>
            <div className={clsx({ [d.color]: true }, "size-[6px] rounded-full shrink-0 mt-1")}></div>
            <p className="text-[10px] leading-[14px] max-w-24 text-pretty">
              {d.label} {year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
