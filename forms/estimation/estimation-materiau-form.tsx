import { useCallback, useEffect, useMemo } from "react";
import {
  getLabelCoutEntretienByQuantite,
  getLabelCoutFournitureByQuantite,
  getUniteCoutMateriauFromCode,
} from "@/helpers/coutMateriau";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/forms/estimation/estimation-materiau-form-schema";
import { FicheSolutionResponse, MateriauResponse } from "@/components/ficheSolution/type";
import InputFormField from "@/components/common/InputFormField";
import Button from "@codegouvfr/react-dsfr/Button";
import EstimationMateriauField from "@/forms/estimation/estimation-materiau-field";
import EstimationMateriauGlobalPriceFooter from "@/forms/estimation/estimation-materiau-global-price-footer";

export default function EstimationMateriauForm({
  ficheSolution,
  estimationMateriaux,
  estimationId,
  onNext,
  onPrevious,
  onClose,
}: {
  ficheSolution: FicheSolutionResponse;
  estimationMateriaux?: EstimationMateriauxFicheSolution;
  estimationId: number;
  onNext: () => void;
  onPrevious?: () => void;
  onClose: () => void;
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

  const initialValues = useMemo(
    () => ({
      estimationId,
      ficheSolutionId: +ficheSolution.id,
      estimationMateriaux: mapStrapiEstimationMateriauxToFormValues(
        ficheSolution.attributes.materiaux?.data,
        estimationMateriaux,
      ),
    }),
    [estimationMateriaux, ficheSolution.attributes.materiaux?.data, ficheSolution.id],
  );
  const form = useForm<EstimationMateriauxFormData>({
    resolver: zodResolver(EstimationMateriauxFormSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const watchAllFields = form.watch();

  const onSubmit: SubmitHandler<EstimationMateriauxFormData> = async (data) => {
    onNext();
  };

  const { fields } = useFieldArray({
    control: form.control,
    name: "estimationMateriaux",
  });

  const globalPrice = useMemo(() => {
    return ficheSolution.attributes.materiaux?.data.reduce(
      (acc, materiauCMS) => {
        const quantiteMateriau =
          watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +materiauCMS.id)?.quantite || 0;
        return {
          entretien: {
            min: quantiteMateriau * (materiauCMS.attributes.cout_minimum_entretien || 0) + acc.entretien.min,
            max: quantiteMateriau * (materiauCMS.attributes.cout_maximum_entretien || 0) + acc.entretien.max,
          },
          fourniture: {
            min: quantiteMateriau * materiauCMS.attributes.cout_minimum_fourniture + acc.fourniture.min,
            max: quantiteMateriau * materiauCMS.attributes.cout_maximum_fourniture + acc.fourniture.max,
          },
        };
      },
      { entretien: { min: 0, max: 0 }, fourniture: { min: 0, max: 0 } },
    );
  }, [ficheSolution, watchAllFields]);

  const disabled = form.formState.isSubmitting;

  const getMateriauFromId = useCallback(
    (materiauId: number) => ficheSolution.attributes.materiaux?.data.find((cmsMat) => +cmsMat.id === +materiauId),
    [ficheSolution.attributes.materiaux?.data],
  );

  return (
    <form id={`estimation-fiche-solution-${ficheSolution.id}`} onSubmit={form.handleSubmit(onSubmit)}>
      <>
        {ficheSolution.attributes.materiaux?.data && ficheSolution.attributes.materiaux.data.length > 0 ? (
          <>
            {fields.map((field, index) => (
              <EstimationMateriauField materiau={getMateriauFromId(+field.materiauId)} key={field.materiauId}>
                <InputFormField
                  label={
                    getUniteCoutMateriauFromCode(getMateriauFromId(+field.materiauId)?.attributes.cout_unite)
                      .estimationLabel
                  }
                  type="number"
                  control={form.control}
                  path={`estimationMateriaux.${index}.quantite`}
                  whiteBackground
                />
                <div>Investissement</div>
                <div className="font-bold mb-2">
                  {getLabelCoutFournitureByQuantite(
                    getMateriauFromId(+field.materiauId)?.attributes,
                    watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +field.materiauId)?.quantite || 0,
                  )}
                </div>
                <div>Entretien</div>
                <div className="font-bold mb-2">
                  {getLabelCoutEntretienByQuantite(
                    getMateriauFromId(+field.materiauId)?.attributes,
                    watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +field.materiauId)?.quantite || 0,
                  )}
                </div>
              </EstimationMateriauField>
            ))}
            <EstimationMateriauGlobalPriceFooter
              title={ficheSolution.attributes.titre}
              investissementMin={globalPrice?.fourniture.min}
              investissementMax={globalPrice?.fourniture.max}
              entretienMin={globalPrice?.entretien.min}
              entretienMax={globalPrice?.entretien.max}
            />
            <Button className={`rounded-3xl mr-4`} onClick={() => form.handleSubmit(onSubmit)} disabled={disabled}>
              {"Suivant"}
            </Button>
            <Button className={`rounded-3xl mr-4`} onClick={() => onClose()} disabled={disabled} priority="secondary">
              {"Enregistrer et finir plus tard"}
            </Button>
            {onPrevious && (
              <Button
                className={`rounded-3xl mr-4`}
                onClick={() => onPrevious()}
                disabled={disabled}
                priority="tertiary"
              >
                {"Précédent"}
              </Button>
            )}
          </>
        ) : (
          <div className="text-dsfr-text-title-grey mb-4">Auncun matériau n{"'"}a été renseigné pour cette fiche</div>
        )}{" "}
      </>
    </form>
  );
}
