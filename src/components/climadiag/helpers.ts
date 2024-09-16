import { climadiag } from "@prisma/client";
import { GroupedOptions, Option } from "./types";

const climadiagInfoLabel = (climadiagInfo: climadiag) =>
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
