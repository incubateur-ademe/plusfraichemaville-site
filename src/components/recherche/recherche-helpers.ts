import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import { SearchableFicheSolution, SearchableRetourExperience } from "@/src/components/recherche/recherche-types";
import { selectEspaceByCode } from "@/src/helpers/type-espace-filter";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";

export const mapRexToSearchableRex = (rex: RetourExperience): SearchableRetourExperience => ({
  ...rex,
  regionLabel: getRegionLabelFromCode(rex.attributes.region?.data.attributes.code),
  typesEspace: rex.attributes.types_espaces?.map((typeEspace: string) => selectEspaceByCode(typeEspace)).join(" "),
});

export const mapFicheSolutionToSearchableFS = (ficheSolution: FicheSolution): SearchableFicheSolution => ({
  ...ficheSolution,
  typeSolution:
    getTypeSolutionFromCode(ficheSolution.attributes.type_solution)?.label || ficheSolution.attributes.type_solution,
  typesEspace: ficheSolution.attributes.types_espace
    ?.map((typeEspace: string) => selectEspaceByCode(typeEspace))
    .join(" "),
});

export const SEARCH_KEYS_REX = ["attributes.titre", "attributes.climat_actuel", "regionLabel", "typesEspace"];
export const SEARCH_KEYS_FICHE_SOLUTION = [
  "attributes.titre",
  "attributes.description_courte",
  "attributes.type_solution",
  "typesEspace",
  "typeSolution",
];
export const SEARCH_KEYS_FICHE_DIAGNOSTIC = ["attributes.titre", "attributes.nom_scientifique"];
export const SEARCH_KEYS_REX_DIAGNOSTIC = ["attributes.titre", "attributes.lieu"];
export const SEARCH_KEYS_WEBINAIRES = ["attributes.titre", "attributes.description"];
