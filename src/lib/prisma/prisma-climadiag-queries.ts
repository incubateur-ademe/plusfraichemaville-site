import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Climadiag } from "@/src/components/climadiag/types";
import { climadiagToPublicClimadiag } from "@/src/components/surchauffe-urbaine/territoire/search-helpers";

export const getClimadiagInfoFromCodeInsee = async (codeInsee: string[]) => {
  return prismaClient.climadiag.findMany({
    where: {
      code_insee: {
        in: codeInsee,
      },
    },
  });
};

export const getPublicClimadiagInfoFromCodeInsee = async (codeInsee: string) => {
  const climadiagInfo = (await prismaClient.climadiag.findFirst({
    where: {
      code_insee: codeInsee,
    },
  })) as Climadiag | null;
  return climadiagToPublicClimadiag(climadiagInfo);
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
    orderBy: [{ type_lieu: "desc" }, { population: "desc" }],
    take: limit,
  }) as unknown as Climadiag[];
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
