import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Climadiag } from "@/src/components/climadiag/types";
import { climadiagToPublicClimadiag } from "@/src/components/surchauffe-urbaine/territoire/search-helpers";
import { ClimadiagDto } from "@/src/types/dto";
import { convertClimadiagToDto } from "./dto-converters";

export const getClimadiagInfoFromCodeInsee = async (codeInsee: string[]): Promise<ClimadiagDto[]> => {
  const results = await prismaClient.climadiag.findMany({
    where: {
      code_insee: {
        in: codeInsee,
      },
    },
  });
  return results.map(convertClimadiagToDto);
};

export const getPublicClimadiagInfoFromCodeInsee = async (codeInsee: string) => {
  const climadiagInfo = (await prismaClient.climadiag.findFirst({
    where: {
      code_insee: codeInsee,
    },
  })) as Climadiag | null;
  return climadiagInfo ? climadiagToPublicClimadiag(convertClimadiagToDto(climadiagInfo)) : null;
};

export const searchClimadiagInfo = async (searchTerms: string[], limit: number): Promise<ClimadiagDto[]> => {
  const fullTextQuery = searchTerms.map((searchTerm) => `${searchTerm}`).join(" & ");
  const results = await prismaClient.climadiag.findMany({
    where: {
      OR: [
        {
          searchable_field: {
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
  return results.map(convertClimadiagToDto);
};

const computeClimadiagNameQuery = (searchTerms: string[]): Prisma.climadiagWhereInput => {
  return {
    AND: searchTerms.map((searchTerm) => {
      return {
        searchable_field: {
          contains: searchTerm,
          mode: "insensitive",
        },
      };
    }),
  };
};
