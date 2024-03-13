"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@codegouvfr/react-dsfr/Button";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { estimation } from "@prisma/client";
import clsx from "clsx";

import { EstimationFormData, EstimationFormSchema } from "@/forms/estimation/EstimationFormSchema";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createEstimationAction } from "@/actions/estimation/create-estimation-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjetsStore } from "@/stores/projets/provider";
import { FicheSolutionSmallCardContainer } from "@/components/ficheSolution/fiche-solution-small-card-container";
import { FicheSolutionSmallCard } from "@/components/ficheSolution/fiche-solution-small-card";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useRouter } from "next/navigation";
import { notifications } from "@/components/common/notifications";

export const EstimationInfoForm = ({ projet }: { projet: ProjetWithRelations; estimation?: estimation }) => {
  const router = useRouter();

  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);
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
    defaultValues: { ficheSolutionIds: projet.fiches_solutions_id.map(String) },
  });

  const onSubmit: SubmitHandler<EstimationFormData> = async (data) => {
    const result = await createEstimationAction(projet.id, {
      ...data,
    });
    notifications(result.type, result.message);
    if (result.type === "success") {
      if (result.estimation) {
        // TODO : rediriger vers la page d'estimation des matériaux en ouvrant
        // la modif de l'estimation nouvellement créée
        updateProjetInStore({ ...projet, estimations: (projet.estimations || []).concat(result.estimation) });
        router.replace(PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(projet.id, `${result.estimation.id}`));
      }
    }
  };

  const disabled = form.formState.isSubmitting;

  return (
    <form id="create-estimation" onSubmit={form.handleSubmit(onSubmit)}>
      <FicheSolutionSmallCardContainer
        title=""
        subtitle="Choisissez les solutions à estimer pour votre simulation"
        className="pfmv-strong-card "
      >
        <div className={clsx("flex flex-wrap gap-6 mb-12")}>
          {projet.fiches_solutions_id?.map((ficheSolutionId) => (
            <FicheSolutionSmallCard
              key={ficheSolutionId}
              ficheSolutionId={ficheSolutionId}
              onClick={() => handleFicheSolutionChange(ficheSolutionId.toString())}
              className="pfmv-card cursor-pointer"
            >
              <div className="mt-4 flex place-content-center">
                <Checkbox
                  className="m-auto"
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
              </div>
            </FicheSolutionSmallCard>
          ))}
        </div>
        <Button className={`rounded-3xl`} type="submit" disabled={disabled}>
          {"Faire une estimation"}
        </Button>
      </FicheSolutionSmallCardContainer>
    </form>
  );
};
