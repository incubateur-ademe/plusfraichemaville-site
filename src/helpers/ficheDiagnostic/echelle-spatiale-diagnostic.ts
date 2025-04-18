import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

type EchelleSpatialeDiagnostic = {
  code: string;
  label: string;
};

const ECHELLE_SPATIALE_DIAGNOSTIC_ESPACE_PUBLIC = {
  code: "espace_public",
  label: "Espace public",
};

const ECHELLE_SPATIALE_DIAGNOSTIC_COMMUNE = {
  code: "commune",
  label: "Commune",
};

export const ALL_ECHELLES_SPATIALES = [ECHELLE_SPATIALE_DIAGNOSTIC_ESPACE_PUBLIC, ECHELLE_SPATIALE_DIAGNOSTIC_COMMUNE];

export const getEchellesSpatialesByFicheDiagnostic = (
  ficheDiagnostic?: FicheDiagnostic,
): EchelleSpatialeDiagnostic[] => {
  return (
    ficheDiagnostic?.attributes.echelle_spatiale?.map(
      (codeEchelle: string) =>
        ALL_ECHELLES_SPATIALES.find((e) => e.code === codeEchelle) || ECHELLE_SPATIALE_DIAGNOSTIC_COMMUNE,
    ) || []
  );
};
