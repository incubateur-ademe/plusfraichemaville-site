export const PFMV_ROUTES = {
  AIDE_DECISION: "/aide-decision",
  FICHES_SOLUTIONS: "/fiche-solution",
  RETOURS_EXPERIENCE: "/projet",
  CONNEXION: "/connexion",
  DECONNEXION: "/logout",
  DECONNEXION_AGENT_CONNECT: "/logout/agentconnect",
  ESPACE_PROJET: "/espace-projet",
  INFO_PROJET: "/espace-projet/info-projet",
  LISTE_PROJETS: "/espace-projet/liste-projets",
};

export const PFMV_ROUTES_API = {
  SEED_DUMMY_DATA: "/api/seed-dummy-data",
  DELETE_PROJET: "/api/delete-projet",
};

type FetchURLType = keyof typeof PFMV_ROUTES_API;

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiFetcher = (url: FetchURLType, body: {} = {}) => {
  return fetch(PFMV_ROUTES_API[url], {
    ...config,
    body: body ? JSON.stringify(body) : undefined,
  });
};
