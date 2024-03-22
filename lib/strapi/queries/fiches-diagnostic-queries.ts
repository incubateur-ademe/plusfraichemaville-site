import { FicheDiagnosticResponse, FichesDiagnosticResponse } from "./../../../components/fiches-diagnostic/types";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "../helpers/strapiArrayUtils";
import { strapiGraphQLCall } from "../strapiClient";
import { APIResponseCollection } from "../types/types";
import { StrapiFilter } from "./commonStrapiFilters";
import { FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT, STRAPI_IMAGE_FRAGMENT } from "./strapiFragments";

export const GET_FICHE_DIAGNOSTIC_COMPLETE_DATA = (
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
      }
    }
  }
}`;

export const GET_FICHE_DIAGNOSTIC_CARD_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT}  ${FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT} query {
      ficheDiagnostics ${strapiFilter.wholeFilterString()} {
        data {
          ...FicheDiagnosticCardInfo
        }
      }
  }`;

export async function getAllFichesDiagnostic(): Promise<FichesDiagnosticResponse> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_DIAGNOSTIC_CARD_DATA(filter)))
    ?.ficheDiagnostics as APIResponseCollection<"api::fiche-diagnostic.fiche-diagnostic">;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getFicheDiagnosticBySlug(slug: string): Promise<FicheDiagnosticResponse | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_DIAGNOSTIC_COMPLETE_DATA(filter)))
    ?.ficheDiagnostics as APIResponseCollection<"api::fiche-diagnostic.fiche-diagnostic">;
  return safeReturnStrapiEntity(apiResponse);
}
