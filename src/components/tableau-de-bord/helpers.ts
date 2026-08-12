import { PFMV_ROUTES } from "@/src/helpers/routes";
import { TableauDeBordCardType } from "./tableau-de-bord-suivi-card";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { hasFichesSolutions } from "@/src/components/common/generic-save-fiche/helpers";

type MakeUrlResolver = (_projet: ProjetWithRelations, _canEditProjet: boolean) => string;

export const makeUrl: Record<TableauDeBordCardType, MakeUrlResolver> = {
  solution: (projet, canEditProjet) =>
    hasFichesSolutions(projet) && canEditProjet
      ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projet.id)
      : PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projet.id),
  diagnostic: (projet) => PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS(projet.id),
  estimation: (projet) => PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(projet.id),
  financement: (projet) => PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT(projet.id),
};
