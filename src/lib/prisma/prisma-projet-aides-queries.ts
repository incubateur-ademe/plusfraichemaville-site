import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { projetUpdated } from "./prismaProjetQueries";

export const addAideInProjet = async (
  projetId: number,
  aideId: number,
  userId: string,
): Promise<ProjetAideWithAide> => {
  const response = await prismaClient.projet_aides.upsert({
    where: {
      projet_id_aideId: {
        projet_id: projetId,
        aideId,
      },
    },
    update: {},
    create: {
      projet_id: projetId,
      aideId,
      user_id: userId,
    },
    include: {
      aide: true,
    },
  });

  await projetUpdated(projetId);

  return response;
};

export const deleteAideInProjet = async (projetId: number, aideId: number): Promise<ProjetAideWithAide | null> => {
  const response = await prismaClient.projet_aides.delete({
    where: {
      projet_id_aideId: {
        projet_id: projetId,
        aideId,
      },
    },
    include: {
      aide: true,
    },
  });

  await projetUpdated(projetId);

  return response;
};
