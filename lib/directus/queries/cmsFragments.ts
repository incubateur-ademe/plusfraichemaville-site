export const FICHE_SOLUTION_CARD_INFO_FRAGMENT = `fragment FicheSolutionCardInfo on fiche_solution {
  id
  titre
  description_courte
  image_principale
  type_solution
  baisse_temperature
  delai_travaux
  cout_minimum
  cout_maximum
  slug
}`;

export const FICHE_SOLUTION_SMALL_CARD_INFO_FRAGMENT = `fragment FicheSolutionSmallCardInfo on fiche_solution {
  titre
  image_principale
  cout_minimum
  cout_maximum
  slug
}`;

export const RETOUR_EXPERIENCE_CARD_INFO_FRAGMENT = `fragment RetourExperienceCardInfo on retour_experience {
  id
  titre
  image_principale
  climat_actuel
  climat_futur
  types_espace
  region
  slug
}`;
