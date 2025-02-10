import { EchelleSpatiale, FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
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
    separator: string;
    picto: string;
  };
};

export const UTILITE_FICHE_DIAG_ICU: UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite.DiminutionICU,
  colors: {
    bgDark: "bg-background-fiche-diag-icu",
    bgLight: "bg-background-diag-icu",
    border: "!border-background-fiche-diag-icu",
    separator: "!bg-fiche-diag-icu",
    picto: "!text-fiche-diag-icu",
    text: "!text-black",
  },
};

export const UTILITE_FICHE_DIAG_CONFORT_THERMIQUE: UtiliteFicheProperties = {
  type: FicheDiagnosticUtilite.ConfortThermique,
  colors: {
    bgDark: "!bg-background-fiche-confort-thermique",
    bgLight: "!bg-background-confort-thermique",
    border: "!border-[#E9B16C]",
    separator: "!bg-[#E9B16C]",
    picto: "!text-[#FC5D00]",
    text: "!text-black",
  },
};

export const getFicheDiagUtilite = (ficheDiagnostic: FicheDiagnostic): UtiliteFicheProperties =>
  isFicheDiagICU(ficheDiagnostic) ? UTILITE_FICHE_DIAG_ICU : UTILITE_FICHE_DIAG_CONFORT_THERMIQUE;

export const getFicheDiagUtiliteProperties = (utilite?: FicheDiagnosticUtilite): UtiliteFicheProperties =>
  utilite === FicheDiagnosticUtilite.DiminutionICU ? UTILITE_FICHE_DIAG_ICU : UTILITE_FICHE_DIAG_CONFORT_THERMIQUE;

const ALL_ECHELLES_SPATIALES = [
  { label: "Espace public", code: EchelleSpatiale.EspacePublic },
  { label: "Quartier", code: EchelleSpatiale.Quartier },
];

export const getEchelleSpatialeFromCode = (echelleSpatialeCode: string) =>
  echelleSpatialeCode ? ALL_ECHELLES_SPATIALES.find((r) => r.code === echelleSpatialeCode) : null;
