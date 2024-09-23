import { ClimadiagIndicateursLine } from "./climadiag-indicateurs-line";
import { ClimadiagIndicateursTabButton } from "./climadiag-indicateurs-tab-button";
import { Climadiag, ClimadiagYear } from "./types";

export const ClimadiagViewerItem = ({ data, year }: { data: Climadiag; year: ClimadiagYear }) => {
  return (
    <div className="mb-14">
      <div className="mb-5">
        <ClimadiagIndicateursTabButton active year={year} />{" "}
        <span className="text-base text-pfmv-grey">horizon (TRACC, 2024)</span>
      </div>
      <ClimadiagIndicateursLine
        temperature={{ prevision: data.jours_tres_chauds_prevision[year], ref: data.jours_tres_chauds_ref }}
        type="jours_chauds"
        year={year}
        isPDF
      />
      <ClimadiagIndicateursLine
        temperature={{ prevision: data.nuits_chaudes_prevision[year], ref: data.nuits_chaudes_ref }}
        type="nuits_chaudes"
        year={year}
        isPDF
      />
      <ClimadiagIndicateursLine
        temperature={{ prevision: data.jours_vdc_prevision[year], ref: data.jours_vdc_ref }}
        type="jours_vdc"
        year={year}
        isPDF
      />
    </div>
  );
};
