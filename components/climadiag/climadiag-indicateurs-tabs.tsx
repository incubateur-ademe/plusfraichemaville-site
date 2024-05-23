import { ClimadiagIndicateursTabButton } from "./climadiag-indicateurs-tab-button";
import { ClimadiagIndicateursTabButtons } from "./climadiag-indicateurs-tab-buttons";
import { useClimadiagIndicateurTabs } from "./hooks/use-climadiag-indicateur-tabs";
import { ClimadiagIndicateursLine } from "./climadiag-indicateurs-line";
import { ClimadiagDownloader } from "./climadiag-downloader";
import { ClimadiagIndicateursHeader } from "./climadiag-indicateurs-header";
import { Climadiag } from "./types";

export const ClimadiagIndicateursTabs = ({ data }: { data: Climadiag }) => {
  const { selectedYear, changeYearTab, yearlyData } = useClimadiagIndicateurTabs(data);

  return (
    <div className="mt-12 text-dsfr-text-label-blue-france">
      <ClimadiagIndicateursHeader city={`${data.nom} ${data.code_postal}`} />
      <ClimadiagIndicateursTabButtons>
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2030} active={selectedYear === 2030} />
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2050} active={selectedYear === 2050} />
        <ClimadiagIndicateursTabButton changeTab={changeYearTab} year={2100} active={selectedYear === 2100} />
      </ClimadiagIndicateursTabButtons>
      <ClimadiagIndicateursLine
        temperature={yearlyData.jours_tres_chauds}
        type="jours_chauds"
        year={selectedYear}
      ></ClimadiagIndicateursLine>
      <ClimadiagIndicateursLine year={selectedYear} temperature={yearlyData.nuits_chaudes} type="nuits_chaudes" />
      <ClimadiagIndicateursLine year={selectedYear} temperature={yearlyData.jours_vdc} type="jours_vdc" />
      <ClimadiagDownloader data={data}></ClimadiagDownloader>
    </div>
  );
};
