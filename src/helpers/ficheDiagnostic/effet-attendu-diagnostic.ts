import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

type EffetAttenduDiagnostic = {
  code: string;
  label: string;
};

const EFFET_ATTENDU_DIAGNOSTIC_ICU = {
  code: "diminution_effet_icu",
  label: "Îlot de chaleur urbain",
};

const EFFET_ATTENDU_DIAGNOSTIC_CONFORT_THERMIQUE = {
  code: "amelioration_confort_thermique",
  label: "Confort thermique",
};

export const ALL_EFFETS_ATTENDUS = [EFFET_ATTENDU_DIAGNOSTIC_ICU, EFFET_ATTENDU_DIAGNOSTIC_CONFORT_THERMIQUE];

export const getEffetsAttendusByFicheDiagnostic = (ficheDiagnostic?: FicheDiagnostic): EffetAttenduDiagnostic[] => {
  return (
    ficheDiagnostic?.attributes.effets_attendus?.map(
      (codeEchelle: string) => ALL_EFFETS_ATTENDUS.find((e) => e.code === codeEchelle) || EFFET_ATTENDU_DIAGNOSTIC_ICU,
    ) || []
  );
};
