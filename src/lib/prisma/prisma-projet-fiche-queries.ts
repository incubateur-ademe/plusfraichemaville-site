import { TypeFiche } from "@/src/helpers/common";
import { prismaClient } from "./prismaClient";
import { ProjetWithRelations } from "./prismaCustomTypes";
import { getProjetById, projetIncludes } from "./prismaProjetQueries";
import { FicheType } from "@prisma/client";

type ProjetFicheUpdater = {
  projetId: number;
  ficheId: number;
  typeFiche: TypeFiche;
  userId: string;
};

const updateRecommandationsViewedBy = async ({ projetId, userId }: { projetId: number; userId: string }) => {
  const projet = await getProjetById(projetId);
  if (!projet) return null;
  const recommandationsViewedUserIds = projet.recommandations_viewed_by;
  return recommandationsViewedUserIds?.filter((currentUserId) => currentUserId !== userId) ?? [];
};

export const addProjetFiche = async ({ projetId, ficheId, typeFiche, userId }: ProjetFicheUpdater) => {
  const updatedRecommandationsViewed = await updateRecommandationsViewedBy({ projetId, userId });
  if (!updatedRecommandationsViewed) return null;

  const updatedProjet = await prismaClient.projet_fiche.create({
    data: {
      projet_id: projetId,
      fiche_id: ficheId,
      type: typeFiche === TypeFiche.solution ? "SOLUTION" : "DIAGNOSTIC",
      user_id: userId,
    },
    include: {
      projet: {
        include: projetIncludes,
      },
    },
  });

  return updatedProjet.projet
    ? await prismaClient.projet.update({
        where: { id: projetId },
        data: { recommandations_viewed_by: updatedRecommandationsViewed },
        include: projetIncludes,
      })
    : null;
};

export const deleteProjetFiche = async ({
  projetId,
  ficheId,
  typeFiche,
  userId,
}: ProjetFicheUpdater): Promise<ProjetWithRelations | null> => {
  const updatedRecommandationsViewed = await updateRecommandationsViewedBy({ projetId, userId });
  if (!updatedRecommandationsViewed) return null;

  const updatedProjet = await prismaClient.projet_fiche.delete({
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

  return updatedProjet
    ? await prismaClient.projet.update({
        where: { id: projetId },
        data: { recommandations_viewed_by: updatedRecommandationsViewed },
        include: projetIncludes,
      })
    : null;
};
