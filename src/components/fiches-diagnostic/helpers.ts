import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

export const makeFicheDiagnosticUrlApi = (id: string | number) => `/api/get-fiche-diagnostic?ficheDiagnosticId=${id}`;

export const isFicheDiagICU = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.DiminutionICU);
};

export const isFicheDiagConfortThermique = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.ConfortThermique);
};

export const UTILITE_FICHE_DIAG_ICU = {
  type: FicheDiagnosticUtilite.DiminutionICU,
  colors: {
    bgDark: "bg-dsfr-background-contrast-red-marianne",
    bgLight: "bg-dsfr-background-alt-red-marianne",
    border: "!border-dsfr-background-alt-red-marianne",
    text: "!text-black",
  },
};

export const UTILITE_FICHE_DIAG_CONFORT_THERMIQUE = {
  type: FicheDiagnosticUtilite.ConfortThermique,
  colors: {
    bgDark: "bg-dsfr-background-contrast-blue-france",
    bgLight: "bg-dsfr-background-alt-blue-france",
    border: "border-dsfr-border-default-blue-france",
    text: "text-black",
  },
};

export const getFicheDiagUtilite = (ficheDiagnostic: FicheDiagnostic) =>
  isFicheDiagICU(ficheDiagnostic) ? UTILITE_FICHE_DIAG_ICU : UTILITE_FICHE_DIAG_CONFORT_THERMIQUE;

export const getFicheDiagUtiliteProperties = (utilite?: FicheDiagnosticUtilite) =>
  utilite === FicheDiagnosticUtilite.DiminutionICU ? UTILITE_FICHE_DIAG_ICU : UTILITE_FICHE_DIAG_CONFORT_THERMIQUE;
