export const PFMV_ROUTES = {
  AIDE_DECISION: "/aide-decision",
  FICHES_SOLUTIONS: "/fiche-solution",
  RETOURS_EXPERIENCE: "/projet",
  CONNEXION: "/connexion",
  DECONNEXION: "/logout",
  DECONNEXION_AGENT_CONNECT: "/logout/agentconnect",
  ESPACE_PROJET: "/espace-projet",
  MON_PROFIL: "/espace-projet/info-perso",
  INFO_PROJET: "/espace-projet/info-projet",
  LISTE_PROJETS: "/espace-projet/liste-projets",
  TABLEAU_DE_BORD: (projetId: number) => `/espace-projet/${projetId}/tableau-de-bord`,
};
