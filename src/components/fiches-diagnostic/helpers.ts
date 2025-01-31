import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

export const makeFicheDiagnosticUrlApi = (id: string | number) => `/api/get-fiche-diagnostic?ficheDiagnosticId=${id}`;

export const isFicheDiagICU = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.DiminutionICU);
};

export const isFicheDiagConfortThermique = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.ConfortThermique);
};

export const getFicheDiagUtilite = (ficheDiagnostic: FicheDiagnostic) => {
  return {
    type: isFicheDiagICU(ficheDiagnostic)
      ? FicheDiagnosticUtilite.DiminutionICU
      : FicheDiagnosticUtilite.ConfortThermique,
    color: isFicheDiagICU(ficheDiagnostic)
      ? "bg-dsfr-background-contrast-red-marianne"
      : "bg-dsfr-background-contrast-red-marianne",
  };
};
