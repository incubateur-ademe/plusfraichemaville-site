import { collectivite } from "@/src/generated/prisma/client";
import { prismaClient } from "@/src/lib/prisma/prismaClient";

export const attachUserToCollectivite = async (userId: string, collectivite: collectivite, verified: boolean) => {
  return prismaClient.user_collectivite.create({
    data: {
      user_id: userId,
      collectivite_id: collectivite.id,
      verified,
    },
  });
};
