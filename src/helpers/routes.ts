import { EspaceProjetTabsId } from "@/src/components/liste-projets";
import { TypeSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const TYPE_SOLUTION_FILTER_NAME = "typeSolutionFilter";

export const PFMV_ROUTES = {
  AIDE_DECISION: "/aide-decision",
  FICHES_SOLUTIONS: "/fiche-solution",
  MES_FICHES_SOLUTIONS: "/mon-projet/favoris",
  RETOURS_EXPERIENCE: "/projet",
  RETOURS_EXPERIENCE_DIAGNOSTIC: (slug: string) => `/surchauffe-urbaine/retour-experience/${slug}`,
  SURCHAUFFE_URBAINE_INTRODUCTION: "/surchauffe-urbaine",
  SURCHAUFFE_URBAINE_COMPRENDRE: "/surchauffe-urbaine/notions-cles",
  SURCHAUFFE_URBAINE_TIMING: "/surchauffe-urbaine/quand-faire-un-diagnostic",
  SURCHAUFFE_URBAINE_REX: "/surchauffe-urbaine/retour-experience",
  SURCHAUFFE_URBAINE_TERRITOIRE: (codeInsee: string) => `/surchauffe-urbaine/territoire?codeInsee=${codeInsee}`,
  SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC: (ficheDiagnosticSlug: string) =>
    `/surchauffe-urbaine/fiche-diagnostic/${ficheDiagnosticSlug}`,
  RETOUR_EXPERIENCE: (slug: string) => `${PFMV_ROUTES.RETOURS_EXPERIENCE}/${slug}`,
  CONTACT: "/contact",
  CONTACT_SUCCESS: "/contact/success",
  NEWSLETTER: "/newsletter",
  NEWSLETTER_SUCCESS: "/newsletter/success",
  WEBINAIRES: "/webinaires",
  CONNEXION: "/connexion",
  DECONNEXION: "/logout",
  ESPACE_PROJET: "/espace-projet",
  ESPACE_PROJET_LISTE: "/espace-projet",
  MON_PROFIL: "/info-perso",
  CREATE_PROJET: "/espace-projet/creation-projet",
  ESPACE_PROJET_FICHES_SOLUTION_LISTE_ALL: "/fiche-solution/liste",
  ESPACE_PROJET_ANNUAIRE_MAP: "/annuaire/carte",
  ESPACE_PROJET_TABLEAU_DE_BORD: "/tableau-de-bord?tab=tableau-de-suivi",
  ESPACE_PROJET_REX_DIAGNOSTIC: (slug: string) => `/diagnostic/prestation/retour-experience/${slug}`,
  ESPACE_PROJET_FINANCEMENT_LISTE_ESTIMATION: "/financement",
  TABLEAU_DE_BORD: (projetId: number) => `/espace-projet/${projetId}/tableau-de-bord?tab=tableau-de-suivi`,
  TABLEAU_DE_BORD_WITH_CURRENT_TAB: (projetId: number, tab: "tableau-de-suivi" | "recommandation" | "partage") =>
    `/espace-projet/${projetId}/tableau-de-bord?tab=${tab}`,
  ESPACE_PROJET_WITH_CURRENT_TAB: (tab: EspaceProjetTabsId) => `/espace-projet?tab=${tab}`,
  ESPACE_PROJET_FICHES_SOLUTIONS: (projetId: number) => `/espace-projet/${projetId}/fiche-solution`,
  ESPACE_PROJET_FICHES_SOLUTIONS_LISTE: (projetId: number) => `/espace-projet/${projetId}/fiche-solution/liste`,
  ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS: (projetId: number) => `/espace-projet/${projetId}/diagnostic/choix-parcours`,
  ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_PRESENTATION: (projetId: number) =>
    `/espace-projet/${projetId}/diagnostic/indicateurs-environnementaux/presentation`,
  ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS: (projetId: number) =>
    `/espace-projet/${projetId}/diagnostic/indicateurs-environnementaux/questions`,
  ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_RESULTATS: (projetId: number) =>
    `/espace-projet/${projetId}/diagnostic/indicateurs-environnementaux/resultats`,
  ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE: (projetId: number) =>
    `/espace-projet/${projetId}/diagnostic/prestation/liste`,
  ESPACE_PROJET_DIAGNOSTIC_PRESTATION_SELECTION: (projetId: number) =>
    `/espace-projet/${projetId}/diagnostic/prestation/selection`,
  ESPACE_PROJET_FINANCEMENT: (projetId: number) => `/espace-projet/${projetId}/financement`,
  ESPACE_PROJET_CREATION_ESTIMATION: (projetId: number) => `/espace-projet/${projetId}/estimation/creation`,
  ESPACE_PROJET_LISTE_ESTIMATION: (projetId: number, opener?: string) =>
    `/espace-projet/${projetId}/estimation/liste${(opener && `?open=${opener}`) || ""}`,
  ESPACE_PROJET_FICHES_SOLUTIONS_REX: (projetId: number, projetRexSlug: string) =>
    `/espace-projet/${projetId}/projet/${projetRexSlug}`,
  ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION: (projetId: number, ficheSolutionSlug: string) =>
    `/espace-projet/${projetId}/fiche-solution/${ficheSolutionSlug}`,
  ESPACE_PROJET_FICHE_DIAGNOSTIC: (projetId: number, ficheDiagnosticSlug: string) =>
    `/espace-projet/${projetId}/diagnostic/prestation/fiche-diagnostic/${ficheDiagnosticSlug}`,
  ESPACE_PROJET_INFO_PROJET: (projetId: number) => `/espace-projet/${projetId}/info-projet`,
  ESPACE_PROJET_ANNUAIRE: (projetId: number) => `/espace-projet/${projetId}/annuaire`,
  ESPACE_PROJET_FINANCEMENT_ESTIMATION_EDIT: (projetId?: number, estimationId?: number) =>
    `/espace-projet/${projetId}/financement/edit/${estimationId}`,
  ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_TYPE_FILTER: (projetId: number, typeFiche: TypeSolution) =>
    `/espace-projet/${projetId}/fiche-solution/liste?${TYPE_SOLUTION_FILTER_NAME}=${typeFiche}`,
};

export const getFullUrl = (route: string): string => `${process.env.NEXT_PUBLIC_URL_SITE}${route}`;

export const GET_AIDES_TERRITOIRES_BY_AIDE_ID_URL = (aideId: number) =>
  `/api/get-aides-territoires-aide-by-aide-id?aideId=${aideId}`;

export const SEARCH_AIDE_FOR_ESTIMATION_URL = (estimationId: number) =>
  `/api/search-aides-for-estimation?estimationId=${estimationId}`;

export const GET_AVAILABLE_PROJETS_FOR_COLLECTITIVE_URL = (collectiviteId: number, userId: string) =>
  `/api/get-available-projects-for-collectivite?collectiviteId=${collectiviteId}&userId=${userId}`;

export const GET_PUBLIC_PROJET_BY_ID = (projetId: number) => `/api/get-public-projet-by-id?projetId=${projetId}`;

export const GET_REX_WITH_CONTACTS_BY_ID = (rexId: number) => `/api/get-rex-with-contacts-by-id?rexId=${rexId}`;

export const GET_REX_BY_SLUG = (rexSlug: string) => `/api/get-rex-by-slug?rexSlug=${rexSlug}`;

export const POST_REVALIDATE_TAG = (tag?: string) => `/api/revalidate-cache?tag=${tag}`;

export const SEARCH_CLIMADIAG_PUBLIC_INFO = (search?: string) => `/api/search-climadiag-public-info?search=${search}`;

export const GET_FICHE_DIAGNOSTIC_BY_IDS = (ficheDiagnosticIds: number[]) =>
  `/api/get-fiches-diagnostic?ficheDiagnosticIds=${JSON.stringify(ficheDiagnosticIds)}`;
