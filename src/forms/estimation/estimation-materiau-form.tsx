import React, { useCallback, useEffect, useMemo } from "react";
import { EstimationFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EstimationMateriauxFormData,
  EstimationMateriauxFormSchema,
} from "@/src/forms/estimation/estimation-materiau-form-schema";
import InputFormField from "@/src/components/common/InputFormField";
import Button from "@codegouvfr/react-dsfr/Button";
import EstimationMateriauField from "@/src/forms/estimation/estimation-materiau-field";
import EstimationMateriauGlobalPriceFooter from "@/src/forms/estimation/estimation-materiau-global-price-footer";
import EditablePriceField from "@/src/forms/estimation/editable-price-field";
import { updateEstimationMateriauxAction } from "@/src/actions/estimation/update-estimation-materiaux-action";
import { notifications } from "@/src/components/common/notifications";

import {
  mapEstimationMateriauFormToDb,
  mapStrapiEstimationMateriauxToFormValues,
} from "@/src/lib/prisma/prismaCustomTypesHelper";
import { scrollToTop } from "@/src/helpers/common";
import { getLabelCoutEntretienByQuantite, getLabelCoutFournitureByQuantite } from "@/src/helpers/cout/cout-materiau";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { computePriceEstimationFicheSolution } from "@/src/helpers/estimation";

export default function EstimationMateriauForm({
  ficheSolution,
  estimationMateriaux,
  estimationId,
  onNext,
  onPrevious,
  onClose,
  onUpdateEstimation,
}: {
  ficheSolution: FicheSolution;
  estimationMateriaux?: EstimationFicheSolution;
  estimationId: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onUpdateEstimation: (_: EstimationWithAides) => void;
}) {
  const initialValues = useMemo(
    () => ({
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

  const closeAndNotif = () => {
    onClose();
    notifications("success", "ESTIMATION_VALIDATED");
  };

  const onSubmitAndNext = async (data: EstimationMateriauxFormData) => onSubmit(data, onNext);
  const onSubmitAndClose = async (data: EstimationMateriauxFormData) => onSubmit(data, closeAndNotif);
  const onSubmitAndPrevious = async (data: EstimationMateriauxFormData) => onSubmit(data, onPrevious);

  const onSubmit = async (data: EstimationMateriauxFormData, callback?: () => void) => {
    data.globalPrice = globalPrice;
    const actionResult = await updateEstimationMateriauxAction(estimationId, data);
    if (actionResult.type !== "success") {
      notifications(actionResult.type, actionResult.message);
    } else {
      if (actionResult.updatedEstimation) {
        onUpdateEstimation(actionResult.updatedEstimation);
      }
      if (callback) {
        callback();
      }
    }
  };
  const { fields } = useFieldArray({
    control: form.control,
    name: "estimationMateriaux",
  });

  const globalPrice = useMemo(() => {
    return computePriceEstimationFicheSolution(
      ficheSolution,
      watchAllFields.estimationMateriaux.map(mapEstimationMateriauFormToDb),
    );
  }, [ficheSolution, watchAllFields]);

  const disabled = form.formState.isSubmitting;

  const getMateriauFromId = useCallback(
    (materiauId: number) => ficheSolution.attributes.materiaux?.data.find((cmsMat) => +cmsMat.id === +materiauId),
    [ficheSolution.attributes.materiaux?.data],
  );

  return (
    <>
      {ficheSolution.attributes.materiaux?.data && ficheSolution.attributes.materiaux.data.length > 0 ? (
        <>
          <form
            id={`estimation-fiche-solution-${ficheSolution.id}`}
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
          >
            {fields.map((field, index) => (
              <EstimationMateriauField
                materiau={getMateriauFromId(+field.materiauId)}
                key={`${ficheSolution.id}${field.materiauId}${field.id}`}
              >
                <InputFormField
                  label={
                    getUniteCoutFromCode(getMateriauFromId(+field.materiauId)?.attributes.cout_unite).estimationLabel
                  }
                  type="number"
                  control={form.control}
                  path={`estimationMateriaux.${index}.quantite`}
                  whiteBackground
                  onFocus={(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => event.target?.select()}
                />
                <EditablePriceField
                  control={form.control}
                  setValue={form.setValue}
                  name={`estimationMateriaux.${index}.coutInvestissementOverride`}
                  label="Investissement"
                  calculatedValue={getLabelCoutFournitureByQuantite(
                    getMateriauFromId(+field.materiauId)?.attributes,
                    watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +field.materiauId)?.quantite || 0,
                  )}
                />
                <EditablePriceField
                  control={form.control}
                  setValue={form.setValue}
                  name={`estimationMateriaux.${index}.coutEntretienOverride`}
                  label="Entretien"
                  suffix={" € / an"}
                  calculatedValue={getLabelCoutEntretienByQuantite(
                    getMateriauFromId(+field.materiauId)?.attributes,
                    watchAllFields.estimationMateriaux.find((f) => +f.materiauId === +field.materiauId)?.quantite || 0,
                  )}
                />
              </EstimationMateriauField>
            ))}
            <EstimationMateriauGlobalPriceFooter
              title={ficheSolution.attributes.titre}
              investissementMin={globalPrice?.fourniture.min}
              investissementMax={globalPrice?.fourniture.max}
              entretienMin={globalPrice?.entretien.min}
              entretienMax={globalPrice?.entretien.max}
            />
            <div className="flex items-center">
              <Button
                className={`mr-4 rounded-3xl !p-0`}
                onClick={form.handleSubmit(onSubmitAndNext)}
                disabled={disabled}
              >
                <div
                  className="h-10 px-4 py-2"
                  onClick={() => scrollToTop(`#custom-estimation-materiaux-modal-${estimationId}`)}
                >
                  {"Suivant"}
                </div>
              </Button>
              <Button
                className={`mr-4 rounded-3xl`}
                onClick={form.handleSubmit(onSubmitAndClose)}
                disabled={disabled}
                priority="secondary"
              >
                {"Enregistrer et finir plus tard"}
              </Button>
              <Button
                className={`mr-4 rounded-3xl !p-0`}
                onClick={form.handleSubmit(onSubmitAndPrevious)}
                disabled={disabled}
                priority="tertiary"
              >
                <div
                  className="h-10 px-4 py-2"
                  onClick={() => scrollToTop(`#custom-estimation-materiaux-modal-${estimationId}`)}
                >
                  {"Précédent"}
                </div>
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="mb-4 text-dsfr-text-title-grey">Aucun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}{" "}
    </>
  );
}
