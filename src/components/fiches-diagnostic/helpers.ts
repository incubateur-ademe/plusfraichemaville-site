import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import {
  FicheDiagnosticUtilite,
  StrapiFicheDiagnosticEchelleSpatiale,
} from "@/src/lib/strapi/types/strapi-custom-types";

export const makeFicheDiagnosticUrlApi = (id: string | number) => `/api/get-fiche-diagnostic?ficheDiagnosticId=${id}`;

export const isFicheDiagICU = (ficheDiagnostic: FicheDiagnostic): boolean => {
  return !!ficheDiagnostic.attributes.effets_attendus?.includes(FicheDiagnosticUtilite.DiminutionICU);
};

export type UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite;
  colors: {
    bgDark: string;
    bgLight: string;
    border: string;
    separator: string;
    pictoHighlight: string;
    pictoFaded: string;
    pictoList: string;
    button: string;
  };
};

export const UTILITE_FICHE_DIAG_ICU: UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite.DiminutionICU,
  colors: {
    bgDark: "bg-background-fiche-diag-icu",
    bgLight: "bg-background-diag-icu",
    border: "!border-border-diag-icu",
    separator: "!bg-border-diag-icu",
    pictoHighlight: "!text-picto-highlight-diag-icu",
    pictoFaded: "!text-picto-faded-diag-icu",
    pictoList: "diag-icu-list",
    button: "diag-icu-button",
  },
};

export const UTILITE_FICHE_DIAG_CONFORT_THERMIQUE: UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite.ConfortThermique,
  colors: {
    bgDark: "!bg-background-fiche-confort-thermique",
    bgLight: "!bg-background-confort-thermique",
    border: "!border-border-confort-thermique",
    separator: "!bg-border-confort-thermique",
    pictoHighlight: "!text-picto-highlight-confort-thermique",
    pictoFaded: "!text-picto-faded-confort-thermique",
    pictoList: "confort-thermique-list",
    button: "confort-thermique-button",
  },
};

export const getFicheDiagUtilite = (ficheDiagnostic: FicheDiagnostic): UtiliteFicheProperties =>
  isFicheDiagICU(ficheDiagnostic) ? UTILITE_FICHE_DIAG_ICU : UTILITE_FICHE_DIAG_CONFORT_THERMIQUE;

const ALL_ECHELLES_SPATIALES = [
  { label: "Espace public", code: StrapiFicheDiagnosticEchelleSpatiale.EspacePublic },
  { label: "Quartier", code: StrapiFicheDiagnosticEchelleSpatiale.Quartier },
];

export const getEchelleSpatialeFromCode = (echelleSpatialeCode: string) =>
  echelleSpatialeCode ? ALL_ECHELLES_SPATIALES.find((r) => r.code === echelleSpatialeCode) : null;
