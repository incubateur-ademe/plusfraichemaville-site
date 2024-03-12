import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { EstimationMateriauxFicheSolutionRecap } from "@/components/estimation/materiaux-modal/estimation-materiaux-fiche-solution-recap";

type EstimationMateriauxValidationProps = {
  estimationsFicheSolution: EstimationMateriauxFicheSolution[];
};

export function EstimationMateriauxValidation({ estimationsFicheSolution }: EstimationMateriauxValidationProps) {
  return (
    <>
      {estimationsFicheSolution.map((ficheSolutionEstimation) => (
        <EstimationMateriauxFicheSolutionRecap
          key={ficheSolutionEstimation.ficheSolutionId}
          ficheSolutionEstimation={ficheSolutionEstimation}
        />
      ))}
    </>
  );
}
