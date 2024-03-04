"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { notifications } from "@/components/common/notifications";
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
  const { data: ficheSolutions } = useApi<APIResponseData<"api::fiche-solution.fiche-solution">[]>(
    `/api/get-fiches-solutions?ficheSolutionIds=${JSON.stringify(projet.fiches_solutions_id)}`,
  );

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
      // TODO : rediriger vers la page d'estimation des matériaux
    }
  };

  const disabled = form.formState.isSubmitting;

  return (
    <form id="user-info" onSubmit={form.handleSubmit(onSubmit)}>
      <div className={clsx("pfmv-strong-card pt-12 pb-12 px-12")}>
        <div className="mb-6 text-lg">{"Choisissez les solutions à estimer pour votre simulation"}</div>
        <div className={clsx("flex flex-wrap gap-6 mb-12")}>
          {ficheSolutions?.map((fs) => (
            <FicheSolutionEstimationCard key={fs.id} ficheSolution={fs}>
              <Checkbox
                className="m-auto"
                {...form.register("ficheSolutionIds")}
                options={[
                  {
                    label: null,
                    nativeInputProps: {
                      value: fs.id,
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
