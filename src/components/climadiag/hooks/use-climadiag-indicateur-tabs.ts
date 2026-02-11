import { useState } from "react";
import { ClimadiagYear } from "../types";
import { getYearlyClimadiagData } from "@/src/components/climadiag/helpers";
import { ClimadiagDto } from "@/src/types/dto";

export const useClimadiagIndicateurTabs = (data: ClimadiagDto) => {
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
