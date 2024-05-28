import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

interface ProjetsByTown {
  [codeInsee: string]: {
    commune: string;
    projets: ProjetWithRelations[];
  };
}

export const groupProjetsByTown = (projets: ProjetWithRelations[]): [string, ProjetWithRelations[]][] => {
  const groupedProjets = projets.reduce<ProjetsByTown>((acc, projet) => {
    const { code_insee, nom } = projet.collectivite;

    if (code_insee) {
      if (!acc[code_insee]) {
        acc[code_insee] = {
          commune: nom,
          projets: [],
        };
      }
      acc[code_insee].projets.push(projet);
    }
    return acc;
  }, {});

  return Object.values(groupedProjets).map(({ commune, projets }) => [commune, projets]);
};
