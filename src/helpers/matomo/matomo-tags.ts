export type MATOMO_EVENT = {
  category: string;
  action: string;
  name: string;
};

export const MATOMO_CATEGORIES = {
  SITE_PUBLIC: "site-public",
  ESPACE_PROJET: "espace-projet",
  ANNUAIRE: "annuaire",
  DIAGNOSTIC: "module-diagnostic",
};

export const MATOMO_ACTIONS = {
  AIDE_DECISION_BREADCRUMB: "aide-decision-fil-ariane",
  SITE_VITRINE_BREADCRUMB: "site-vitrine-fil-ariane",
  SITE_VITRINE_REX_DIAG_STORY: "rex-diag-story",
  SITE_VITRINE_BOOKMARK: "site-vitrine-bookmark-fiche",
  SURCHAUFFE_URBAINE_COMPRENDRE: "surchauffe-urbaine-notions",
  SURCHAUFFE_URBAINE_TIMING: "surchauffe-urbaine-timing",
  SUBSCRIBE_WEBINAIRE: "webinaire-inscription",
  UPDATE_MATURITE: "update-maturite",
  OPEN_AGENT_BUTTON: "open-agent-button",
  ANNUAIRE_COPY_EMAIL: "annuaire-copy-email",
  ANNUAIRE_COPY_TELEPHONE: "annuaire-copy-telephone",
  ANNUAIRE_DOWNLOAD_CSV: "annuaire-download-csv",
  ANNUAIRE_SAVE_CONTACT: "annuaire-save-contact",
  ANNUAIRE_DELETE_CONTACT: "annuaire-delete-contact",
  ANNUAIRE_SIDE_PANEL_OPEN_REX: "annuaire-side-panel-open-rex",
  ANNUAIRE_SIDE_PANEL_OPEN_IN_PROGRESS: "annuaire-side-panel-open-in-progress",
  ANNUAIRE_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN: "annuaire-side-panel-view-projet-modal-open",
  DIAGNOSTIC_DOWNLOAD_RESULT: "diagnostic-result-download",
  DIAGNOSTIC_COMPUTE_RESULT: "diagnostic-compute-result",
  SURCHAUFFE_TERRITOIRE_SEARCH: "surchauffe-urbaine-search-territoire",
  FICHE_SOLUTION_CLICK_ONGLET: "fiche-solution-change-onglet",
};

export const WEBINAIRE_SUBSCRIPTION: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.SUBSCRIBE_WEBINAIRE,
  name: "Clic sur le lien d'inscription à un webinaire",
};

export const UPDATE_MATURITE: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ESPACE_PROJET,
  action: MATOMO_ACTIONS.UPDATE_MATURITE,
  name: "Changment de maturité via l'icone",
};

export const COPY_EMAIL: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_COPY_EMAIL,
  name: "[Annuaire] Copie de l'email d'un contact",
};

export const COPY_TELEPHONE: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_COPY_TELEPHONE,
  name: "[Annuaire] Copie du téléphone d'un contact",
};

export const ANNUAIRE_DOWNLOAD_CSV: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_DOWNLOAD_CSV,
  name: "[Annuaire] Téléchargement du CSV des contacts",
};

export const ANNUAIRE_SAVING_CONTACT: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_SAVE_CONTACT,
  name: "[Annuaire] Sauvegarde d'un contact",
};

export const ANNUAIRE_DELETING_CONTACT: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_DELETE_CONTACT,
  name: "[Annuaire] Suppression d'un contact",
};

export const ANNUAIRE_SIDE_PANEL_OPEN_REX = (name: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_SIDE_PANEL_OPEN_REX,
  name: `[Annuaire] Ouverture du pin rex : « ${name} »`,
});

export const ANNUAIRE_SIDE_PANEL_OPEN_IN_PROGRESS = (name: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_SIDE_PANEL_OPEN_IN_PROGRESS,
  name: `[Annuaire] Ouverture du pin du projet en cours : « ${name} »`,
});

export const ANNUAIRE_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN = (name: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.ANNUAIRE_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN,
  name: `[Annuaire] Ouverture de la modal de visualisation du rex : « ${name} »`,
});

export const AIDE_DECISION_BREADCRUMB_FIL_ARIANE = (currentPage: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.AIDE_DECISION_BREADCRUMB,
  name: `[Fil Ariane aide décision] Clic à partir de la page : « ${currentPage} »`,
});

export const SITE_VITRINE_BREADCRUMB_FIL_ARIANE = (currentPage: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.SITE_VITRINE_BREADCRUMB,
  name: `[Fil Ariane site vitrine] Clic à partir de la page : « ${currentPage} »`,
});

export const SITE_VITRINE_REX_DIAG_STORY = (rexDiagSlug: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.SITE_VITRINE_REX_DIAG_STORY,
  name: `Clic sur une story de rex Diag : « ${rexDiagSlug} »`,
});

export const SURCHAUFFE_URBAINE_CHANGE_NOTION = (notion: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.SURCHAUFFE_URBAINE_COMPRENDRE,
  name: `Clic pour changer de notion : « ${notion} »`,
});

export const SURCHAUFFE_URBAINE_CHANGE_TIMING = (index: number): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.SURCHAUFFE_URBAINE_TIMING,
  name: `Clic pour changer de niveau d'action : « ${index} »`,
});

export const SURCHAUFFE_URBAINE_TERRITOIRE_SEARCH = (codeInsee: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.SURCHAUFFE_TERRITOIRE_SEARCH,
  name: `Recherche du code INSEE : « ${codeInsee} »`,
});

export const DIAGNOSTIC_DOWNLOAD_RESULT = {
  category: MATOMO_CATEGORIES.DIAGNOSTIC,
  action: MATOMO_ACTIONS.DIAGNOSTIC_DOWNLOAD_RESULT,
  name: "Téléchargement pdf des résultats de l'analyse simplifiée",
};

export const DIAGNOSTIC_COMPUTE_RESULT = {
  category: MATOMO_CATEGORIES.DIAGNOSTIC,
  action: MATOMO_ACTIONS.DIAGNOSTIC_COMPUTE_RESULT,
  name: "Calcul des indicateurs de l'analyse simplifiée",
};

export const SITE_VITRINE_BOOKMARK_FICHE = {
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.SITE_VITRINE_BOOKMARK,
  name: "Sauvegarde d'une fiche à partir du site vitrine",
};

export const ESPACE_PROJET_BOOKMARK_FICHE = {
  category: MATOMO_CATEGORIES.ESPACE_PROJET,
  action: MATOMO_ACTIONS.SITE_VITRINE_BOOKMARK,
  name: "Sauvegarde d'une fiche à partir de l'espace projet",
};

export const FICHE_SOLUTION_CLIC_ONGLET = (onglet: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.FICHE_SOLUTION_CLICK_ONGLET,
  name: `Clic sur l'onglet ${onglet}`,
});
