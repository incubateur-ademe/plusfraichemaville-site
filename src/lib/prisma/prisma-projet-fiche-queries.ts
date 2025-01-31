import { TypeFiche } from "@/src/helpers/common";
import { prismaClient } from "./prismaClient";
import { ProjetWithRelations } from "./prismaCustomTypes";
import { projetIncludes } from "./prismaProjetQueries";
import { FicheType } from "@prisma/client";

export type ProjetFicheUpdater = {
  projetId: number;
  ficheId: number;
  typeFiche: TypeFiche;
  userId: string;
};

export const addProjetFiche = async ({ projetId, ficheId, typeFiche, userId }: ProjetFicheUpdater) => {
  const { projet } = await prismaClient.projet_fiche.upsert({
    where: {
      projet_id_fiche_id_type: {
        projet_id: projetId,
        fiche_id: ficheId,
        type: typeFiche === TypeFiche.solution ? FicheType.SOLUTION : FicheType.DIAGNOSTIC,
      },
    },
    create: {
      projet_id: projetId,
      fiche_id: ficheId,
      type: typeFiche === TypeFiche.solution ? FicheType.SOLUTION : FicheType.DIAGNOSTIC,
      user_id: userId,
    },
    update: {},
    include: {
      projet: {
        include: projetIncludes,
      },
    },
  });

  return projet;
};

export const deleteProjetFiche = async ({
  projetId,
  ficheId,
  typeFiche,
}: ProjetFicheUpdater): Promise<ProjetWithRelations | null> => {
  const { projet } = await prismaClient.projet_fiche.delete({
    where: {
      projet_id_fiche_id_type: {
        projet_id: projetId,
        fiche_id: ficheId,
        type: typeFiche === TypeFiche.solution ? FicheType.SOLUTION : FicheType.DIAGNOSTIC,
      },
    },
    select: {
      projet: {
        include: projetIncludes,
      },
    },
  });

  return projet;
};
