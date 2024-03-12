import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
// eslint-disable-next-line max-len
import { EstimationMateriauxFicheSolutionRecap } from "@/components/estimation/materiaux-modal/estimation-materiaux-fiche-solution-recap";
import { useMemo } from "react";
import EstimationMateriauGlobalPriceFooter from "@/forms/estimation/estimation-materiau-global-price-footer";
import { computeGlobalFicheSolutionPrice } from "@/helpers/coutMateriau";

type EstimationMateriauxValidationProps = {
  estimationsFicheSolution: EstimationMateriauxFicheSolution[];
  goToFicheSolutionStep: (_: number) => void;
};

export function EstimationMateriauxValidation({
  estimationsFicheSolution,
  goToFicheSolutionStep,
}: EstimationMateriauxValidationProps) {
  const globalPrice = useMemo(
    () => computeGlobalFicheSolutionPrice(estimationsFicheSolution),
    [estimationsFicheSolution],
  );
  return (
    <>
      {estimationsFicheSolution.map((ficheSolutionEstimation) => (
        <EstimationMateriauxFicheSolutionRecap
          key={ficheSolutionEstimation.ficheSolutionId}
          ficheSolutionEstimation={ficheSolutionEstimation}
          goToFicheSolutionStep={goToFicheSolutionStep}
        />
      ))}
      <hr className="p-0 h-[1px] mb-2" />
      <div className="mt-8 text-[1.375rem] font-bold text-dsfr-text-title-grey">
        Estimation totale des solutions envisagées
      </div>
      <div className="text-[1.375rem] text-dsfr-text-mention-grey">
        <i className={`fr-icon-info-fill mr-2`} />
        Inclus : fourniture et pose (hors travaux complémentaires de voirie, consolidation, etc.)
      </div>
      <EstimationMateriauGlobalPriceFooter
        investissementMin={globalPrice.fourniture.min}
        investissementMax={globalPrice.fourniture.max}
        entretienMin={globalPrice.entretien.min}
        entretienMax={globalPrice.entretien.max}
      />
    </>
  );
}
