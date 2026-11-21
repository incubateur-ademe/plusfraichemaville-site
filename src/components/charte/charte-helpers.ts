import { Charte } from "@/src/lib/strapi/types/api/charte";
import { getRegionCodeFromDepartementCode } from "@/src/helpers/departements-regions";
import { getRegionLabelFromCode } from "@/src/helpers/regions";

export const CHARTE_REGION_FILTER_NAME = "regionFilter";

export type CharteSignataire = Charte & {
  regionCode: string | null;
  regionLabel: string | null;
};

export type CharteRegionCount = {
  code: string;
  label: string;
  count: number;
};

export const toCharteSignataires = (chartes: Charte[]): CharteSignataire[] =>
  chartes
    .map((charte) => {
      const regionCode = getRegionCodeFromDepartementCode(charte.departement.code);
      return { ...charte, regionCode, regionLabel: getRegionLabelFromCode(regionCode) ?? null };
    })
    .sort((a, b) => (a.nom_collectivite ?? "").localeCompare(b.nom_collectivite ?? "", "fr"));

export const countSignatairesByRegion = (signataires: CharteSignataire[]): CharteRegionCount[] => {
  const countByRegion = new Map<string, CharteRegionCount>();
  signataires.forEach(({ regionCode, regionLabel }) => {
    if (!regionCode || !regionLabel) {
      return;
    }
    const current = countByRegion.get(regionCode);
    countByRegion.set(regionCode, { code: regionCode, label: regionLabel, count: (current?.count ?? 0) + 1 });
  });
  return Array.from(countByRegion.values()).sort((a, b) => a.label.localeCompare(b.label, "fr"));
};
