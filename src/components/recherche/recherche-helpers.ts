import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import {
  SearchableFicheDiagnostic,
  SearchableFicheSolution,
  SearchableRetourExperience,
  SearchableRexDiagnostic,
  SearchableWebinaire,
} from "@/src/components/recherche/recherche-types";
import { espaceCodesToEspacesSearchKeywords } from "@/src/helpers/type-espace-filter";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { getClimatLabelFromCode } from "@/src/helpers/retourExperience/climatRetourExperience";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { getEchellesThermiquesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-thermique-diagnostic";
import { getEchellesSpatialesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-spatiale-diagnostic";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { Webinaire } from "@/src/lib/strapi/types/api/webinaire";

export const mapRexDiagToSearchableRexDiag = (rexDiag: RetourExperienceDiagnostic): SearchableRexDiagnostic => ({
  ...rexDiag,
  searchableKey: [rexDiag.attributes.titre, rexDiag.attributes.lieu].map(normalizeText).join(" "),
});
export const mapWebinaireToSearchableWebinaire = (webinaire: Webinaire): SearchableWebinaire => ({
  ...webinaire,
  searchableKey: [webinaire.attributes.titre, webinaire.attributes.description].map(normalizeText).join(" "),
});

export const mapRexToSearchableRex = (rex: RetourExperience): SearchableRetourExperience => {
  const relatedFicheSolution = rex.attributes.solution_retour_experiences.data.map((sol) =>
    sol?.attributes?.fiche_solution?.data
      ? mapFicheSolutionToSearchableFS(sol.attributes.fiche_solution.data, false)?.searchableKey
      : "",
  );
  return {
    ...rex,
    searchableKey: [
      rex.attributes.titre,
      getClimatLabelFromCode(rex.attributes.climat_actuel),
      getRegionLabelFromCode(rex.attributes.region?.data.attributes.code) || "",
      espaceCodesToEspacesSearchKeywords(rex.attributes.types_espaces),
      relatedFicheSolution,
    ]
      .flat()
      .map(normalizeText)
      .join(" "),
  };
};

export const mapFicheDiagnosticToSearchableFD = (ficheDiagnostic: FicheDiagnostic): SearchableFicheDiagnostic => {
  return {
    ...ficheDiagnostic,
    searchableKey: [
      ficheDiagnostic.attributes.titre,
      ficheDiagnostic.attributes.nom_scientifique,
      getEchellesSpatialesByFicheDiagnostic(ficheDiagnostic)
        .map((es) => es.label)
        .flat(),
      getEchellesThermiquesByFicheDiagnostic(ficheDiagnostic)
        .map((et) => [et.label, et.searchKeywords])
        .flat(),
    ]
      .flat()
      .map(normalizeText)
      .join(" "),
  };
};

export const mapFicheSolutionToSearchableFS = (
  ficheSolution: FicheSolution,
  avecTypeEspace: boolean = true,
): SearchableFicheSolution => {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.attributes.type_solution);
  return {
    ...ficheSolution,
    searchableKey: [
      avecTypeEspace ? espaceCodesToEspacesSearchKeywords(ficheSolution.attributes.types_espace) : "",
      typeSolution?.searchKeywords,
      typeSolution?.label,
      ficheSolution.attributes.titre,
      ficheSolution.attributes.description_courte,
      ficheSolution.attributes.aides_territoires_mots_cles,
    ]
      .map(normalizeText)
      .join(" "),
  };
};

export const SEARCH_KEYS_REX = ["searchableKey"];
export const SEARCH_KEYS_FICHE_SOLUTION = ["searchableKey"];
export const SEARCH_KEYS_FICHE_DIAGNOSTIC = ["searchableKey"];
export const SEARCH_KEYS_REX_DIAGNOSTIC = ["searchableKey"];
export const SEARCH_KEYS_WEBINAIRES = ["searchableKey"];

export const normalizeText = (text: string | undefined): string =>
  text
    ? text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll("canicule", "canicule vague de chaleur")
        .toLowerCase()
    : "";
