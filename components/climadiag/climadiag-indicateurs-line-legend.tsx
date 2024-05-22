import clsx from "clsx";
import { ReactNode } from "react";
import { climadiagIndicateursData } from "./climadia-indicateurs-data";

type ClimadiagIndicateursLineLegendProps = {
  legend: ReactNode;
};

export const ClimadiagIndicateursLineLegend = ({ legend }: ClimadiagIndicateursLineLegendProps) => {
  return (
    <div className="flex justify-between text-pfmv-grey pt-8">
      <p className="max-w-[450px] text-sm">{legend}</p>
      <div className="flex w-[520px]">
        {climadiagIndicateursData.legend.map((d, index) => (
          <div className="w-[130px] flex gap-3" key={index}>
            <div className={clsx({ [d.color]: true }, "size-[6px] rounded-full shrink-0 mt-1")}></div>
            <p className="text-[10px] leading-[14px] max-w-24 text-pretty">{d.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
