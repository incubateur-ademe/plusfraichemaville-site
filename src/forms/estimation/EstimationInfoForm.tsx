"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@codegouvfr/react-dsfr/Button";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { estimation } from "@/src/generated/prisma/client";
import clsx from "clsx";

import { EstimationFormData, EstimationFormSchema } from "@/src/forms/estimation/EstimationFormSchema";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createEstimationAction } from "@/src/actions/estimation/create-estimation-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { FicheSolutionSmallCardContainer } from "@/src/components/ficheSolution/fiche-solution-small-card-container";
import { FicheSolutionSmallCard } from "@/src/components/ficheSolution/fiche-solution-small-card";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useRouter } from "next/navigation";
import { notifications } from "@/src/components/common/notifications";
import { useModalStore } from "@/src/stores/modal/provider";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const EstimationInfoForm = ({ projet }: { projet: ProjetWithRelations; estimation?: estimation }) => {
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

  const projetFichesSolutionsIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution }) ?? [];

  const form = useForm<EstimationFormData>({
    resolver: zodResolver(EstimationFormSchema),
    defaultValues: { ficheSolutionIds: projetFichesSolutionsIds.map(String) },
  });

  const onSubmit: SubmitHandler<EstimationFormData> = async (data) => {
    const result = await createEstimationAction(projet.id, {
      ...data,
    });
    if (result.type === "success") {
      notifications(result.type, result.message);
      if (result.estimation) {
        updateProjetInStore({ ...projet, estimations: (projet.estimations || []).concat(result.estimation) });
        setCurrentEstimation({ id: result.estimation.id, startingStep: 1 });
        setTimeout(function () {
          router.replace(PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(projet.id));
        }, 1000);
      } else {
        notifications(result.type, result.message);
      }
    }
  };

  const disabled = form.formState.isSubmitting;
  const { error } = form.getFieldState("ficheSolutionIds");

  return (
    <form id="create-estimation-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FicheSolutionSmallCardContainer
        title="Choisissez les solutions à estimer pour votre simulation"
        className="pfmv-strong-card"
      >
        <div className={clsx("mb-12 flex flex-wrap gap-6")}>
          {projetFichesSolutionsIds.map((ficheSolutionId) => (
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

        <Button className={`rounded-3xl bg-pfmv-navy`} type="submit" disabled={disabled}>
          {"Faire une estimation"}
        </Button>
        {error && <p className="fr-error-text mb-4 !text-base">{error.message}</p>}
      </FicheSolutionSmallCardContainer>
    </form>
  );
};
