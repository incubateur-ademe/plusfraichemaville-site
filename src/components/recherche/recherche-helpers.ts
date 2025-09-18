import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import { SearchableFicheSolution, SearchableRetourExperience } from "@/src/components/recherche/recherche-types";
import { espaceCodesToEspacesSearchKeywords } from "@/src/helpers/type-espace-filter";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { getClimatLabelFromCode } from "@/src/helpers/retourExperience/climatRetourExperience";

export const mapRexToSearchableRex = (rex: RetourExperience): SearchableRetourExperience => {
  const relatedFicheSolution = rex.attributes.solution_retour_experiences.data
    .map((sol) =>
      sol?.attributes?.fiche_solution?.data
        ? mapFicheSolutionToSearchableFS(sol.attributes.fiche_solution.data, false)?.searchableKey
        : "",
    )
    .join(" ");
  return {
    ...rex,
    searchableKey: [
      rex.attributes.titre,
      getClimatLabelFromCode(rex.attributes.climat_actuel),
      getRegionLabelFromCode(rex.attributes.region?.data.attributes.code) || "",
      espaceCodesToEspacesSearchKeywords(rex.attributes.types_espaces),
      relatedFicheSolution,
    ]
      .map(normalizeText)
      .join(" "),
  };
};

export const mapFicheSolutionToSearchableFS = (
  ficheSolution: FicheSolution,
  avecTypeEspace: boolean = true,
): SearchableFicheSolution => {
  return {
    ...ficheSolution,
    searchableKey: [
      avecTypeEspace ? espaceCodesToEspacesSearchKeywords(ficheSolution.attributes.types_espace) : "",
      getTypeSolutionFromCode(ficheSolution.attributes.type_solution)?.searchKeywords,
      getTypeSolutionFromCode(ficheSolution.attributes.type_solution)?.label,
      ficheSolution.attributes.titre,
      ficheSolution.attributes.description_courte,
      ficheSolution.attributes.aides_territoires_mots_cles,
    ]
      .map(normalizeText)
      .join(" "),
  };
};

export const SEARCH_KEYS_REX = ["searchableKey"];
export const SEARCH_KEYS_FICHE_SOLUTION = [
  "searchableKey",
  // { name: "searchableKey", weight: 0.2 },
  // {name: "attributes.titre", weight: 1},
  // {name: "typesEspace", weight: 0.8},
  // "searchableKey",
  // "attributes.titre",
  // "attributes.description_courte",
  // "attributes.aides_territoires_mots_cles",
  // "typesEspace",
  // "typeSolution",
];
export const SEARCH_KEYS_FICHE_DIAGNOSTIC = ["attributes.titre", "attributes.nom_scientifique"];
export const SEARCH_KEYS_REX_DIAGNOSTIC = ["attributes.titre", "attributes.lieu"];
export const SEARCH_KEYS_WEBINAIRES = ["attributes.titre", "attributes.description"];

export const normalizeText = (text: string | undefined): string =>
  text
    ? text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll("d'", "")
        .toLowerCase()
    : "";
