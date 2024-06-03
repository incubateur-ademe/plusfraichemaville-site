import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { collectivite } from "@prisma/client";

interface ProjetsByCollectivite {
  collectivite: collectivite;
  projets: ProjetWithRelations[];
}

export const groupProjetsByCollectivite = (projets: ProjetWithRelations[]): ProjetsByCollectivite[] => {
  return projets.reduce<ProjetsByCollectivite[]>((acc, projet) => {
    const existingGroup = acc.find(
      (projetsByCollectivite) => projetsByCollectivite.collectivite.id === projet.collectivite.id,
    );
    if (existingGroup) {
      existingGroup.projets.push(projet);
    } else {
      acc.push({ collectivite: projet.collectivite, projets: [projet] });
    }
    return acc;
  }, []);
};
