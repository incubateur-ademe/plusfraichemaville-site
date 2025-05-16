import clsx from "clsx";
import { climadiagIndicateursData } from "./climadia-indicateurs-data";
import { ClimadiagYear } from "./types";

type ClimadiagIndicateursLineLegendProps = {
  legend: string[];
  year: ClimadiagYear;
};

export const ClimadiagIndicateursLineLegend = ({ legend, year }: ClimadiagIndicateursLineLegendProps) => {
  return (
    <div className="flex flex-col-reverse justify-between pt-8 text-pfmv-grey lg:ml-[123px] lg:flex-row">
      <p className="max-w-[400px] text-sm text-dsfr-text-default-grey">
        {legend.map((line, index) => (
          <span className="mb-4 block" key={index}>
            {line}
          </span>
        ))}
      </p>
      <div className="max-w-[520px]">
        <div className="flex flex-wrap">
          {climadiagIndicateursData.legend.map((d, index) => (
            <div className="flex w-[130px] gap-3" key={index}>
              <div className={clsx({ [d.color]: true }, "mt-1 size-[6px] shrink-0 rounded-full")}></div>
              <p className="max-w-24 text-pretty text-[10px] leading-[14px]">
                {d.label} {year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
