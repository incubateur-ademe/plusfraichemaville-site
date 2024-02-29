import { getProjetById } from "@/lib/prisma/prismaProjetQueries";

export const hasPermissionToUpdateProjet = async (projetIdToUpdate: number, userIdUpdating: string) => {
  const projet = await getProjetById(projetIdToUpdate);
  return projet ? projet.created_by === userIdUpdating : false;
};

export const hasPermissionToUpdateUser = (userIdToUpdate: string, userIdUpdating: string) => {
  return userIdToUpdate === userIdUpdating;
};

export const hasPermissionToViewUserProjet = (authenticatedUserId: string, userId: string) => {
  return authenticatedUserId === userId;
};
