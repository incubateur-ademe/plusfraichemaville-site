import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export type SearchResult = {
  retoursExperience: RetourExperience[];
  retoursExperienceDiagnostic: RetourExperienceDiagnostic[];
  fichesSolutions: FicheSolution[];
  ficheDiagnostics: FicheDiagnostic[];
};

export type SearchableRetourExperience = RetourExperience & { regionLabel?: string | null };
