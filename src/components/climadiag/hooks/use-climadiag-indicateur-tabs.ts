import { useState } from "react";
import { Climadiag, ClimadiagYear } from "../types";
import { getYearlyClimadiagData } from "@/src/components/climadiag/helpers";

export const useClimadiagIndicateurTabs = (data: Climadiag) => {
  const [selectedYear, setSelectedYear] = useState<ClimadiagYear>(2030);

  const changeYearTab = (year: ClimadiagYear) => {
    setSelectedYear(year);
  };

  const yearlyData = getYearlyClimadiagData(data, selectedYear);

  return {
    selectedYear,
    changeYearTab,
    yearlyData,
  };
};
