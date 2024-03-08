import React from "react";
import Image from "next/image";
import CmsRichText from "@/components/common/CmsRichText";
import { getLabelCoutEntretien, getLabelCoutFourniture, getUniteCoutMateriauFromCode } from "@/helpers/coutMateriau";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/forms/estimation/estimation-materiau-form-schema";
import Input from "@codegouvfr/react-dsfr/Input";
import { FicheSolutionResponse, MateriauResponse } from "@/components/ficheSolution/type";

export default function EstimationMateriauForm({
  ficheSolution,
  estimationMateriaux,
}: {
  ficheSolution: FicheSolutionResponse;
  estimationMateriaux?: EstimationMateriauxFicheSolution;
}) {
  const mapStrapiEstimationMateriauxToFormValues = (
    ficheSolutionMateriaux: MateriauResponse[] | undefined,
    defaultEstimationMateriaux: EstimationMateriauxFicheSolution | undefined,
  ) => {
    return ficheSolutionMateriaux?.map((materiau) => ({
      materiauId: `${materiau.id}`,
      quantite:
        defaultEstimationMateriaux?.estimationMateriaux?.find((e) => +e.materiauId == +materiau.id)?.quantite || 0,
    }));
  };

  const form = useForm<EstimationMateriauxFormData>({
    resolver: zodResolver(EstimationMateriauxFormSchema),
    defaultValues: {
      ficheSolutionId: ficheSolution.id,
      estimationMateriaux: mapStrapiEstimationMateriauxToFormValues(
        ficheSolution.attributes.materiaux?.data,
        estimationMateriaux,
      ),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "estimationMateriaux",
  });
  return (
    <div>
      {ficheSolution.attributes.materiaux?.data && ficheSolution.attributes.materiaux.data.length > 0 ? (
        <>
          {ficheSolution.attributes.materiaux.data.map(({ attributes: mat, id: materiauId }) => (
            <div key={materiauId}>
              <hr className="p-0 h-[1px]" />
              <div className={"flex flex-col md:flex-row gap-1 md:gap-6 justify-between"}>
                <div className="w-28 h-28 relative flex flex-none mt-8">
                  <Image
                    fill
                    src={getStrapiImageUrl(mat.image, STRAPI_IMAGE_KEY_SIZE.small)}
                    alt={mat.titre}
                    className={"object-cover rounded-2xl"}
                  />
                </div>
                <div className="mb-0 md:mb-8 mt-8 text-dsfr-text-title-grey grow">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-2xl font-bold">
                      {mat.titre} - {materiauId}
                    </div>
                  </div>
                  <CmsRichText label={mat.description} className="text-sm" />
                  <div className="text-dsfr-text-mention-grey text-sm">
                    <div>{`Coût d'investissement : ${getLabelCoutFourniture(mat)}`}</div>
                    <div>{`Coût d'entretien : ${getLabelCoutEntretien(mat)}`}</div>
                  </div>
                </div>
                <div className={"md:w-60 flex flex-col flex-none bg-dsfr-contrast-grey p-6"}>
                  <Input
                    label={getUniteCoutMateriauFromCode(mat.cout_unite).estimationLabel}
                    nativeInputProps={{
                      key: fields.find((f) => +f.materiauId === +materiauId)?.id,
                      ...form.register(
                        `estimationMateriaux.${fields.findIndex((f) => +f.materiauId === +materiauId)}.quantite`,
                      ),
                      style: { background: "white" },
                    }}
                  />
                </div>
              </div>
              <hr className="p-0 h-[1px] mb-4" />
            </div>
          ))}
        </>
      ) : (
        <div className="text-dsfr-text-title-grey mb-4">Auncun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}
    </div>
  );
}
