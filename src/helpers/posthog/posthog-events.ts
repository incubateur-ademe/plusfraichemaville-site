export type PosthogEvent = (typeof POSTHOG_EVENTS)[keyof typeof POSTHOG_EVENTS];

export const POSTHOG_EVENTS = {
  SEE_RESULTS_DIAG_SIMPLIFIE: "voir_resultat_diag_simplifie",
  CLOSE_FICHE_DIAG_MODAL: "fermeture_fiche_diagnostic_modal",
  ADD_FICHE_SOLUTION: "ajout_fiche_solution",
  SAVE_ESTIMATION: "terminer_estimation",
  CLOSE_AIDE_MODAL: "fermeture_aide_modal",
  ANNUAIRE_CLIC_PROJET: "clic_projet_annuaire",
} as const;
