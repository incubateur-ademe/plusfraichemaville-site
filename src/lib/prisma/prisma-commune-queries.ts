import { prismaClient } from "@/src/lib/prisma/prismaClient";

export const getCommuneSirensForEpci = async (sirenEpci: string): Promise<string[]> => {
  const communes = await prismaClient.commune.findMany({
    where: {
      epci: {
        siren: sirenEpci,
      },
    },
    select: {
      siren: true,
    },
  });

  return communes.map((commune) => commune.siren);
};
