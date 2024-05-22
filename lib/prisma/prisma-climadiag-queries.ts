import { prismaClient } from "@/lib/prisma/prismaClient";

export const getClimadiagInfoFromCodeInsee = async (codeInsee: string[]) => {
  return prismaClient.climadiag.findMany({
    where: {
      code_insee: {
        in: ["02190"],
        // in: codeInsee,
      },
    },
  });
};
