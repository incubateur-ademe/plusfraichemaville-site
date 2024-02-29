import { collectivite, User } from "@prisma/client";
import { prismaClient } from "@/lib/prisma/prismaClient";

export const attachUserToCollectivite = async (user: User, collectivite: collectivite, verified: boolean) => {
  return prismaClient.user_collectivite.create({
    data: {
      user_id: user.id,
      collectivite_id: collectivite.id,
      verified,
    },
  });
};
