import { useProjetsStore } from "@/src/stores/projets/provider";

export const useGetSavedAideInProjetId = (aideTerritoireId: number) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const savedAide = projet?.projetAides.find((projetAide) => projetAide.aide.aideTerritoireId === aideTerritoireId);

  return savedAide?.aide.id;
};
