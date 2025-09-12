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
  titleHeadingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  isPDF?: boolean;
  classname?: string;
};

export const ClimadiagIndicateursLine = ({
  type,
  temperature,
  isPDF,
  year,
  titleHeadingLevel = "h4",
  classname,
}: ClimadiagIndicateursLineProps) => {
  const { title, picto, indice, legend: climatLegend } = climadiagIndicateursData.line[type];
  const [legend, setLegend] = useState(false);
  const toggler = () => setLegend(!legend);
  const TitleHeadingTag = titleHeadingLevel;

  return (
    <div
      className={clsx(
        "mb-2 w-fit rounded-2xl bg-white px-5 py-2 lg:w-full",
        isPDF && "w-full border-[2px] border-pfmv-light-grey/35",
        classname,
      )}
    >
      <div className={clsx("climadiag-line flex justify-between lg:flex-row lg:gap-0", !isPDF && "flex-col gap-4")}>
        <div className="flex items-center gap-6">
          <Image
            src={`/images/climadiag/${picto}.svg`}
            width={100}
            height={100}
            className="hidden h-[100px] w-[100px] md:block"
            alt="jour très chaud picto"
          />
          <div className={clsx("max-w-[300px] pt-4", !isPDF && "lg:max-w-[420px]")}>
            <TitleHeadingTag
              className={clsx("mb-0 block text-[22px] font-bold leading-[1.2] text-dsfr-text-label-blue-france")}
            >
              {title}
            </TitleHeadingTag>
            {indice && (
              <span className="block text-[22px] leading-[1.2]">
                ({">"}
                {indice}°C)
              </span>
            )}
            {!isPDF && (
              <button onClick={toggler} className="mt-4 text-sm text-pfmv-navy underline">
                {!legend ? "Afficher la légende" : "Masquer la légende"}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center lg:flex-nowrap">
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
