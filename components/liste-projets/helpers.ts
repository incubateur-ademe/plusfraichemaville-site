import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

interface ProjetsByCollectivite {
  [codeInsee: string]: {
    commune: string;
    projets: ProjetWithRelations[];
  };
}

export const groupProjetsByCollectivite = (projets: ProjetWithRelations[]): [string, ProjetWithRelations[]][] => {
  const groupedProjets = projets.reduce<ProjetsByCollectivite>((acc, projet) => {
    const { code_insee, nom } = projet.collectivite;
    const codeInsee = code_insee ?? "";

    if (codeInsee) {
      if (!acc[codeInsee]) {
        acc[codeInsee] = {
          commune: nom,
          projets: [],
        };
      }
      acc[codeInsee].projets.push(projet);
    }
    return acc;
  }, {});

  return Object.values(groupedProjets).map(({ commune, projets }) => [commune, projets]);
};
