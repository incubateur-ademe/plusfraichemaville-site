import { StrapiFicheDiagnosticEchelleSpatiale } from "@/src/lib/strapi/types/strapi-custom-types";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const ALL_ECHELLES_SPATIALES = [
  { label: "Quartier", code: StrapiFicheDiagnosticEchelleSpatiale.Quartier },
  { label: "Espace public", code: StrapiFicheDiagnosticEchelleSpatiale.EspacePublic, icon: "echelle-espace" },
];

export const getEchelleSpatialeLabel = (ficheDiagnostic?: FicheDiagnostic) => {
  return (
    ficheDiagnostic?.attributes.echelle_spatiale
      // @ts-ignore
      .map((codeEchelle) => ALL_ECHELLES_SPATIALES.find((e) => e.code === codeEchelle)?.label)
      .join(", ")
  );
};
