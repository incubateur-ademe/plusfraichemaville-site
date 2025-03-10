import { ficheDiagnosticRetourExperienceDiagnosticFilter } from "./commonStrapiFilters";

export const FICHE_SOLUTION_CARD_INFO_FRAGMENT = `fragment FicheSolutionCardInfo on FicheSolutionEntity {
  id
    attributes {
      titre
      type_solution
      description_courte
      image_principale {
        ...ImageInfo
      }
      cout_minimum
      cout_maximum
      cout_unite
      baisse_temperature
      portee_baisse_temperature
      libelle_avantage_solution
      delai_travaux_minimum
      delai_travaux_maximum
      types_espace
      slug
      aides_territoires_mots_cles
    }
}`;

export const REX_DIAGNOSTIC_CARD_INFO_FRAGMENT = `fragment REXFicheDiagnosticCardInfo on
RetourExperienceDiagnosticEntity {
  id
  attributes {
    titre
    lieu
    description
    slug
    image_principale {
      ...ImageInfo
    }
    contacts {
      ...ContactInfo
    }
    lien_rex_diagnostics {
      data {
      attributes  {
          fiche_diagnostic {
            data {
              id
              attributes {
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
}`;

export const FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT = `fragment FicheSolutionSmallCardInfo on FicheSolutionEntity {
  id
    attributes {
      titre
      image_principale {
        ...ImageInfo
      }
      type_solution
      slug
    }
}`;

export const FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT = `fragment FicheDiagnosticCardInfo on FicheDiagnosticEntity {
  id
    attributes {
      titre
      description_courte
      delai_min
      delai_max
      cout_min
      cout_max
      image_principale {
        ...ImageInfo
      }
      image_icone {
        ...ImageInfo
      }
      methode
      echelle
      nom_scientifique
      slug
      echelle_thermique
      objectifs {
        description
      }
      type_livrables
      echelle_spatiale
      lien_rex_diagnostics ${ficheDiagnosticRetourExperienceDiagnosticFilter()} {
        data {
          id
          attributes {
            retour_experience_diagnostic {
              data {
                ...REXFicheDiagnosticCardInfo
              }
            }
          }
        }
      }
    }
}`;

export const STRAPI_IMAGE_FRAGMENT = `fragment ImageInfo on UploadFileEntityResponse {
  data {
    attributes {
      url
      formats
      caption
    }
  }
}`;

export const RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT = `fragment RetourExperienceCardInfo on RetourExperienceEntity {
  id
    attributes {
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
export const RETOUR_EXPERIENCE_WITH_CONTACTS = `fragment RetourExperienceWithContactInfo on RetourExperienceEntity {
  id
    attributes {
      titre
      slug
      cout
      cout_euro
      location
      types_espaces
      contacts {
        id
        label
        email
        telephone
        site_internet
        type_de_contact
        sous_type_de_contact
      }
      region {
        data {
          attributes {
            code
          }
        }
      }
    }
}`;

export const CITATION_FRAGMENT = `fragment CitationInfo on ComponentCommonCitation {
  auteur
  texte
}`;

export const CONTACT_FRAGMENT = `fragment ContactInfo on ComponentRetourExperienceContact {
  id
  label
  email
  telephone
  site_internet
  type_de_contact
  sous_type_de_contact
  nom
}`;

export const IMAGE_WITH_CAPTION_FRAGMENT = `fragment ImageWithCaptionInfo on ComponentCommonImageWithCaption {
  image {
    ...ImageInfo
  }
  caption
}`;
