import { prismaClient } from "@/lib/prisma/prismaClient";
import { Prisma } from "@prisma/client";

export const getClimadiagInfoFromCodeInsee = async (codeInsee: string[]) => {
  return prismaClient.climadiag.findMany({
    where: {
      code_insee: {
        in: codeInsee,
      },
    },
  });
};

export const searchClimadiagInfo = async (searchTerms: string[], limit: number) => {
  const fullTextQuery = searchTerms.map((searchTerm) => `${searchTerm}`).join(" & ");
  return prismaClient.climadiag.findMany({
    where: {
      OR: [
        {
          nom: {
            search: fullTextQuery,
          },
        },
        {
          code_insee: {
            startsWith: fullTextQuery,
          },
        },
        {
          code_postal: {
            startsWith: fullTextQuery,
          },
        },
        computeClimadiagNameQuery(searchTerms),
      ],
    },
    orderBy: [{ type_lieu: "desc" }, { nom: "asc" }],
    take: limit,
  });
};

const computeClimadiagNameQuery = (searchTerms: string[]): Prisma.climadiagWhereInput => {
  return {
    AND: searchTerms.map((searchTerm) => {
      return {
        nom: {
          contains: searchTerm,
          mode: "insensitive",
        },
      };
    }),
  };
};
