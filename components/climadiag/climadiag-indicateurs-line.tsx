import Image from "next/image";
import { ClimadiagIndicateursLineJour } from "./climadiag-indicateurs-line-jour";
import { SeparatorY } from "../common/separator";
import { ClimadiagTemperatureJour, ClimadiagTypeJour, ClimadiagYear } from "./types";
import { useState } from "react";
import { ClimadiagIndicateursLineLegend } from "./climadiag-indicateurs-line-legend";
import { climadiagIndicateursData } from "./climadia-indicateurs-data";
import clsx from "clsx";

type ClimadiagIndicateursLineProps = {
  type: ClimadiagTypeJour;
  temperature: ClimadiagTemperatureJour;
  year: ClimadiagYear;
  viewer?: boolean;
};

export const ClimadiagIndicateursLine = ({ type, temperature, viewer, year }: ClimadiagIndicateursLineProps) => {
  const { title, picto, indice, legend: climatLegend } = climadiagIndicateursData.line[type];
  const [legend, setLegend] = useState(false);
  const toggler = () => setLegend(!legend);

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl px-5 py-2 mb-2 w-fit lg:w-full",
        viewer && "border-[2px] border-pfmv-light-grey/35",
      )}
      id={`line-${type}`}
    >
      <div className="flex justify-between flex-col gap-4 lg:flex-row lg:gap-0">
        <div className="flex items-center gap-6">
          <Image
            src={`/images/climadiag/${picto}.svg`}
            width={100}
            height={100}
            className="w-[100px] h-[100px]"
            alt="jour très chaud picto"
          />
          <div className="max-w-[350px] lg:max-w-[420px] pt-4">
            <span className="text-[22px] font-bold block pb-1">{title}</span>
            {indice && (
              <span className="text-[22px] block">
                ({">"}
                {indice}°C)
              </span>
            )}
            {!viewer && (
              <button onClick={toggler} className="text-sm underline mt-4">
                Afficher la légende
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <ClimadiagIndicateursLineJour jour={temperature.ref} withBackground />
          <ClimadiagIndicateursLineJour jour={temperature.prevision.min} valeur="basse" />
          <SeparatorY className="h-24" />
          <ClimadiagIndicateursLineJour jour={temperature.prevision.median} valeur="médiane" />
          <SeparatorY className="h-24" />
          <ClimadiagIndicateursLineJour jour={temperature.prevision.max} valeur="haute" />
        </div>
      </div>
      {legend && <ClimadiagIndicateursLineLegend legend={climatLegend[year]} year={year} />}
    </div>
  );
};