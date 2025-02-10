"use server";

import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "../helpers/strapiArrayUtils";
import { strapiGraphQLCall } from "../strapiClient";
import { StrapiFilter } from "./commonStrapiFilters";
import { FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT, STRAPI_IMAGE_FRAGMENT } from "./strapiFragments";
import { APIResponseCollection } from "@/src/lib/strapi/types/strapi-custom-types";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const GET_FICHE_DIAGNOSTIC_COMPLETE_DATA = async (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT}  ${FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT} query {
  ficheDiagnostics ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        titre
        description_courte
        description
        etapes_mise_en_oeuvre {
          titre
          description
        }
        etapes_mise_en_oeuvre {
          titre
          description
        }
        fiches_diagnostics_associees  ${strapiFilter.publicationStateString()} {
          data {
            ...FicheDiagnosticCardInfo
          }
        }
        materiel
        rank
        image_principale {
          ...ImageInfo
        }
        echelle
        methode
        slug
        besoin
        indicateurs
        delai_min
        delai_max
        cout_min
        cout_max
        explication_source
        avantage_description
        vigilance_description
        en_savoir_plus_description
        partenaire
        effets_attendus
        utilite_methode {
          description
        }
        type_livrables
        echelle_spatiale
      }
    }
  }
}`;

export const GET_FICHE_DIAGNOSTIC_CARD_DATA = async (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT}  ${FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT} query {
      ficheDiagnostics ${strapiFilter.wholeFilterString()} {
        data {
          ...FicheDiagnosticCardInfo
        }
      }
  }`;

export async function getAllFichesDiagnostic(): Promise<FicheDiagnostic[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (
    await strapiGraphQLCall(await GET_FICHE_DIAGNOSTIC_CARD_DATA(filter), { tag: "get-all-fiches-diagnostic" })
  )?.ficheDiagnostics as APIResponseCollection<FicheDiagnostic>;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getAllCompleteFichesDiagnostic(): Promise<FicheDiagnostic[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (
    await strapiGraphQLCall(await GET_FICHE_DIAGNOSTIC_COMPLETE_DATA(filter), {
      tag: "get-all-complete-fiches-diagnostic",
    })
  )?.ficheDiagnostics as APIResponseCollection<FicheDiagnostic>;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getFicheDiagnosticBySlug(slug: string): Promise<FicheDiagnostic | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (
    await strapiGraphQLCall(await GET_FICHE_DIAGNOSTIC_COMPLETE_DATA(filter), {
      tag: `get-fiche-diagnostic-by-slug-${slug}`,
    })
  )?.ficheDiagnostics as APIResponseCollection<FicheDiagnostic>;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getFicheDiagnosticById(id: string): Promise<FicheDiagnostic | null> {
  const filter = new StrapiFilter(true, [{ attribute: "id", operator: "eq", value: id, relation: false }]);
  const apiResponse = (
    await strapiGraphQLCall(await GET_FICHE_DIAGNOSTIC_COMPLETE_DATA(filter), {
      tag: `get-fiche-diagnostic-by-id-${id}`,
    })
  )?.ficheDiagnostics as APIResponseCollection<FicheDiagnostic>;

  return safeReturnStrapiEntity(apiResponse);
}
