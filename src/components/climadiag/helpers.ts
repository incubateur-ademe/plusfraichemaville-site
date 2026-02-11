import { ClimadiagTemperatureJourMap, ClimadiagYear, GroupedOptions, Option } from "./types";
import { ClimadiagDto } from "@/src/types/dto";

export const climadiagInfoLabel = (climadiagInfo: ClimadiagDto) =>
  climadiagInfo.typeLieu === "epci"
    ? `${climadiagInfo.nom} - EPCI`
    : `${climadiagInfo.nom} - ${climadiagInfo.codePostal}`;

export const climadiagToOptions = (climadiagInfos: ClimadiagDto[]) =>
  climadiagInfos.map((climadiagInfo: ClimadiagDto) => ({
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

export const getYearlyClimadiagData = (data: ClimadiagDto, year: ClimadiagYear): ClimadiagTemperatureJourMap => {
  return {
    jours_tres_chauds: {
      prevision: data.joursTresChauxPrevision[year],
      ref: data.joursTresChauxRef,
    },
    nuits_chaudes: {
      prevision: data.nuitsChauxdesPrevision[year],
      ref: data.nuitsChauxdesRef,
    },
    jours_vdc: {
      prevision: data.joursVdcPrevision[year],
      ref: data.joursVdcRef,
    },
  };
};
