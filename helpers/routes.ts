export const PFMV_ROUTES = {
  AIDE_DECISION: "/aide-decision",
  FICHES_SOLUTIONS: "/fiche-solution",
  RETOURS_EXPERIENCE: "/projet",
  CONNEXION: "/connexion",
  DECONNEXION: "/logout",
  DECONNEXION_AGENT_CONNECT: "/logout/agentconnect",
  ESPACE_PROJET: "/espace-projet",
  ESPACE_PROJET_LISTE: "/espace-projet/liste-projets",
  MON_PROFIL: "/espace-projet/info-perso",
  INFO_PROJET: "/espace-projet/info-projet",
  TABLEAU_DE_BORD: (projetId: number) => `/espace-projet/${projetId}/tableau-de-bord`,
};
