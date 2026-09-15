import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { ProjetsState } from "./store";

export const updateAideInProjet = (
  state: ProjetsState,
  projetAide: ProjetAideWithAide | null,
  aideTerritoireId: number | null,
) => {
  return {
    projets: state.projets.map((projet) =>
      projet.id === state.currentProjetId
        ? {
            ...projet,
            projetAides: projetAide
              ? [...projet.projetAides.filter((pa) => pa.aide.id !== projetAide.aide.id), projetAide]
              : projet.projetAides.filter((pa) => pa.aide.aideTerritoireId !== aideTerritoireId),
          }
        : projet,
    ),
  };
};
