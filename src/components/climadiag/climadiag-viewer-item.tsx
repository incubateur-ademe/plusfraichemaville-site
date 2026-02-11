import { ClimadiagIndicateursLine } from "./climadiag-indicateurs-line";
import { ClimadiagIndicateursTabButton } from "./climadiag-indicateurs-tab-button";
import { ClimadiagYear } from "./types";
import { ClimadiagDto } from "@/src/types/dto";

export const ClimadiagViewerItem = ({ data, year }: { data: ClimadiagDto; year: ClimadiagYear }) => {
  return (
    <div className="mb-14">
      <div className="mb-5">
        <ClimadiagIndicateursTabButton active year={year} />{" "}
        <span className="text-base text-pfmv-grey">horizon (TRACC, 2024)</span>
      </div>
      <ClimadiagIndicateursLine
        temperature={{ prevision: data.joursTresChauxPrevision[year], ref: data.joursTresChauxRef }}
        type="jours_chauds"
        year={year}
        isPDF
      />
      <ClimadiagIndicateursLine
        temperature={{ prevision: data.nuitsChauxdesPrevision[year], ref: data.nuitsChauxdesRef }}
        type="nuits_chaudes"
        year={year}
        isPDF
      />
      <ClimadiagIndicateursLine
        temperature={{ prevision: data.joursVdcPrevision[year], ref: data.joursVdcRef }}
        type="jours_vdc"
        year={year}
        isPDF
      />
    </div>
  );
};
