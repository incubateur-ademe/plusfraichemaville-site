export type MATOMO_EVENT = {
  category: string;
  action: string;
  name: string;
};

export const MATOMO_CATEGORIES = {
  SITE_PUBLIC: "site-public",
  ESPACE_PROJET: "espace-projet",
  ANNUAIRE: "annuaire",
};

export const MATOMO_ACTIONS = {
  SUBSCRIBE_WEBINAIRE: "webinaire-inscription",
  UPDATE_MATURITE: "update-maturite",
  OPEN_AGENT_BUTTON: "open-agent-button",
  SOURCING_COPY_EMAIL: "sourcing-copy-email",
  SOURCING_COPY_TELEPHONE: "sourcing-copy-telephone",
  SOURCING_DOWNLOAD_CSV: "sourcing-download-csv",
  SOURCING_SAVE_CONTACT: "sourcing-save-contact",
  SOURCING_DELETE_CONTACT: "sourcing-delete-contact",
  SOURCING_SIDE_PANEL_OPEN_REX: "sourcing-side-panel-open-rex",
  SOURCING_SIDE_PANEL_OPEN_IN_PROGRESS: "sourcing-side-panel-open-in-progress",
  SOURCING_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN: "sourcing-side-panel-view-projet-modal-open",
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

export const OPEN_ZEPHYR: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.SITE_PUBLIC,
  action: MATOMO_ACTIONS.OPEN_AGENT_BUTTON,
  name: "Ouverture de l'Agent à partir du bouton",
};

export const COPY_EMAIL: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_COPY_EMAIL,
  name: "[Annuaire] Copie de l'email d'un contact",
};

export const COPY_TELEPHONE: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_COPY_TELEPHONE,
  name: "[Annuaire] Copie du téléphone d'un contact",
};

export const SOURCING_DOWNLOAD_CSV: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_DOWNLOAD_CSV,
  name: "[Annuaire] Téléchargement du CSV des contacts",
};

export const SOURCING_SAVING_CONTACT: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_SAVE_CONTACT,
  name: "[Annuaire] Sauvegarde d'un contact",
};

export const SOURCING_DELETING_CONTACT: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_DELETE_CONTACT,
  name: "[Annuaire] Suppression d'un contact",
};

export const SOURCING_SIDE_PANEL_OPEN_REX = (name: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_SIDE_PANEL_OPEN_REX,
  name: `[Annuaire] Ouverture du pin rex : « ${name} »`,
});

export const SOURCING_SIDE_PANEL_OPEN_IN_PROGRESS = (name: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_SIDE_PANEL_OPEN_IN_PROGRESS,
  name: `[Annuaire] Ouverture du pin du projet en cours : « ${name} »`,
});

export const SOURCING_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN = (name: string): MATOMO_EVENT => ({
  category: MATOMO_CATEGORIES.ANNUAIRE,
  action: MATOMO_ACTIONS.SOURCING_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN,
  name: `[Annuaire] Ouverture de la modal de visualisation du rex : « ${name} »`,
});
