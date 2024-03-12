import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
// eslint-disable-next-line max-len
import { EstimationMateriauxFicheSolutionRecap } from "@/components/estimation/materiaux-modal/estimation-materiaux-fiche-solution-recap";

type EstimationMateriauxValidationProps = {
  estimationsFicheSolution: EstimationMateriauxFicheSolution[];
  goToFicheSolutionStep: (_: number) => void;
};

export function EstimationMateriauxValidation({
  estimationsFicheSolution,
  goToFicheSolutionStep,
}: EstimationMateriauxValidationProps) {
  return (
    <>
      {estimationsFicheSolution.map((ficheSolutionEstimation) => (
        <EstimationMateriauxFicheSolutionRecap
          key={ficheSolutionEstimation.ficheSolutionId}
          ficheSolutionEstimation={ficheSolutionEstimation}
          goToFicheSolutionStep={goToFicheSolutionStep}
        />
      ))}
    </>
  );
}
