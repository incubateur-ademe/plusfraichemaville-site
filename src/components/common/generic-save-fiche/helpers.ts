import { TypeFiche } from "@/src/helpers/common";
import { ProjetWithRelationsDto } from "@/src/types/dto";
import { FicheType } from "@/src/generated/prisma/client";

export const checkIfFicheIsSaved = ({
  projet,
  ficheId,
  typeFiche,
}: {
  projet: ProjetWithRelationsDto | undefined;
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
  projet: ProjetWithRelationsDto | undefined;
  typeFiche: TypeFiche;
}) => {
  const ficheType = typeFiche === TypeFiche.solution ? FicheType.SOLUTION : FicheType.DIAGNOSTIC;
  return projet?.fiches?.filter((fiche) => fiche.type === ficheType)?.map((fiche) => fiche.ficheId);
};
