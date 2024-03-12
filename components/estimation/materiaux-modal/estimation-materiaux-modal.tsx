"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { estimation } from "@prisma/client";
import Stepper from "@codegouvfr/react-dsfr/Stepper";
import { useMemo, useState } from "react";
import CustomDSFRModal from "@/components/common/CustomDSFRModal";
import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import useSWR from "swr";
import EstimationMateriauForm from "@/forms/estimation/estimation-materiau-form";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/stores/projets/provider";
import { upsert } from "@/helpers/listUtils";
import { EstimationMateriauxValidation } from "@/components/estimation/materiaux-modal/estimation-materiaux-validation";

type EstimationCardDeleteModalProps = {
  estimation: estimation;
};

export function EstimationMateriauModal({ estimation }: EstimationCardDeleteModalProps) {
  let [estimationStep, setEstimationStep] = useState(1);

  const getCurrentProjet = useProjetsStore((state) => state.getCurrentProjet);
  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);

  const estimationMateriaux = estimation.materiaux as EstimationMateriauxFicheSolution[] | null;
  const fetcher = (fsId: number) => getFicheSolutionById(`${fsId}`);
  const { data: currentFicheSolution } = useSWR(
    `ficheSolution-${estimation.fiches_solutions_id[estimationStep - 1]}`,
    () => fetcher(estimation.fiches_solutions_id[estimationStep - 1]),
  );
  const { data: nextFicheSolution } = useSWR(
    estimationStep <= estimation.fiches_solutions_id.length - 1
      ? `ficheSolution-${estimation.fiches_solutions_id[estimationStep]}`
      : null,
    () => fetcher(estimation.fiches_solutions_id[estimationStep]),
  );
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
  const modal = createModal({
    id: `estimation-materiaux-modal-${estimation.id}`,
    isOpenedByDefault: false,
  });

  const updateEstimationInStore = (estimation: estimation) => {
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
      modal.close();
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
      <Button nativeButtonProps={modal.buttonProps} className="rounded-3xl">
        Modifier
      </Button>
      <CustomDSFRModal modalId={`estimation-materiaux-modal-${estimation.id}`}>
        <Stepper
          currentStep={estimationStep}
          nextTitle={stepperNextTitle}
          stepCount={estimation.fiches_solutions_id.length + 1}
          title={stepperTitle}
          className="max-w-[40rem]"
        />
        {currentFicheSolution && (
          <>
            <div className="mb-4">{`Pour votre solution ${currentFicheSolution.attributes.titre},
             vous aurez besoin de choisir parmi les matériaux et systèmes suivants :`}</div>
            <EstimationMateriauForm
              estimationId={estimation.id}
              ficheSolution={currentFicheSolution}
              estimationMateriaux={currentEstimationMateriaux}
              onClose={modal.close}
              onPrevious={goToPreviousStep}
              onNext={goToNextStep}
              onUpdateEstimation={updateEstimationInStore}
            />
          </>
        )}
        {estimationStep === estimation.fiches_solutions_id.length + 1 && estimationMateriaux && (
          <EstimationMateriauxValidation
            estimationsFicheSolution={estimationMateriaux}
            goToFicheSolutionStep={goToSpecificFicheSolutionStep}
          />
        )}
      </CustomDSFRModal>
    </>
  );
}
