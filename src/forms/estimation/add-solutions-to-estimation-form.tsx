"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@codegouvfr/react-dsfr/Button";
import { EstimationFormData, EstimationFormSchema } from "@/src/forms/estimation/EstimationFormSchema";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { FicheSolutionSmallCardContainer } from "@/src/components/ficheSolution/fiche-solution-small-card-container";
import { FicheSolutionSmallCard } from "@/src/components/ficheSolution/fiche-solution-small-card";
import { addFichesSolutionsToEstimationAction } from "@/src/actions/estimation/add-fiches-solutions-to-estimation-action";
import { notifications } from "@/src/components/common/notifications";
import { EstimationWithAidesDto, ProjetWithRelationsDto } from "@/src/types/dto";
import { useRouter } from "next/navigation";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useModalStore } from "@/src/stores/modal/provider";
import { PFMV_ROUTES } from "@/src/helpers/routes";

type AddSolutionsToEstimationFormProps = {
  estimation: EstimationWithAidesDto;
  currentProjet: ProjetWithRelationsDto;
  fichesSolutionsIdsNotInEstimation: number[];
};

export const AddSolutionsToEstimationForm = ({
  estimation,
  currentProjet,
  fichesSolutionsIdsNotInEstimation,
}: AddSolutionsToEstimationFormProps) => {
  const router = useRouter();
  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);
  const setCurrentEstimation = useModalStore((state) => state.setCurrentEstimation);
  const handleFicheSolutionChange = (ficheSolutionId: string) => {
    const currentFicheSolutionIds = form.getValues("ficheSolutionIds");
    if (currentFicheSolutionIds.indexOf(ficheSolutionId) === -1)
      form.setValue("ficheSolutionIds", [...currentFicheSolutionIds, ficheSolutionId]);
    else {
      form.setValue(
        "ficheSolutionIds",
        currentFicheSolutionIds.filter((id) => id !== ficheSolutionId),
      );
    }
  };

  const form = useForm<EstimationFormData>({
    resolver: zodResolver(EstimationFormSchema),
    defaultValues: { ficheSolutionIds: fichesSolutionsIdsNotInEstimation.map(String) },
  });

  const handleCancel = () => {
    router.push(PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(currentProjet.id));
  };

  const onSubmit: SubmitHandler<EstimationFormData> = async (data) => {
    const result = await addFichesSolutionsToEstimationAction(estimation.id, data);
    if (result.type === "success") {
      notifications(result.type, result.message);
      if (result.estimation) {
        const firstAddedFicheSolutionIndex = result.estimation.estimationsFichesSolutions.findIndex(
          (efs) =>
            !estimation.estimationsFichesSolutions.find(
              (originalEfs) => originalEfs.ficheSolutionId === efs.ficheSolutionId,
            ),
        );

        const updatedEstimations = currentProjet.estimations.map((e) =>
          e.id === result.estimation!.id ? result.estimation! : e,
        );
        updateProjetInStore({ ...currentProjet, estimations: updatedEstimations });

        setCurrentEstimation({
          id: result.estimation.id,
          startingStep: firstAddedFicheSolutionIndex !== -1 ? firstAddedFicheSolutionIndex + 1 : 1,
        });

        router.push(PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(currentProjet.id));
      }
    } else {
      notifications(result.type, result.message);
    }
  };

  const disabled = form.formState.isSubmitting;
  const { error } = form.getFieldState("ficheSolutionIds");

  if (fichesSolutionsIdsNotInEstimation.length === 0) {
    return (
      <>
        <p className="text-lg">Toutes les solutions du projet sont déjà présentes dans cette estimation.</p>
        <Button className="mt-4 rounded-3xl" onClick={handleCancel}>
          Retour
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="mb-10 text-lg">Sélectionnez les solutions que vous souhaitez ajouter à votre estimation.</div>
      <form id="add-solutions-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FicheSolutionSmallCardContainer title="Solutions disponibles" className="pfmv-strong-card">
          <div className="mb-12 flex flex-wrap gap-6">
            {fichesSolutionsIdsNotInEstimation.map((ficheSolutionId) => (
              <FicheSolutionSmallCard
                key={ficheSolutionId}
                ficheSolutionId={ficheSolutionId}
                onClick={() => handleFicheSolutionChange(ficheSolutionId.toString())}
                className="pfmv-card cursor-pointer"
              >
                <Checkbox
                  className="mt-4 h-6"
                  options={[
                    {
                      label: null,
                      nativeInputProps: {
                        value: ficheSolutionId.toString(),
                        ...form.register("ficheSolutionIds"),
                        onChange: () => handleFicheSolutionChange(ficheSolutionId.toString()),
                      },
                    },
                  ]}
                />
              </FicheSolutionSmallCard>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button className="rounded-3xl bg-pfmv-navy" type="submit" disabled={disabled}>
              {"Valider"}
            </Button>
            <Button className="rounded-3xl" priority="secondary" onClick={handleCancel} type="button">
              {"Annuler"}
            </Button>
          </div>
          {error && <p className="fr-error-text mb-4 !text-base">{error.message}</p>}
        </FicheSolutionSmallCardContainer>
      </form>
    </>
  );
};
