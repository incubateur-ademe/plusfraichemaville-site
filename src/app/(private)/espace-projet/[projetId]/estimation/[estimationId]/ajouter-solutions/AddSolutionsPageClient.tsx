"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { EstimationFormData, EstimationFormSchema } from "@/src/forms/estimation/EstimationFormSchema";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { FicheSolutionSmallCardContainer } from "@/src/components/ficheSolution/fiche-solution-small-card-container";
import { FicheSolutionSmallCard } from "@/src/components/ficheSolution/fiche-solution-small-card";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useRouter, useParams } from "next/navigation";
import { notifications } from "@/src/components/common/notifications";
import { useModalStore } from "@/src/stores/modal/provider";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { addFichesSolutionsToEstimationAction } from "@/src/actions/estimation/add-fiches-solutions-to-estimation-action";
import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_MES_ESTIMATIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-estimation";
import { useMemo } from "react";

export default function AddSolutionsPageClient() {
  const router = useRouter();
  const params = useParams();
  const estimationId = Number(params.estimationId);

  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);
  const setCurrentEstimation = useModalStore((state) => state.setCurrentEstimation);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  const estimation = useMemo(() => {
    if (currentProjet && estimationId) {
      return currentProjet.estimations.find((e) => e.id === estimationId);
    }
  }, [currentProjet, estimationId]);

  const projetFichesSolutionsIds =
    getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution }) ?? [];

  const fichesSolutionsIdsNotInEstimation = useMemo(() => {
    if (!estimation) return [];
    const estimationFicheSolutionIds = estimation.estimations_fiches_solutions.map((efs) => efs.fiche_solution_id);
    return projetFichesSolutionsIds.filter((id) => !estimationFicheSolutionIds.includes(id));
  }, [estimation, projetFichesSolutionsIds]);

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

  const onSubmit: SubmitHandler<EstimationFormData> = async (data) => {
    if (!currentProjet || !estimation) return;

    const result = await addFichesSolutionsToEstimationAction(estimationId, data);
    if (result.type === "success") {
      notifications(result.type, result.message);
      if (result.estimation) {
        const updatedEstimations = currentProjet.estimations.map((e) =>
          e.id === result.estimation!.id ? result.estimation! : e,
        );
        updateProjetInStore({ ...currentProjet, estimations: updatedEstimations });

        const firstAddedFicheSolutionIndex = result.estimation.estimations_fiches_solutions.findIndex(
          (efs) =>
            !estimation.estimations_fiches_solutions.find(
              (originalEfs) => originalEfs.fiche_solution_id === efs.fiche_solution_id,
            ),
        );

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

  const handleCancel = () => {
    router.push(PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(currentProjet!.id));
  };

  if (!currentProjet || !estimation) {
    return null;
  }

  const disabled = form.formState.isSubmitting;
  const { error } = form.getFieldState("ficheSolutionIds");

  return (
    <ProtectedEspaceProjetUrl>
      <BannerProjetBreadcrumb step={BREADCRUMB_MES_ESTIMATIONS} />
      <div className="fr-container pt-8">
        <h1 className="mb-2 text-2xl font-bold">Ajouter des solutions à l'estimation</h1>
        {fichesSolutionsIdsNotInEstimation.length === 0 ? (
          <>
            <p className="text-lg">Toutes les solutions du projet sont déjà présentes dans cette estimation.</p>
            <Button className="mt-4 rounded-3xl" onClick={handleCancel}>
              Retour
            </Button>
          </>
        ) : (
          <>
            <div className="mb-10 text-lg">
              {`Sélectionnez les solutions que vous souhaitez ajouter à votre estimation.`}
            </div>
            <form id="add-solutions-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FicheSolutionSmallCardContainer title="" subtitle="Solutions disponibles" className="pfmv-strong-card">
                <div className={clsx("mb-12 flex flex-wrap gap-6")}>
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

                <div className="flex gap-4">
                  <Button className={`rounded-3xl bg-pfmv-navy`} type="submit" disabled={disabled}>
                    {"Valider"}
                  </Button>
                  <Button className="rounded-3xl" priority="secondary" onClick={handleCancel} type="button">
                    {"Annuler"}
                  </Button>
                </div>
                {error && <p className={clsx("fr-error-text !text-base", "mb-4")}>{error.message}</p>}
              </FicheSolutionSmallCardContainer>
            </form>
          </>
        )}
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
