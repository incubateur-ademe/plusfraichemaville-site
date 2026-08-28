import { ficheDiagnosticRetourExperienceDiagnosticFilter } from "./commonStrapiFilters";

// Strapi v5 GraphQL responses are flat: no more `Entity`/`data`/`attributes` wrappers, relations and
// media fields resolve directly to their type. See https://docs.strapi.io/cms/api/graphql.
// Content-type ("document") entities no longer expose a numeric `id` field over GraphQL — only
// `documentId` (string). Components (embedded, non-versioned sub-objects) are unaffected and keep `id`.

export const FICHE_SOLUTION_CARD_INFO_FRAGMENT = `fragment FicheSolutionCardInfo on FicheSolution {
  documentId
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
}`;

export const REX_DIAGNOSTIC_CARD_INFO_FRAGMENT = `fragment REXFicheDiagnosticCardInfo on
RetourExperienceDiagnostic {
  documentId
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
    documentId
    fiche_diagnostic {
      documentId
      nom_scientifique
      image_icone {
        ...ImageInfo
      }
    }
  }
}`;

export const FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT = `fragment FicheSolutionSmallCardInfo on FicheSolution {
  documentId
  titre
  image_principale {
    ...ImageInfo
  }
  type_solution
  slug
}`;

export const FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT = `fragment FicheDiagnosticCardInfo on FicheDiagnostic {
  documentId
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
    documentId
    retour_experience_diagnostic {
      ...REXFicheDiagnosticCardInfo
    }
  }
}`;

export const STRAPI_IMAGE_FRAGMENT = `fragment ImageInfo on UploadFile {
  url
  formats
  caption
}`;

export const SEARCHABLE_REX_PROJET_FRAGMENT = `fragment SearchableRexInfo on RetourExperience {
  ...RetourExperienceCardInfo
  titre
  solution_retour_experiences {
    documentId
    titre
    description
    image {
      ...ImageInfo
    }
    fiche_solution {
      documentId
      titre
      description_courte
      types_espace
      type_solution
      aides_territoires_mots_cles
    }
  }
}`;
export const RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT = `fragment RetourExperienceCardInfo on RetourExperience {
  documentId
  titre
  climat_actuel
  climat_futur
  slug
  types_espaces
  region {
    code
  }
  image_principale {
    ...ImageInfo
  }
}`;
export const RETOUR_EXPERIENCE_WITH_CONTACTS = `fragment RetourExperienceWithContactInfo on RetourExperience {
  documentId
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
    code
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
