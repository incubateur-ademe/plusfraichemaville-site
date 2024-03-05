"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@codegouvfr/react-dsfr/Button";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { estimation } from "@prisma/client";
import clsx from "clsx";
import { useApi } from "@/hooks/useApi";
import { APIResponseData } from "@/lib/strapi/types/types";
import FicheSolutionEstimationCard from "@/components/ficheSolution/FicheSolutionEstimationCard";
import { EstimationFormData, EstimationFormSchema } from "@/forms/estimation/EstimationFormSchema";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createEstimationAction } from "@/actions/estimation/create-estimation";
import { zodResolver } from "@hookform/resolvers/zod";

export const EstimationInfoForm = ({
  projet,
  estimation,
}: {
  projet: ProjetWithCollectivite;
  estimation?: estimation;
}) => {
  // TODO : utiliser swr de manière cohérente avec ce qui est fait pour le rajout de fiche solution
  const { data: ficheSolutions } = useApi<APIResponseData<"api::fiche-solution.fiche-solution">[]>(
    `/api/get-fiches-solutions?ficheSolutionIds=${JSON.stringify(projet.fiches_solutions_id)}`,
  );
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

    if (result.type === "success") {
      // TODO : rediriger vers la page d'estimation des matériaux
      // TODO : mettre à jour le store de manière cohérente avec ce qui est fait pour le rajout de fiche solution
    }
  };

  const disabled = form.formState.isSubmitting;

  return (
    <form id="user-info" onSubmit={form.handleSubmit(onSubmit)}>
      <div className={clsx("pfmv-strong-card pt-12 pb-12 px-12")}>
        <div className="mb-6 text-lg">{"Choisissez les solutions à estimer pour votre simulation"}</div>
        <div className={clsx("flex flex-wrap gap-6 mb-12")}>
          {ficheSolutions?.map((fs) => (
            <FicheSolutionEstimationCard
              key={fs.id}
              ficheSolution={fs}
              onClick={() => handleFicheSolutionChange(fs.id.toString())}
            >
              <Checkbox
                className="m-auto"
                {...form.register("ficheSolutionIds")}
                options={[
                  {
                    label: null,
                    nativeInputProps: {
                      value: fs.id.toString(),
                      onChange: () => handleFicheSolutionChange(fs.id.toString()),
                    },
                  },
                ]}
              />
            </FicheSolutionEstimationCard>
          ))}
        </div>
        <Button className={`rounded-3xl text-sm`} type="submit" disabled={disabled}>
          {"Faire une estimation"}
        </Button>
      </div>
    </form>
  );
};
