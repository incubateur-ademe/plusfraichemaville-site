import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { EstimationMateriauxFicheSolutionRecap } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-fiche-solution-recap";
import EstimationMateriauGlobalPriceFooter from "@/src/forms/estimation/estimation-materiau-global-price-footer";
import Button from "@codegouvfr/react-dsfr/Button";
import { notifications } from "@/src/components/common/notifications";
import { useEstimationFSGlobalPrice } from "@/src/hooks/use-estimation-fs-global-price";

type EstimationMateriauxValidationProps = {
  estimationsFicheSolution: EstimationFicheSolution[];
  goToFicheSolutionStep: (_: number) => void;
  onClose: () => void;
  onPrevious: () => void;
};

export function EstimationMateriauxValidation({
  estimationsFicheSolution,
  goToFicheSolutionStep,
  onClose,
  onPrevious,
}: EstimationMateriauxValidationProps) {
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } =
    useEstimationFSGlobalPrice(estimationsFicheSolution);

  const validateEstimation = () => {
    notifications("success", "ESTIMATION_VALIDATED");
    onClose();
  };

  return (
    <>
      {estimationsFicheSolution.map((efm) => (
        <EstimationMateriauxFicheSolutionRecap
          key={efm.fiche_solution_id}
          ficheSolutionEstimation={efm}
          goToFicheSolutionStep={goToFicheSolutionStep}
        />
      ))}
      <hr className="mb-2 h-[1px] p-0" />
      <div className="mt-8 text-[1.375rem] font-bold text-dsfr-text-title-grey">
        Estimation totale des solutions envisagées
      </div>
      <div className="mt-1 text-dsfr-text-mention-grey">
        <i className={`fr-icon-info-fill mr-2`} />
        Inclut : fourniture et pose (hors travaux complémentaires de voirie, consolidation, etc.)
      </div>
      <EstimationMateriauGlobalPriceFooter
        investissementMin={fournitureMin}
        investissementMax={fournitureMax}
        entretienMin={entretienMin}
        entretienMax={entretienMax}
      />
      <Button className={`mr-4 rounded-3xl`} onClick={validateEstimation}>
        {"Valider l'estimation"}
      </Button>
      <Button className={`rounded-3xl`} onClick={onPrevious} priority="secondary">
        Précédent
      </Button>
    </>
  );
}
