import { climadiag } from "@prisma/client";
import { Climadiag, ClimadiagTemperatureJourMap, ClimadiagYear, GroupedOptions, Option } from "./types";

export const climadiagInfoLabel = (climadiagInfo: climadiag) =>
  climadiagInfo.type_lieu === "epci"
    ? `${climadiagInfo.nom} - EPCI`
    : `${climadiagInfo.nom} - ${climadiagInfo.code_postal}`;

export const climadiagToOptions = (climadiagInfos: climadiag[]) =>
  climadiagInfos.map((climadiagInfo: climadiag) => ({
    value: climadiagInfo.id,
    label: climadiagInfoLabel(climadiagInfo),
  }));

export const computeSearchResultGroup = (climadiagOptions: Option[]): GroupedOptions[] => {
  return [
    {
      label: "Résultat de recherche",
      options: climadiagOptions,
    },
  ];
};

export const NO_RESULT_OPTION = [{ label: "Aucun résultat", value: 0, isDisabled: true }];

export const getYearlyClimadiagData = (data: Climadiag, year: ClimadiagYear): ClimadiagTemperatureJourMap => {
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
