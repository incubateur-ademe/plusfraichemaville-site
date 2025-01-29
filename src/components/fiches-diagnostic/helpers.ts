import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

export const makeFicheDiagnosticUrlApi = (id: string | number) => `/api/get-fiche-diagnostic?ficheDiagnosticId=${id}`;

export const isFicheDiagICU = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.DiminutionICU);
};

export const isFicheDiagConfortThermique = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.ConfortThermique);
};

export const getFicheDiagUtilite = (ficheDiagnostic: FicheDiagnostic): FicheDiagnosticUtilite =>
  isFicheDiagICU(ficheDiagnostic) ? FicheDiagnosticUtilite.DiminutionICU : FicheDiagnosticUtilite.ConfortThermique;
