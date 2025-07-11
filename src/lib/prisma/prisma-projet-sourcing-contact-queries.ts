import { projet_sourcing_contact } from "@/src/generated/prisma/client";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { projetUpdated } from "@/src/lib/prisma/prismaProjetQueries";

export const addContactToProjet = async (
  projetId: number,
  userProjetId: number,
  creatorId: string,
): Promise<projet_sourcing_contact> => {
  const response = await prismaClient.projet_sourcing_contact.upsert({
    where: { projet_id_sourced_user_projet_id: { projet_id: projetId, sourced_user_projet_id: userProjetId } },
    create: {
      projet_id: projetId,
      sourced_user_projet_id: userProjetId,
      created_by: creatorId,
    },
    update: {},
  });

  await projetUpdated(response.projet_id);

  return response;
};

export const deleteContactFromProjet = async (
  projetId: number,
  userProjetId: number,
): Promise<projet_sourcing_contact> => {
  const response = await prismaClient.projet_sourcing_contact.delete({
    where: { projet_id_sourced_user_projet_id: { projet_id: projetId, sourced_user_projet_id: userProjetId } },
  });

  await projetUpdated(response.projet_id);

  return response;
};
