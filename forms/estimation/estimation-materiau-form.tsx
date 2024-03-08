import { useMemo } from "react";
import Image from "next/image";
import CmsRichText from "@/components/common/CmsRichText";
import {
  getLabelCoutEntretien,
  getLabelCoutEntretienByQuantite,
  getLabelCoutFourniture,
  getLabelCoutFournitureByQuantite,
  getUniteCoutMateriauFromCode,
} from "@/helpers/coutMateriau";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/forms/estimation/estimation-materiau-form-schema";
import { FicheSolutionResponse, MateriauResponse } from "@/components/ficheSolution/type";
import InputFormField from "@/components/common/InputFormField";

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
    mode: "onBlur",
  });
  const watchAllFields = form.watch();

  const onSubmit: SubmitHandler<EstimationMateriauxFormData> = async (data) => {};

  const { fields } = useFieldArray({
    control: form.control,
    name: "estimationMateriaux",
  });

  const globalPrice = useMemo(() => {
    return ficheSolution.attributes.materiaux?.data.reduce(
      (acc, materiauCMS) => {
        const materiauField = watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +materiauCMS.id);
        return {
          entretien: {
            min:
              (materiauField?.quantite || 0) * (materiauCMS.attributes.cout_minimum_entretien || 0) + acc.entretien.min,
            max:
              (materiauField?.quantite || 0) * (materiauCMS.attributes.cout_maximum_entretien || 0) + acc.entretien.max,
          },
          fourniture: {
            min: (materiauField?.quantite || 0) * materiauCMS.attributes.cout_minimum_fourniture + acc.fourniture.min,
            max: (materiauField?.quantite || 0) * materiauCMS.attributes.cout_maximum_fourniture + acc.fourniture.max,
          },
        };
      },
      { entretien: { min: 0, max: 0 }, fourniture: { min: 0, max: 0 } },
    );
  }, [ficheSolution, watchAllFields]);

  return (
    <form id={`estimation-fiche-solution-${ficheSolution.id}`} onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className="text-[1.375rem] font-bold">{mat.titre}</div>
                  </div>
                  <CmsRichText label={mat.description} className="text-sm" />
                  <div className="text-dsfr-text-mention-grey text-sm">
                    <div>{`Coût d'investissement : ${getLabelCoutFourniture(mat)}`}</div>
                    <div>{`Coût d'entretien : ${getLabelCoutEntretien(mat)}`}</div>
                  </div>
                </div>
                <div className={"md:w-60 flex flex-col flex-none bg-dsfr-contrast-grey p-6"}>
                  <InputFormField
                    label={getUniteCoutMateriauFromCode(mat.cout_unite).estimationLabel}
                    type="number"
                    control={form.control}
                    path={`estimationMateriaux.${fields.findIndex((f) => +f.materiauId === +materiauId)}.quantite`}
                    whiteBackground
                  />
                  <div>Investissement</div>
                  <div className="font-bold mb-2">
                    {getLabelCoutFournitureByQuantite(
                      mat,
                      watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +materiauId)?.quantite || 0,
                    )}
                  </div>
                  <div>Entretien</div>
                  <div className="font-bold mb-2">
                    {getLabelCoutEntretienByQuantite(
                      mat,
                      watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +materiauId)?.quantite || 0,
                    )}
                  </div>
                </div>
              </div>
              <hr className="p-0 h-[1px] mb-4" />
            </div>
          ))}
          <div className="mt-8 text-[1.375rem] font-bold">{`Estimation pour ${ficheSolution.attributes.titre}`}</div>
          <div className="mt-8 text-[1.375rem] font-bold flex flex-row justify-between max-w-[30rem] ml-auto mr-0">
            <div>Investissement :</div>
            <div>
              <strong>{`${globalPrice?.fourniture.min} - ${globalPrice?.fourniture.max} € `}</strong>HT
            </div>
          </div>
          <div className="mt-2 text-lg flex flex-row justify-between max-w-[30rem] ml-auto mr-0">
            <div>Entretien :</div>
            <div>
              <strong>{`${globalPrice?.entretien.min} - ${globalPrice?.entretien.max} € `}</strong>HT par an
            </div>
          </div>
        </>
      ) : (
        <div className="text-dsfr-text-title-grey mb-4">Auncun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}
    </form>
  );
}
