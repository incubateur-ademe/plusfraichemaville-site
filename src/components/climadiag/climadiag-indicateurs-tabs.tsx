import { ClimadiagIndicateursTabButton } from "./climadiag-indicateurs-tab-button";
import { ClimadiagIndicateursTabButtons } from "./climadiag-indicateurs-tab-buttons";
import { useClimadiagIndicateurTabs } from "./hooks/use-climadiag-indicateur-tabs";
import { ClimadiagIndicateursLine } from "./climadiag-indicateurs-line";
import { ClimadiagIndicateursHeader } from "./climadiag-indicateurs-header";
import { ClimadiagDto } from "@/src/types/dto";

export const ClimadiagIndicateursTabs = ({ data }: { data: ClimadiagDto }) => {
  const { selectedYear, changeYearTab, yearlyData } = useClimadiagIndicateurTabs(data);

  return (
    <div className="mt-12 text-dsfr-text-label-blue-france">
      <ClimadiagIndicateursHeader city={`${data.nom} ${data.codePostal}`} />
      <ClimadiagIndicateursTabButtons>
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2030} active={selectedYear === 2030} />
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2050} active={selectedYear === 2050} />
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2100} active={selectedYear === 2100} />
      </ClimadiagIndicateursTabButtons>
      <ClimadiagIndicateursLine year={selectedYear} temperature={yearlyData.jours_tres_chauds} type="jours_chauds" />
      <ClimadiagIndicateursLine year={selectedYear} temperature={yearlyData.nuits_chaudes} type="nuits_chaudes" />
      <ClimadiagIndicateursLine year={selectedYear} temperature={yearlyData.jours_vdc} type="jours_vdc" />
    </div>
  );
};
