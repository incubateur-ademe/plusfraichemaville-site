import { useState } from "react";
import { Climadiag, ClimadiagTemperatureJourMap, ClimadiagYear } from "../types";

export const useClimadiagIndicateurTabs = (data: Climadiag) => {
  const [selectedYear, setSelectedYear] = useState<ClimadiagYear>(2030);

  const changeYearTab = (year: ClimadiagYear) => {
    setSelectedYear(year);
  };

  const getYearlyData = (year: ClimadiagYear): ClimadiagTemperatureJourMap => {
    return {
      jours_tres_chauds: {
        prevision: data.jours_tres_chauds_prevision[year],
        ref: data.jours_tres_chauds_ref,
      },
      nuits_chaudes: {
        prevision: data.nuits_chaudes_prevision[year],
        ref: data.nuits_chaudes_ref,
      },
      jours_vdc: {
        prevision: data.jours_vdc_prevision[year],
        ref: data.jours_vdc_ref,
      },
    };
  };

  const yearlyData = getYearlyData(selectedYear);

  return {
    selectedYear,
    changeYearTab,
    yearlyData,
  };
};
