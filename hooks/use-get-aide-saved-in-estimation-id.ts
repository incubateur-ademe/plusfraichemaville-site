import { useProjetsStore } from "@/stores/projets/provider";

export const useGetSavedAideInEstimationId = (estimationId: number, aideTerritoireId: number) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const estimation = projet?.estimations.find((estimation) => estimation.id === estimationId);

  const savedAide = estimation?.estimations_aides.find(
    (estimation) => estimation.aide.aideTerritoireId === aideTerritoireId,
  );

  return savedAide?.aide.id;
};
