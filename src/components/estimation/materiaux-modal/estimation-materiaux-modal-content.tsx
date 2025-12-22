"use client";

import Stepper from "@codegouvfr/react-dsfr/Stepper";
import { useEffect, useMemo, useState } from "react";
import EstimationMateriauForm from "@/src/forms/estimation/estimation-materiau-form";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { upsert } from "@/src/helpers/listUtils";
import { EstimationMateriauxValidation } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-validation";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { isSimpleMateriauFicheSolution, makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import EstimationMateriauSimpleFieldForm from "@/src/forms/estimation/estimation-materiau-form-simple-field";
import { estimationModal } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

type EstimationCardDeleteModalProps = {
  estimation: EstimationWithAides;
};

export function EstimationMateriauModalContent({ estimation }: EstimationCardDeleteModalProps) {
  const [estimationStep, setEstimationStep] = useState(1);

  useEffect(() => {
    setEstimationStep(1);
  }, [estimation.id]);

  const getCurrentProjet = useProjetsStore((state) => state.getCurrentProjet);
  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);

  const { data: currentFicheSolutionData } = useImmutableSwrWithFetcher<FicheSolution[]>(
    estimationStep <= estimation.fiches_solutions_id.length
      ? makeFicheSolutionCompleteUrlApi(estimation.fiches_solutions_id[estimationStep - 1])
      : null,
  );

  const { data: nextFicheSolutionData } = useImmutableSwrWithFetcher<FicheSolution[]>(
    estimationStep <= estimation.fiches_solutions_id.length - 1
      ? makeFicheSolutionCompleteUrlApi(estimation.fiches_solutions_id[estimationStep])
      : null,
  );
  const currentFicheSolution = currentFicheSolutionData && currentFicheSolutionData[0];
  const nextFicheSolution = nextFicheSolutionData && nextFicheSolutionData[0];

  const stepperTitle = useMemo(
    () =>
      estimationStep === estimation.fiches_solutions_id.length + 1
        ? "Résumé de l'estimation"
        : `Estimation pour la solution ${currentFicheSolution?.attributes.titre}`,
    [currentFicheSolution?.attributes.titre, estimation.fiches_solutions_id.length, estimationStep],
  );
  const stepperNextTitle = useMemo(
    () =>
      nextFicheSolution
        ? `Estimation pour la solution ${nextFicheSolution?.attributes.titre}`
        : "Résumé de l'estimation",
    [nextFicheSolution],
  );
  const currentEstimationMateriaux = useMemo(() => {
    return estimation.estimations_fiches_solutions?.find((efm) => efm.fiche_solution_id == currentFicheSolution?.id);
  }, [estimation, currentFicheSolution]);

  const updateEstimationInStore = (estimation: EstimationWithAides) => {
    const currentProject = getCurrentProjet();
    if (currentProject) {
      updateProjetInStore({
        ...currentProject,
        estimations: upsert(currentProject.estimations, estimation),
      });
    }
  };

  const goToNextStep = () => {
    setEstimationStep(estimationStep + 1);
  };

  const goToPreviousStep = () => {
    if (estimationStep > 1) {
      setEstimationStep(estimationStep - 1);
    } else {
      estimationModal.close();
    }
  };

  const goToSpecificFicheSolutionStep = (ficheSolutionId: number) => {
    const index = estimation.fiches_solutions_id.findIndex((id) => +id === +ficheSolutionId);
    if (index != -1) {
      setEstimationStep(index + 1);
    }
  };

  return (
    <>
      <Stepper
        currentStep={estimationStep}
        nextTitle={stepperNextTitle}
        stepCount={estimation.fiches_solutions_id.length + 1}
        title={stepperTitle}
        className="max-w-[40rem]"
      />
      {currentFicheSolution && (
        <>
          {isSimpleMateriauFicheSolution(currentFicheSolution) ? (
            <>
              <div className="mb-4">{`Estimation pour votre solution ${currentFicheSolution.attributes.titre}`}</div>
              <EstimationMateriauSimpleFieldForm
                estimationId={estimation.id}
                ficheSolution={currentFicheSolution}
                estimationMateriaux={currentEstimationMateriaux}
                onClose={estimationModal.close}
                onPrevious={goToPreviousStep}
                onNext={goToNextStep}
                onUpdateEstimation={updateEstimationInStore}
              />
            </>
          ) : (
            <>
              <div className="mb-4">{`Pour votre solution ${currentFicheSolution.attributes.titre}, vous aurez
                besoin de choisir parmi les matériaux et systèmes suivants :`}</div>
              <EstimationMateriauForm
                estimationId={estimation.id}
                ficheSolution={currentFicheSolution}
                estimationMateriaux={currentEstimationMateriaux}
                onClose={estimationModal.close}
                onPrevious={goToPreviousStep}
                onNext={goToNextStep}
                onUpdateEstimation={updateEstimationInStore}
              />
            </>
          )}
        </>
      )}
      {estimationStep === estimation.fiches_solutions_id.length + 1 && (
        <EstimationMateriauxValidation
          estimationsFicheSolution={estimation.estimations_fiches_solutions}
          goToFicheSolutionStep={goToSpecificFicheSolutionStep}
          onClose={estimationModal.close}
          onPrevious={goToPreviousStep}
        />
      )}
    </>
  );
}
