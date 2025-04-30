import { climadiag } from "@prisma/client";
import { climadiagInfoLabel } from "@/src/components/climadiag/helpers";

export type CollectiviteOption = {
  value: string;
  label: string;
};

export const searchedCollectiviteToOptions = (climadiagInfos: climadiag[]): CollectiviteOption[] =>
  climadiagInfos.map((climadiagInfo: climadiag) => ({
    value: climadiagInfo.code_insee,
    label: climadiagInfoLabel(climadiagInfo),
  }));
