import { $Enums, climadiag } from "@/src/generated/prisma/client";
import { climadiagInfoLabel } from "@/src/components/climadiag/helpers";
import { isEmpty } from "@/src/helpers/listUtils";
import { Climadiag } from "@/src/components/climadiag/types";
import TypeLieuClimadiag = $Enums.TypeLieuClimadiag;

export type CollectiviteOption = {
  value: string;
  label: string;
};

export type SearchResultOption = {
  value: string;
  label: string;
  type?: TypeLieuClimadiag;
};

export type SearchResultGroupedOptions = {
  label: string;
  options: SearchResultOption[];
};

export const mapClimadiagToCollectiteOption = (climadiagInfo: climadiag | null): CollectiviteOption | null => {
  if (!climadiagInfo) {
    return null;
  }
  return {
    value: climadiagInfo.code_insee,
    label: climadiagInfoLabel(climadiagInfo),
  };
};

export const climadiagToOptions = (climadiagInfos: climadiag[]): SearchResultOption[] =>
  climadiagInfos.map((climadiagInfo: climadiag) => ({
    value: climadiagInfo.code_insee,
    label: climadiagInfoLabel(climadiagInfo),
    type: climadiagInfo.type_lieu,
  }));

export const computeSearchResultGroup = (climadiagOptions: SearchResultOption[]): SearchResultGroupedOptions[] => {
  const epciOptions = climadiagOptions.filter((option) => option.type === TypeLieuClimadiag.epci);
  const collectiviteOptions = climadiagOptions.filter((option) => option.type === TypeLieuClimadiag.commune);

  const result: SearchResultGroupedOptions[] = [];

  if (!isEmpty(epciOptions)) {
    result.push({
      label: "EPCI",
      options: epciOptions,
    });
  }

  if (!isEmpty(collectiviteOptions)) {
    result.push({
      label: "Collectivités",
      options: collectiviteOptions,
    });
  }

  return result;
};

export const NO_RESULT_OPTION = [{ label: "Aucune donnée pour cette collectivité", value: "0", isDisabled: true }];

export const climadiagToPublicClimadiag = (climadiagInfo: Climadiag | null) => {
  if (!climadiagInfo) return climadiagInfo;
  return {
    ...climadiagInfo,
    jours_tres_chauds_prevision: { 2030: climadiagInfo.jours_tres_chauds_prevision["2030"] },
    jours_vdc_prevision: { 2030: climadiagInfo.jours_vdc_prevision["2030"] },
    nuits_chaudes_prevision: { 2030: climadiagInfo.nuits_chaudes_prevision["2030"] },
  };
};
