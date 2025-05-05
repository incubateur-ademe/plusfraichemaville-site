import { climadiag } from "@prisma/client";
import { climadiagInfoLabel } from "@/src/components/climadiag/helpers";

export type CollectiviteOption = {
  value: string;
  label: string;
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
