export type MATOMO_EVENT = {
  category: string;
  action: string;
  name: string;
};

export const MATOMO_CATEGORIES = {
  ADMIN_MISSION_ACTION: "site-public",
};

export const MATOMO_ACTIONS = {
  SUBSCRIBE_WEBINAIRE: "webinaire-inscription",
};

export const WEBINAIRE_SUBSCRIPTION: MATOMO_EVENT = {
  category: MATOMO_CATEGORIES.ADMIN_MISSION_ACTION,
  action: MATOMO_ACTIONS.SUBSCRIBE_WEBINAIRE,
  name: "Clic sur le lien d'inscription à un webinaire",
};
