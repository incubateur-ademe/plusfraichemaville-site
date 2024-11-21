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
