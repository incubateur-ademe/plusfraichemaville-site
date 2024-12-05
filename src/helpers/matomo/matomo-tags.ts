export type MATOMO_EVENT = {
  category: string;
  action: string;
  name: string;
};

export const MATOMO_CATEGORIES = {
  SITE_PUBLIC: "site-public",
  ESPACE_PROJET: "espace-projet",
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
  category: MATOMO_CATEGORIES.ESPACE_PROJET,
  action: MATOMO_ACTIONS.SOURCING_COPY_EMAIL,
  name: "Copie de l'email d'un contact (sourcing)",
};

export const COPY_TELEPHONE: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ESPACE_PROJET,
  action: MATOMO_ACTIONS.SOURCING_COPY_TELEPHONE,
  name: "Copie du téléphone d'un contact (sourcing)",
};

export const SOURCING_DOWNLOAD_CSV: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ESPACE_PROJET,
  action: MATOMO_ACTIONS.SOURCING_DOWNLOAD_CSV,
  name: "Téléchargement du CSV des contacts (sourcing)",
};

export const SOURCING_SAVING_CONTACT: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ESPACE_PROJET,
  action: MATOMO_ACTIONS.SOURCING_SAVE_CONTACT,
  name: "Sauvegarde d'un contact (sourcing)",
};

export const SOURCING_DELETING_CONTACT: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ESPACE_PROJET,
  action: MATOMO_ACTIONS.SOURCING_DELETE_CONTACT,
  name: "Suppression d'un contact (sourcing)",
};
