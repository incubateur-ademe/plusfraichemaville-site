export const FICHE_SOLUTION_CARD_INFO_FRAGMENT = `fragment FicheSolutionCardInfo on FicheSolutionEntity {
  attributes {
    vuid
    titre
    type_solution
    description_courte
    image_principale {
      ...ImageInfo
    }
    cout_minimum
    cout_maximum
    baisse_temperature
    delai_travaux
    types_espace
    slug
  }
}`;

export const FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT = `fragment FicheSolutionSmallCardInfo on FicheSolutionEntity {
  attributes {
    vuid
    titre
    image_principale {
      ...ImageInfo
    }
    cout_minimum
    cout_maximum
    slug
  }
}`;

export const STRAPI_IMAGE_FRAGMENT = `fragment ImageInfo on UploadFileEntityResponse {
  data {
    attributes {
      url
      formats
    }
  }
}`;

export const RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT = `fragment RetourExperienceCardInfo on RetourExperienceEntity {
  id
    attributes {
      vuid
      titre
      climat_actuel
      climat_futur
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
    }
}`;
