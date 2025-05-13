import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { Climadiag } from "@/src/components/climadiag/types";

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
  if (!climadiagInfo) return climadiagInfo;
  return {
    ...climadiagInfo,
    jours_tres_chauds_prevision: { 2030: climadiagInfo.jours_tres_chauds_prevision["2030"] },
    jours_vdc_prevision: { 2030: climadiagInfo.jours_vdc_prevision["2030"] },
    nuits_chaudes_prevision: { 2030: climadiagInfo.nuits_chaudes_prevision["2030"] },
  };
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
