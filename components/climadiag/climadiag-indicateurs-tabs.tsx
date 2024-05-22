import { ClimadiagIndicateursTabButton } from "./climadiag-indicateurs-tab-button";
import { ClimadiagIndicateursTabButtons } from "./climadiag-indicateurs-tab-buttons";
import { useClimadiagIndicateurTabs } from "./hooks/use-climadiag-indicateur-tabs";
import { Climadiag } from "./types";

import { ClimadiagIndicateursLine } from "./climadiag-indicateurs-line";

export const ClimadiagIndicateursTabs = ({ data }: { data: Climadiag }) => {
  const { selectedYear, changeYearTab, yearlyData } = useClimadiagIndicateurTabs(data);
  return (
    <div className="mt-12 text-dsfr-text-label-blue-france">
      <div className=" text-xl font-bold">
        <i className="ri-map-pin-line before:!w-[14px] mr-1"></i>
        {data.nom} {data.code_postal}
      </div>
      <ClimadiagIndicateursTabButtons>
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2030} active={selectedYear === 2030} />
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2050} active={selectedYear === 2050} />
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2100} active={selectedYear === 2100} />
      </ClimadiagIndicateursTabButtons>
      <ClimadiagIndicateursLine temperature={yearlyData.jours_tres_chauds} type="jours_chauds" />
      <ClimadiagIndicateursLine temperature={yearlyData.nuits_chaudes} type="nuits_chaudes" />
      <ClimadiagIndicateursLine temperature={yearlyData.jours_vdc} type="jours_vdc" />
    </div>
  );
};
