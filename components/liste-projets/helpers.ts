import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { collectivite } from "@prisma/client";

interface ProjetsByCollectivite {
  collectivite: collectivite;
  projets: ProjetWithRelations[];
}

export const groupProjetsByCollectivite = (projets: ProjetWithRelations[]): ProjetsByCollectivite[] => {
  return projets.reduce<ProjetsByCollectivite[]>((acc, projet) => {
    let existingGroup = acc.find(({ collectivite }) => collectivite.id === projet.collectivite.id);
    if (!existingGroup) {
      existingGroup = { collectivite: projet.collectivite, projets: [] };
      acc.push(existingGroup);
    }
    existingGroup.projets.push(projet);
    return acc;
  }, []);
};
