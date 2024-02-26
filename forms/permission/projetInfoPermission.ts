import { getProjetById } from "@/lib/prisma/prismaProjetQueries";

export const hasPermissionToUpdateProjet = async (projetIdToUpdate: bigint, userIdUpdating: string) => {
  const projet = await getProjetById(projetIdToUpdate);
  return projet ? projet.created_by === userIdUpdating : false;
};
