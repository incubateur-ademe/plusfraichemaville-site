"use client";
import clsx from "clsx";
import { Climadiag } from "@/src/components/climadiag/types";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Image from "next/image";
import { ClimadiagIndicateursLine } from "@/src/components/climadiag/climadiag-indicateurs-line";
import { getYearlyClimadiagData } from "@/src/components/climadiag/helpers";

export const SurchauffeUrbaineClimadiag = ({
  climadiagInfo,
  className,
}: {
  climadiagInfo: Climadiag;
  className?: string;
}) => {
  const yearlyData = getYearlyClimadiagData(climadiagInfo, 2030);
  return (
    <div className={clsx("pfmv-strong-card px-12 py-10 text-left", className)}>
      <div className="mb-8 flex flex-row items-center justify-between">
        <div>
          <Badge className="!bg-dsfr-background-open-blue-france !text-pfmv-navy">climat futur (TRACC*)</Badge>
          <div className="text-[1.375rem] font-bold text-pfmv-navy">En 2030, voici les projections de Météo-France</div>
        </div>
        <div
          className={clsx(
            "flex cursor-pointer items-center justify-center gap-4",
            "hover:bg-dsfr-background-default-grey-hover",
          )}
          onClick={() => window.open("https://climadiag-commune.meteofrance.com/", "_blank")}
        >
          <Image
            src="/images/climadiag/climadiag-meteo-france.png"
            width={136}
            height={48}
            alt="Logo Météo France Climadiag"
          />
          <Image src="/images/climadiag/meteo-france.svg" width={48} height={48} alt="Logo Météo France" />
        </div>
      </div>
      <ClimadiagIndicateursLine
        year={2030}
        temperature={yearlyData.jours_tres_chauds}
        type="jours_chauds"
        classname="border border-dsfr-border-default-grey"
      />
      <ClimadiagIndicateursLine
        year={2030}
        temperature={yearlyData.nuits_chaudes}
        type="nuits_chaudes"
        classname="border border-dsfr-border-default-grey"
      />
      <ClimadiagIndicateursLine
        year={2030}
        temperature={yearlyData.jours_vdc}
        type="jours_vdc"
        classname="border border-dsfr-border-default-grey"
      />
    </div>
  );
};
