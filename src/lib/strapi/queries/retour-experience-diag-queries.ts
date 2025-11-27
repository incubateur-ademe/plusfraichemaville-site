"use server";

import { StrapiFilter } from "@/src/lib/strapi/queries/commonStrapiFilters";
import {
  CITATION_FRAGMENT,
  CONTACT_FRAGMENT,
  IMAGE_WITH_CAPTION_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/src/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/src/lib/strapi/strapiClient";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@/src/lib/strapi/helpers/strapiArrayUtils";

import { APIResponseCollection } from "@/src/lib/strapi/types/strapi-custom-types";
import { RetourExperienceDiagnostic } from "../types/api/retour-experience-diagnostic";

const GET_RETOUR_EXPERIENCE_DIAG_STORY_DATA = (strapiFilter: StrapiFilter) => ` 
  ${STRAPI_IMAGE_FRAGMENT}
  query {
    retourExperienceDiagnostics ${strapiFilter.wholeFilterString()} {
      data {
        id
        attributes {
          titre
          lieu
          slug
          image_principale {
            ...ImageInfo
          }
        }
      }
    }
  }`;

const GET_RETOUR_EXPERIENCE_DIAG_CARD_DATA = (strapiFilter: StrapiFilter) => ` 
  ${STRAPI_IMAGE_FRAGMENT}
  query {
    retourExperienceDiagnostics ${strapiFilter.wholeFilterString()} {
      data {
        id
        attributes {
          titre
          lieu
          slug
          image_principale {
            ...ImageInfo
          }
          lien_rex_diagnostics {
            data {
              id
              attributes {
                description
                fiche_diagnostic {
                  data {
                    id
                    attributes {
                      titre
                      nom_scientifique
                      image_icone {
                        ...ImageInfo
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

const GET_RETOUR_EXPERIENCE_DIAG_COMPLETE_DATA = (strapiFilter: StrapiFilter) => ` 
  ${STRAPI_IMAGE_FRAGMENT}
  ${CITATION_FRAGMENT}
  ${CONTACT_FRAGMENT}
  ${IMAGE_WITH_CAPTION_FRAGMENT}
  query {
    retourExperienceDiagnostics ${strapiFilter.wholeFilterString()} {
      data {
        id
        attributes {
          publishedAt
          updatedAt
          titre
          lieu
          description
          slug
          image_principale {
            ...ImageInfo
          }
          citations {
            ...CitationInfo
          }
          collectivite_info
          climat_actuel
          climat_futur
          annee_realisation
          cout_description
          financements
          besoin
          resultats
          resultats_images {
            ...ImageWithCaptionInfo
          }
          points_vigilance
          apres
          lien_rex_diagnostics {
            data {
              id
              attributes {
                description
                fiche_diagnostic {
                  data {
                    id
                    attributes {
                      titre
                      nom_scientifique
                      echelle_thermique
                      slug
                      image_icone {
                        ...ImageInfo
                      }
                    }
                  }
                }
              }
            }
          }
          contacts {
            ...ContactInfo
          }
          credits
          guide_pdf {
            ...ImageInfo
          }
          resultats_images {
            ...ImageWithCaptionInfo
          }
        }
      }
    }
  }`;

export async function getRetoursExperiencesDiag(): Promise<RetourExperienceDiagnostic[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_DIAG_CARD_DATA(filter), { tag: "get-rex-diag" }))
    ?.retourExperienceDiagnostics as APIResponseCollection<RetourExperienceDiagnostic>;
  return safeReturnStrapiEntities(apiResponse);
}

export const getRetourExperienceDiagBySlug = async (slug: string): Promise<RetourExperienceDiagnostic | null> => {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_DIAG_COMPLETE_DATA(filter), { tag: `get-rex-diag-by-slug-${slug}` })
  )?.retourExperienceDiagnostics as APIResponseCollection<RetourExperienceDiagnostic>;
  return safeReturnStrapiEntity(apiResponse);
};

export async function getRetourExperienceDiagStoriesBySlugs(
  rexDiagSlugs: string[],
): Promise<RetourExperienceDiagnostic[]> {
  const filter = new StrapiFilter(true, [
    {
      attribute: "slug",
      operator: "in",
      value: rexDiagSlugs,
      relation: false,
    },
  ]);
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_DIAG_STORY_DATA(filter), {
      tag: `get-rex-diag-stories-${rexDiagSlugs.join("-")}`,
    })
  )?.retourExperienceDiagnostics as APIResponseCollection<RetourExperienceDiagnostic>;
  return safeReturnStrapiEntities(apiResponse);
}
