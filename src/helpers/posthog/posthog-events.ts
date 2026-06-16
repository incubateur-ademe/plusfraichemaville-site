export type PosthogEvent = (typeof POSTHOG_EVENTS)[keyof typeof POSTHOG_EVENTS];

export const POSTHOG_EVENTS = {
  SEE_RESULTS_DIAG_SIMPLIFIE: "see-results-diag-simplifie",
  CLOSE_FICHE_DIAG_MODAL: "close-fiche-diag-modal",
  ADD_FICHE_SOLUTION: "add-fiche-solution",
  SAVE_ESTIMATION: "save-estimation",
  CLOSE_AIDE_MODAL: "close-aide-modal",
  ANNUAIRE_CLIC_PROJET: "click-projet-annuaire",
} as const;
