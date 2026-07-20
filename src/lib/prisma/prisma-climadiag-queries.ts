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

const sanitizeSearchTerm = (term: string): string => term.replace(/[^a-z0-9-]/gi, "").trim();

export const searchClimadiagInfo = async (searchTerms: string[], limit: number) => {
  const sanitizedTerms = searchTerms.map(sanitizeSearchTerm).filter(Boolean);

  if (sanitizedTerms.length === 0) {
    return [] as Climadiag[];
  }

  const fullTextQuery = sanitizedTerms.join(" & ");
  return prismaClient.climadiag.findMany({
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
        computeClimadiagNameQuery(sanitizedTerms),
      ],
    },
    select: {
      id: true,
      code_insee: true,
      code_postal: true,
      adresse_all_infos: true,
      type_lieu: true,
      nom: true,
      jours_tres_chauds_ref: true,
      jours_tres_chauds_prevision: true,
      jours_vdc_prevision: true,
      jours_vdc_ref: true,
      nuits_chaudes_prevision: true,
      nuits_chaudes_ref: true,
      seuil_nuits_chaudes: true,
      seuil_jours_tres_chauds: true,
    },
    orderBy: [{ type_lieu: "desc" }, { population: "desc" }],
    take: limit,
  }) as unknown as Climadiag[];
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
