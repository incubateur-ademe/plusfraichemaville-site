"use server";
import { solutionRetourExperienceFilter, StrapiFilter } from "@/src/lib/strapi/queries/commonStrapiFilters";
import {
  FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT,
  RETOUR_EXPERIENCE_WITH_CONTACTS,
  SEARCHABLE_REX_PROJET_FRAGMENT,
  STRAPI_IMAGE_FRAGMENT,
} from "@/src/lib/strapi/queries/strapiFragments";
import { strapiGraphQLCall } from "@/src/lib/strapi/strapiClient";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@/src/lib/strapi/helpers/strapiArrayUtils";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { APIResponseCollection } from "@/src/lib/strapi/types/strapi-custom-types";

const GET_RETOUR_EXPERIENCE_COMPLETE_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT}
${FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT} query {
  retourExperiences ${strapiFilter.wholeFilterString()} {
    data {
      id
      attributes {
        titre
        description
        slug
        types_espaces
        region {
          data {
            attributes {
              code
            }
          }
        }
        image_principale {
          ...ImageInfo
        }
        citations {
          auteur
          texte
        }
        situation_avant {
          description
          image {
            ...ImageInfo
          }
        }
        situation_apres {
          description
          image {
            ...ImageInfo
          }
        }
        solution_retour_experiences ${solutionRetourExperienceFilter()} {
          data {
            id
            attributes {
              titre
              description
              image {
                ...ImageInfo
              }
              fiche_solution {
                data {
                  ...FicheSolutionSmallCardInfo
                }
              }
            }
          }
        }
        calendrier {
          id
          titre
          date
          description
        }
        financement
        difficultes
        partenaires
        ressources
        credits
        types_solutions
        echelle
        temporalite
        climat_actuel
        climat_futur
        cout
        porteur
        contact
        odds {
          data {
            attributes {
              numero
            }
          }
        }
        retour_experiences ${strapiFilter.publicationStateString()} {
          data {
            ...RetourExperienceCardInfo
          }
        }
      }
    }
  }
}`;

const GET_RETOUR_EXPERIENCE_CARD_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT} query {
    retourExperiences ${strapiFilter.wholeFilterString()} {
      data {
        ...RetourExperienceCardInfo
      }
    }
}`;

const GET_SEARCHABLE_RETOUR_EXPERIENCE_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT} ${RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT} ${SEARCHABLE_REX_PROJET_FRAGMENT} query {
    retourExperiences ${strapiFilter.wholeFilterString()} {
      data {
        ...SearchableRexInfo
      }
    }
}`;

const GET_RETOUR_EXPERIENCE_FOR_AQUAGIR_DATA = (strapiFilter: StrapiFilter) => ` ${STRAPI_IMAGE_FRAGMENT} query {
    retourExperiences ${strapiFilter.wholeFilterString()} {
      data {
        id
        attributes {
          titre
          description
          slug
          location
          citations {
            auteur
            texte
          }
          situation_avant {
            description
          }
          situation_apres {
            description
          }
          solution_retour_experiences {
            data {
              id
              attributes {
                titre
                description
              }
            }
          }
          partenaires
          credits
          publishedAt
          image_principale {
            ...ImageInfo
          }
        }
      }
    }
}`;

const GET_RETOUR_EXPERIENCE_CARD_DATA_WITH_CONTACTS = (
  strapiFilter: StrapiFilter,
) => ` ${RETOUR_EXPERIENCE_WITH_CONTACTS} query {
    retourExperiences ${strapiFilter.wholeFilterString()} {
      data {
        ...RetourExperienceWithContactInfo
      }
    }
}`;

export async function getRetourExperienceBySlug(slug: string): Promise<RetourExperience | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_COMPLETE_DATA(filter), { tag: `get-rex-by-slug-${slug}` })
  )?.retourExperiences as APIResponseCollection<RetourExperience>;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getRetoursExperiences(): Promise<RetourExperience[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_CARD_DATA(filter), { tag: "get-rex" }))
    ?.retourExperiences as APIResponseCollection<RetourExperience>;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getSearchableRetoursExperiences(): Promise<RetourExperience[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (
    await strapiGraphQLCall(GET_SEARCHABLE_RETOUR_EXPERIENCE_DATA(filter), { tag: "get-searchable-rex" })
  )?.retourExperiences as APIResponseCollection<RetourExperience>;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getRetoursExperiencesWithContacts(): Promise<RetourExperience[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_CARD_DATA_WITH_CONTACTS(filter), { tag: "get-rex-with-contacts" })
  )?.retourExperiences as APIResponseCollection<RetourExperience>;
  return safeReturnStrapiEntities(apiResponse);
}

export async function getRetoursExperiencesWithContactsById(id: string): Promise<RetourExperience | null> {
  const filter = new StrapiFilter(true, [{ attribute: "id", operator: "eq", value: id, relation: false }]);
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_CARD_DATA_WITH_CONTACTS(filter), {
      tag: `get-rex-with-contacts-${id}`,
    })
  )?.retourExperiences as APIResponseCollection<RetourExperience>;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getAquagirRetoursExperiences(): Promise<RetourExperience[] | null> {
  const filter = new StrapiFilter(
    true,
    [
      {
        attribute: "export_aquagir",
        value: true,
        operator: "eq",
        relation: false,
      },
    ],
    { attribute: "rank", order: "asc" },
  );
  const apiResponse = (
    await strapiGraphQLCall(GET_RETOUR_EXPERIENCE_FOR_AQUAGIR_DATA(filter), { tag: "get-rex-aquagir" })
  )?.retourExperiences as APIResponseCollection<RetourExperience>;
  return safeReturnStrapiEntities(apiResponse);
}
