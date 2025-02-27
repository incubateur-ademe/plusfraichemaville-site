import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { isFicheDiagICU } from "../fiches-diagnostic/helpers";

export const getFicheDiagImage = (ficheDiagnostic: FicheDiagnostic) =>
  isFicheDiagICU(ficheDiagnostic)
    ? ficheDiagnostic.attributes.image_diag_icu
    : ficheDiagnostic.attributes.image_confort_thermique;
