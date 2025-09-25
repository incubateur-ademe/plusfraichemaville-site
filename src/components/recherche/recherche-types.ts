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

export type SearchableRetourExperience = RetourExperience & SearchableItem;
export type SearchableFicheSolution = FicheSolution & SearchableItem;
export type SearchableFicheDiagnostic = FicheDiagnostic & SearchableItem;
export type SearchableRexDiagnostic = RetourExperienceDiagnostic & SearchableItem;
export type SearchableWebinaire = Webinaire & SearchableItem;

type SearchableItem = {
  searchableKey: string;
};
