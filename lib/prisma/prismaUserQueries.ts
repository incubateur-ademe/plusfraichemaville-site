import { prismaClient } from "@/lib/prisma/prismaClient";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";

export const deleteUserProjet = (projetId: number) => {
  return prismaClient.projet.delete({
    where: {
      id: projetId,
    },
  });
};

export const getUserProjets = async (userId: string) => {
  return prismaClient.projet.findMany({
    where: {
      created_by: userId,
    },
    include: {
      collectivite: true,
    },
  });
};

export const getUserWithCollectivites = async (userId: string): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};

export const updateUser = async ({
  userId,
  userNom,
  userPrenom,
  userPoste,
  collectiviteId,
}: {
  userId: string;
  userNom: string;
  userPrenom: string;
  userPoste: string;
  collectiviteId: number;
}): Promise<UserWithCollectivite | null> => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      nom: userNom,
      prenom: userPrenom,
      poste: userPoste,
      collectivites: {
        upsert: {
          where: { userCollectiviteId: { user_id: userId, collectivite_id: collectiviteId } },
          update: {},
          create: { collectivite_id: collectiviteId, verified: false },
        },
      },
    },
    include: { collectivites: { include: { collectivite: true } } },
  });
};
