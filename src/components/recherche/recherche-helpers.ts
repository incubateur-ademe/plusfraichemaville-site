import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import { SearchableRetourExperience } from "@/src/components/recherche/recherche-types";

export const mapRexToSearchableRex = (rex: RetourExperience): SearchableRetourExperience => ({
  ...rex,
  regionLabel: getRegionLabelFromCode(rex.attributes.region?.data.attributes.code),
});

export const SEARCH_KEYS_REX = ["attributes.titre", "attributes.climat_actuel", "regionLabel"];
export const SEARCH_KEYS_FICHE_SOLUTION = ["attributes.titre", "attributes.description_courte", "type_solution"];
export const SEARCH_KEYS_FICHE_DIAGNOSTIC = ["attributes.titre", "attributes.nom_scientifique"];
export const SEARCH_KEYS_REX_DIAGNOSTIC = ["attributes.titre", "attributes.lieu"];
