import { PFMV_ROUTES } from "@/helpers/routes";
import { TableauDeBordCardType } from "./tableau-de-bord-suivi-card";

export const makeUrl: Record<TableauDeBordCardType, (_: number) => string> = {
  solution: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
  diagnostic: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
  estimation: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
  financement: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
  lancement: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
  renseignement: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
};
