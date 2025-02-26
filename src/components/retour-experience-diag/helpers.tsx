import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const getFicheDiagImage = (ficheDiagnostic: FicheDiagnostic) => {
  const { attributes } = ficheDiagnostic;
  const isICU = attributes.utilite_methode?.some((utilite) => utilite?.description === "Diminution de l'ICU") ?? false;
  return isICU ? attributes.image_diag_icu : attributes.image_confort_thermique;
};
