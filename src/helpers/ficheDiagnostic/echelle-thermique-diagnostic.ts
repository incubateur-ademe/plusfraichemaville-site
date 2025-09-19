import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export type EchelleThermiqueDiagnostic = {
  code: string;
  label: string;
  searchKeywords?: string;
};

export const ECHELLE_THERMIQUE_DIAG_ICU = {
  code: "ilot_chaleur_urbain",
  label: "Îlot de chaleur urbain",
};

export const ECHELLE_THERMIQUE_DIAG_CONFORT_THERMIQUE = {
  code: "confort_thermique",
  label: "Confort thermique",
  searchKeywords: "plan canicule",
};

export const ALL_ECHELLES_THERMIQUES = [ECHELLE_THERMIQUE_DIAG_ICU, ECHELLE_THERMIQUE_DIAG_CONFORT_THERMIQUE];

export const getEchellesThermiquesByFicheDiagnostic = (
  ficheDiagnostic?: FicheDiagnostic,
): EchelleThermiqueDiagnostic[] => {
  return (
    ficheDiagnostic?.attributes.echelle_thermique?.map(
      (codeEchelle: string) =>
        ALL_ECHELLES_THERMIQUES.find((e) => e.code === codeEchelle) || ECHELLE_THERMIQUE_DIAG_ICU,
    ) || []
  );
};
