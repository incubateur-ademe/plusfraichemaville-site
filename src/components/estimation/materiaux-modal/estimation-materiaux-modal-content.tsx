"use client";

import { estimation } from "@prisma/client";
import Stepper from "@codegouvfr/react-dsfr/Stepper";
import { useEffect, useMemo, useState } from "react";
import EstimationMateriauForm from "@/src/forms/estimation/estimation-materiau-form";
import { EstimationMateriauxFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { upsert } from "@/src/helpers/listUtils";
// eslint-disable-next-line max-len
import { EstimationMateriauxValidation } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-validation";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import { FicheSolutionResponse } from "@/src/components/ficheSolution/type";
import { UNITE_COUT_MEGAWATTHEURE } from "@/src/helpers/cout/cout-common";
import EstimationMateriauSimpleFieldForm from "@/src/forms/estimation/estimation-materiau-form-simple-field";
import { estimationModal } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-container";

type EstimationCardDeleteModalProps = {
  estimation: estimation;
};

export function EstimationMateriauModalContent({ estimation }: EstimationCardDeleteModalProps) {
  const [estimationStep, setEstimationStep] = useState(1);

  useEffect(() => {
    setEstimationStep(1);
  }, [estimation.id]);

  const getCurrentProjet = useProjetsStore((state) => state.getCurrentProjet);
  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);

  const estimationMateriaux = estimation.materiaux as EstimationMateriauxFicheSolution[] | null;

  const { data: currentFicheSolutionData } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(
    estimationStep <= estimation.fiches_solutions_id.length
      ? makeFicheSolutionCompleteUrlApi(estimation.fiches_solutions_id[estimationStep - 1])
      : null,
  );

  const { data: nextFicheSolutionData } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(
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
    return estimationMateriaux?.find((em) => em.ficheSolutionId == currentFicheSolution?.id);
  }, [currentFicheSolution, estimationMateriaux]);

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

  const isSimpleForm = currentFicheSolution?.attributes.cout_unite === UNITE_COUT_MEGAWATTHEURE.code;

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
          {isSimpleForm ? (
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
      {estimationStep === estimation.fiches_solutions_id.length + 1 && estimationMateriaux && (
        <EstimationMateriauxValidation
          estimationsFicheSolution={estimationMateriaux}
          goToFicheSolutionStep={goToSpecificFicheSolutionStep}
          onClose={estimationModal.close}
          onPrevious={goToPreviousStep}
        />
      )}
    </>
  );
}
