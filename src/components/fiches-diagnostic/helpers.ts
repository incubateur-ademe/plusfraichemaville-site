import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

export const makeFicheDiagnosticUrlApi = (id: string | number) => `/api/get-fiche-diagnostic?ficheDiagnosticId=${id}`;

export const isFicheDiagICU = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.DiminutionICU);
};

export const isFicheDiagConfortThermique = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.ConfortThermique);
};

type UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite;
  colors: {
    bgDark: string;
    bgLight: string;
    border: string;
    text: string;
  };
};

export const UTILITE_FICHE_DIAG_ICU: UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite.DiminutionICU,
  colors: {
    bgDark: " bg-background-fiche-diag-icu ",
    bgLight: " bg-background-diag-icu ",
    border: " !border-dsfr-background-alt-red-marianne ",
    text: " !text-black ",
  },
};

export const UTILITE_FICHE_DIAG_CONFORT_THERMIQUE: UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite.ConfortThermique,
  colors: {
    bgDark: " bg-background-fiche-confort-thermique ",
    bgLight: " bg-background-confort-thermique ",
    border: " border-dsfr-background-flat-warning ",
    text: " text-black ",
  },
};

export const getFicheDiagUtilite = (ficheDiagnostic: FicheDiagnostic): UtiliteFicheProperties =>
  isFicheDiagICU(ficheDiagnostic) ? UTILITE_FICHE_DIAG_ICU : UTILITE_FICHE_DIAG_CONFORT_THERMIQUE;

export const getFicheDiagUtiliteProperties = (utilite?: FicheDiagnosticUtilite): UtiliteFicheProperties =>
  utilite === FicheDiagnosticUtilite.DiminutionICU ? UTILITE_FICHE_DIAG_ICU : UTILITE_FICHE_DIAG_CONFORT_THERMIQUE;
