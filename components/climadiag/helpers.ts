import { climadiag } from "@prisma/client";
import { Options } from "react-select";

const climadiagInfoLabel = (climadiagInfo: climadiag) =>
  climadiagInfo.type_lieu === "epci"
    ? `${climadiagInfo.nom} - EPCI`
    : `${climadiagInfo.nom} - ${climadiagInfo.code_postal}`;

export const climadiagToOptions = (climadiagInfos: climadiag[]) =>
  climadiagInfos.map((climadiagInfo: climadiag) => ({
    value: climadiagInfo.id,
    label: climadiagInfoLabel(climadiagInfo),
  }));

export const computeSearchResultGroup = (climadiagOptions: Options<unknown>) => {
  return [
    {
      label: "Résultat de recherche",
      options: climadiagOptions,
    },
  ];
};

export const NO_RESULT_OPTION = [{ label: "Aucun résultat", isDisabled: true }];
