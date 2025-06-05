import { TypeFiche } from "@/src/helpers/common";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { FicheType } from "@prisma/client";

export type FicheBookmarkedSolution = {
  projectName: string;
  ficheSolutionIds: number[];
};

export const checkIfFicheIsSaved = ({
  projet,
  ficheId,
  typeFiche,
}: {
  projet: ProjetWithRelations | undefined;
  ficheId: number;
  typeFiche: TypeFiche;
}) => {
  return !!getProjetFichesIdsByType({
    projet,
    typeFiche,
  })?.find((projetFicheId) => projetFicheId === ficheId);
};

export const getProjetFichesIdsByType = ({
  projet,
  typeFiche,
}: {
  projet: ProjetWithRelations | undefined;
  typeFiche: TypeFiche;
}) => {
  const ficheType = typeFiche === TypeFiche.solution ? FicheType.SOLUTION : FicheType.DIAGNOSTIC;
  return projet?.fiches?.filter((fiche) => fiche.type === ficheType)?.map((fiche) => fiche.fiche_id);
};
