export const PFMV_ROUTES = {
  AIDE_DECISION: "/aide-decision",
  FICHES_SOLUTIONS: "/fiche-solution",
  FICHES_DIAGNOSTIC: "/fiches-diagnostic",
  MES_FICHES_SOLUTIONS: "/mon-projet/favoris",
  RETOURS_EXPERIENCE: "/projet",
  CONNEXION: "/connexion",
  DECONNEXION: "/logout",
  DECONNEXION_AGENT_CONNECT: "/logout/agentconnect",
  ESPACE_PROJET: "/espace-projet",
  ESPACE_PROJET_LISTE: "/espace-projet",
  MON_PROFIL: "/info-perso",
  CREATE_PROJET: "/espace-projet/creation-projet",
  ESPACE_PROJET_FICHES_DIAGNOSTIC_LISTE: "/espace-projet/fiche-diagnostic",
  ESPACE_PROJET_FICHES_DIAGNOSTIC_LISTE_ALL: "/espace-projet/fiche-diagnostic/liste",
  ESPACE_PROJET_TABLEAU_DE_BORD: "/tableau-de-bord?tab=tableau-de-suivi",
  FICHE_DIAGNOSTIC: (url: string) => `/fiches-diagnostic/${url}`,
  TABLEAU_DE_BORD: (projetId: number) => `/espace-projet/${projetId}/tableau-de-bord?tab=tableau-de-suivi`,
  TABLEAU_DE_BORD_WITH_CURRENT_TAB: (projetId: number, tab: string) =>
    `/espace-projet/${projetId}/tableau-de-bord?tab=${tab}`,
  ESPACE_PROJET_FICHES_SOLUTIONS: (projetId: number) => `/espace-projet/${projetId}/fiches-solutions`,
  ESPACE_PROJET_CREATION_ESTIMATION: (projetId: number) => `/espace-projet/${projetId}/estimation/creation`,
  ESPACE_PROJET_LISTE_ESTIMATION: (projetId: number, opener?: string) =>
    `/espace-projet/${projetId}/estimation/liste${(opener && `?open=${opener}`) || ""}`,
  ESPACE_PROJET_FICHES_SOLUTIONS_LISTE: (projetId: number) => `/espace-projet/${projetId}/fiches-solutions/liste`,
  ESPACE_PROJET_FICHES_SOLUTIONS_REX: (projetId: number, projetRexSlug: string) =>
    `/espace-projet/${projetId}/projet/${projetRexSlug}`,
  ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION: (projetId: number, ficheSolutionSlug: string) =>
    `/espace-projet/${projetId}/fiches-solutions/liste/${ficheSolutionSlug}`,
  ESPACE_PROJET_INFO_PROJET: (projetId: number) => `/espace-projet/${projetId}/info-projet`,
  ESPACE_PROJET_FICHES_DIAGNOSTIC: (projetId: number) => `/espace-projet/${projetId}/fiches-diagnostic`,
};
