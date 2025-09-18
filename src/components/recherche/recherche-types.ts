import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { Webinaire } from "@/src/lib/strapi/types/api/webinaire";

export type SearchResult = {
  retoursExperience: RetourExperience[];
  retoursExperienceDiagnostic: RetourExperienceDiagnostic[];
  fichesSolutions: FicheSolution[];
  ficheDiagnostics: FicheDiagnostic[];
  webinaires: Webinaire[];
};

export type SearchableRetourExperience = RetourExperience & {
  searchableKey?: string;
};
export type SearchableFicheSolution = FicheSolution & {
  searchableKey?: string;
};
