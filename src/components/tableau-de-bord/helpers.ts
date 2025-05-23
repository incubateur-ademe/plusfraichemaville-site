import { PFMV_ROUTES } from "@/src/helpers/routes";
import { TableauDeBordCardType } from "./tableau-de-bord-suivi-card";

export const makeUrl: Record<TableauDeBordCardType, (_: number) => string> = {
  solution: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
  diagnostic: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS(projetId),
  estimation: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(projetId),
  financement: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT(projetId),
  annuaire: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE(projetId),
  renseignement: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_INFO_PROJET(projetId),
};
