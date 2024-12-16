import { getAllCompleteFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { writeFileSync } from "node:fs";
import { getAllCompleteRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { getClimatLabelFromCode } from "@/src/helpers/retourExperience/climatRetourExperience";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { getAllCompleteFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { getTemporaliteLabelFromCode } from "@/src/helpers/retourExperience/temporaliteRetourExperience";
import { selectEspaceByCode } from "@/src/helpers/type-espace-filter";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

type RagTimeFicheDiagnostic = {
  id: number;
  titre: string;
  description_courte: string;
  cout_min?: number;
  cout_max?: number;
  delai_min?: number;
  delai_max?: number;
  description: string;
  besoin?: string;
  indicateurs?: string;
  avantage: string;
  points_vigilance: string;
  etapes_mise_en_oeuvre: string;
  slug: string;
  link: string;
};

type RagTimeFicheSolution = {
  id: number;
  titre: string;
  description_courte: string;
  rafraichissement_attendu: string;
  etapes_mises_en_oeuvre: string;
  etapes_diagnostic: string;
  etapes_entretien: string;
  point_vigilance: string;
  description: string;
  materiaux: string;
  cobenefices: string;
  contexte_description: string;
  types_espace: string[];
  type_solution: string;
  cout_minimum: number | undefined;
  cout_maximum: number | undefined;
  cout_unite: string;
  cout_minimum_entretien: number | undefined;
  cout_maximum_entretien: number | undefined;
  cout_entretien_unite: string;
  baisse_temperature: number | undefined;
  delai_travaux_minimum: number | undefined;
  delai_travaux_maximum: number | undefined;
  slug: string;
  link: string;
};

type RagTimeRetourExperience = {
  id: number;
  titre: string;
  situation_apres: string;
  solutions: string;
  description: string;
  difficultes: string;
  region: string;
  types_solutions: string[];
  climat_actuel: string;
  climat_futur: string;
  echelle: string;
  temporalite: string;
  cout: string;
  types_espace: string[];
  slug: string;
  link: string;
};

const strapiRetourExperienceToRagtime = (strapiRetourExperience: RetourExperience): RagTimeRetourExperience => {
  const strapiRetourExperienceAttributes = strapiRetourExperience.attributes;
  return {
    id: strapiRetourExperience.id,
    titre: strapiRetourExperienceAttributes.titre,
    description: strapiRetourExperienceAttributes.description,
    difficultes: strapiRetourExperienceAttributes.difficultes ?? "",
    situation_apres: strapiRetourExperienceAttributes.situation_apres?.description ?? "",
    solutions:
      strapiRetourExperienceAttributes.solution_retour_experiences?.data
        .map((sol) => `${sol.attributes.titre} ${sol.attributes.description}`)
        .join(" | ") ?? "",
    temporalite: getTemporaliteLabelFromCode(strapiRetourExperienceAttributes.temporalite) ?? "",
    echelle: strapiRetourExperienceAttributes.echelle ?? "",
    region: getRegionLabelFromCode(strapiRetourExperienceAttributes.region?.data.attributes.code) ?? "",
    climat_actuel: getClimatLabelFromCode(strapiRetourExperienceAttributes.climat_actuel) ?? "",
    cout: strapiRetourExperienceAttributes.cout ?? "",
    climat_futur: getClimatLabelFromCode(strapiRetourExperienceAttributes.climat_futur) ?? "",
    // @ts-ignore
    types_espace: strapiRetourExperienceAttributes.types_espaces?.map(selectEspaceByCode) ?? [],
    // @ts-ignore
    types_solutions: strapiRetourExperienceAttributes.types_solutions,
    slug: strapiRetourExperienceAttributes.slug,
    link: `https://plusfraichemaville.fr/projet/${strapiRetourExperienceAttributes.slug}`,
  };
};

const strapiFicheSolutionToRagtime = (strapiFicheSolution: FicheSolution): RagTimeFicheSolution => {
  const strapiFicheSolutionAttributes = strapiFicheSolution.attributes;
  return {
    id: strapiFicheSolution.id,
    titre: strapiFicheSolutionAttributes.titre,
    description_courte: strapiFicheSolutionAttributes.description_courte,
    rafraichissement_attendu: strapiFicheSolutionAttributes.rafraichissement_attendu_description ?? "",
    etapes_mises_en_oeuvre:
      strapiFicheSolutionAttributes.etapes_mise_en_oeuvre
        ?.map((etapeMeo) => `${etapeMeo.titre} - ${etapeMeo.description}`)
        .join(" | ") ?? "",
    etapes_diagnostic:
      strapiFicheSolutionAttributes.etapes_diagnostic
        ?.map((etape) => `${etape.titre} - ${etape.description}`)
        .join(" | ") ?? "",
    etapes_entretien:
      strapiFicheSolutionAttributes.etapes_entretien
        ?.map((etape) => `${etape.titre} - ${etape.description}`)
        .join(" | ") ?? "",
    point_vigilance: strapiFicheSolutionAttributes.point_vigilance ?? "",
    description: strapiFicheSolutionAttributes.description,
    materiaux:
      strapiFicheSolutionAttributes.materiaux?.data
        .map((materiau) => `${materiau.attributes.titre} - ${materiau.attributes.description}`)
        .join(" | ") ?? "",
    cobenefices:
      strapiFicheSolutionAttributes.cobenefices?.data
        .map((cobenefice) => cobenefice.attributes.description)
        .join(" | ") ?? "",
    contexte_description: strapiFicheSolutionAttributes.contexte_description,
    // @ts-ignore
    types_espace: strapiFicheSolutionAttributes.types_espace?.map(selectEspaceByCode) ?? [],
    type_solution: strapiFicheSolutionAttributes.type_solution ?? "",
    cout_minimum: strapiFicheSolutionAttributes.cout_minimum,
    cout_maximum: strapiFicheSolutionAttributes.cout_maximum,
    cout_unite: getUniteCoutFromCode(strapiFicheSolutionAttributes.cout_unite).unitLabel,
    cout_minimum_entretien: strapiFicheSolutionAttributes.cout_minimum_entretien,
    cout_maximum_entretien: strapiFicheSolutionAttributes.cout_maximum_entretien,
    cout_entretien_unite: getUniteCoutFromCode(strapiFicheSolutionAttributes.cout_entretien_unite).unitLabel,
    baisse_temperature: strapiFicheSolutionAttributes.baisse_temperature,
    delai_travaux_minimum: strapiFicheSolutionAttributes.delai_travaux_minimum,
    delai_travaux_maximum: strapiFicheSolutionAttributes.delai_travaux_maximum,
    slug: strapiFicheSolutionAttributes.slug,
    link: `https://plusfraichemaville.fr/fiche-solution/${strapiFicheSolutionAttributes.slug}`,
  };
};

const strapiFicheDiagnosticToRagtime = (strapiFicheDiagnostic: FicheDiagnostic): RagTimeFicheDiagnostic => {
  const strapiFicheDiagAttributes = strapiFicheDiagnostic.attributes;
  return {
    id: strapiFicheDiagnostic.id,
    titre: strapiFicheDiagAttributes.titre,
    description: strapiFicheDiagAttributes.description,
    description_courte: strapiFicheDiagAttributes.description_courte,
    besoin: strapiFicheDiagAttributes.besoin,
    avantage: strapiFicheDiagAttributes.avantage_description,
    indicateurs: strapiFicheDiagAttributes.indicateurs,
    points_vigilance: strapiFicheDiagAttributes.vigilance_description,
    etapes_mise_en_oeuvre:
      strapiFicheDiagAttributes.etapes_mise_en_oeuvre
        ?.map((etapeMeo) => `${etapeMeo.titre} - ${etapeMeo.description}`)
        .join(" | ") ?? "",

    cout_max: strapiFicheDiagAttributes.cout_max,
    cout_min: strapiFicheDiagAttributes.cout_min,
    delai_min: strapiFicheDiagAttributes.delai_min,
    delai_max: strapiFicheDiagAttributes.delai_max,
    slug: strapiFicheDiagAttributes.slug,
    link: `https://plusfraichemaville.fr/fiches-diagnostic/${strapiFicheDiagAttributes.slug}`,
  };
};

async function main() {
  const fichesSolution = await getAllCompleteFichesSolutions();

  writeFileSync(
    "./scripts/ficheSolution.json",
    JSON.stringify(fichesSolution.map(strapiFicheSolutionToRagtime), null, 2),
    {
      flag: "w",
    },
  );
  const fichesDiagnostic = await getAllCompleteFichesDiagnostic();

  writeFileSync(
    "./scripts/ficheDiagnostic.json",
    JSON.stringify(fichesDiagnostic.map(strapiFicheDiagnosticToRagtime), null, 2),
    {
      flag: "w",
    },
  );
  const retoursExperience = await getAllCompleteRetoursExperiences();
  writeFileSync(
    "./scripts/retourExperience.json",
    JSON.stringify(retoursExperience.map(strapiRetourExperienceToRagtime), null, 2),
    {
      flag: "w",
    },
  );
}

main();
