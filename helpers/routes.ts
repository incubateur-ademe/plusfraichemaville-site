export const PFMV_ROUTES = {
  AIDE_DECISION: "/aide-decision",
  FICHES_SOLUTIONS: "/fiche-solution",
  MES_FICHES_SOLUTIONS: "/mon-projet/favoris",
  RETOURS_EXPERIENCE: "/projet",
  CONNEXION: "/connexion",
  DECONNEXION: "/logout",
  DECONNEXION_AGENT_CONNECT: "/logout/agentconnect",
  ESPACE_PROJET: "/espace-projet",
  ESPACE_PROJET_LISTE: "/espace-projet",
  MON_PROFIL: "/espace-projet/info-perso",
  CREATE_PROJET: "/espace-projet/creation-projet",
  TABLEAU_DE_BORD: (projetId: number) => `/espace-projet/${projetId}/tableau-de-bord`,
  ESPACE_PROJET_FICHES_SOLUTIONS: (projetId: number) => `/espace-projet/${projetId}/fiches-solutions`,
  ESPACE_PROJET_CREATION_ESTIMATION: (projetId: number) => `/espace-projet/${projetId}/creation-estimation`,
  ESPACE_PROJET_FICHES_SOLUTIONS_LISTE: (projetId: number) => `/espace-projet/${projetId}/fiches-solutions/liste`,
  ESPACE_PROJET_FICHES_SOLUTIONS_REX: (projetId: number, projetRexSlug: string) =>
    `/espace-projet/${projetId}/projet/${projetRexSlug}`,
  ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION: (projetId: number, ficheSolutionSlug: string) =>
    `/espace-projet/${projetId}/fiches-solutions/liste/${ficheSolutionSlug}`,
  ESPACE_PROJET_INFO_PROJET: (projetId: number) => `/espace-projet/${projetId}/info-projet`,
};
