import React, { useEffect, useMemo } from "react";
import { EstimationFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@codegouvfr/react-dsfr/Button";

import EstimationMateriauGlobalPriceFooter from "@/src/forms/estimation/estimation-materiau-global-price-footer";
import { updateEstimationMateriauxAction } from "@/src/actions/estimation/update-estimation-materiaux-action";
import { notifications } from "@/src/components/common/notifications";
import { formatNumberWithSpaces, scrollToTop } from "@/src/helpers/common";
import { EstimationMateriauFieldUnique } from "./estimation-materiau-field-unique";
import {
  EstimationMateriauxFormSimpleFieldSchema,
  EstimationMateriauxSimpleFieldFormData,
} from "./estimation-materiau-form-simple-field-schema";
import InputFormField from "@/src/components/common/InputFormField";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import {
  getLabelCoutEntretienByQuantite,
  getLabelCoutFournitureByQuantite,
} from "@/src/helpers/cout/cout-fiche-solution";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import EditablePriceField from "@/src/forms/estimation/editable-price-field";
import { computePriceEstimationSimpleFicheSolution } from "@/src/helpers/estimation";
import { mapEstimationSimpleFicheSolutionFormToDb } from "@/src/lib/prisma/prismaCustomTypesHelper";

export default function EstimationMateriauSimpleFieldForm({
  ficheSolution,
  estimationId,
  onNext,
  onPrevious,
  onClose,
  onUpdateEstimation,
  estimationMateriaux,
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
      coutInvestissementOverride: estimationMateriaux?.cout_investissement_override ?? undefined,
      coutEntretienOverride: estimationMateriaux?.cout_entretien_override ?? undefined,
      quantite: estimationMateriaux?.quantite || 0,
    }),
    [estimationMateriaux, ficheSolution.id],
  );
  const form = useForm<EstimationMateriauxSimpleFieldFormData>({
    resolver: zodResolver(EstimationMateriauxFormSimpleFieldSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const watchAllFields = form.watch();

  const onSubmitAndNext = async (data: EstimationMateriauxSimpleFieldFormData) => onSubmit(data, onNext);
  const onSubmitAndClose = async (data: EstimationMateriauxSimpleFieldFormData) => onSubmit(data, onClose);
  const onSubmitAndPrevious = async (data: EstimationMateriauxSimpleFieldFormData) => onSubmit(data, onPrevious);

  const onSubmit = async (data: EstimationMateriauxSimpleFieldFormData, callback?: () => void) => {
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
  const globalPrice = useMemo(() => {
    return computePriceEstimationSimpleFicheSolution(
      ficheSolution,
      mapEstimationSimpleFicheSolutionFormToDb(watchAllFields),
    );
  }, [ficheSolution, watchAllFields]);

  const disabled = form.formState.isSubmitting;

  return (
    <>
      <form
        id={`estimation-fiche-solution-${ficheSolution.id}-form`}
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        <EstimationMateriauFieldUnique ficheSolutionAttributes={ficheSolution.attributes} key={ficheSolution.id}>
          <InputFormField
            label={getUniteCoutFromCode(ficheSolution.attributes.cout_unite).estimationLabel}
            type="number"
            control={form.control}
            path="quantite"
            whiteBackground
            onFocus={(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => event.target?.select()}
          />
          <EditablePriceField
            control={form.control}
            setValue={form.setValue}
            name="coutInvestissementOverride"
            label="Investissement"
            calculatedValue={formatNumberWithSpaces(
              getLabelCoutFournitureByQuantite(ficheSolution.attributes, watchAllFields.quantite || 0),
            )}
          />
          <EditablePriceField
            control={form.control}
            setValue={form.setValue}
            name="coutEntretienOverride"
            label="Entretien"
            suffix={" € / an"}
            calculatedValue={formatNumberWithSpaces(
              getLabelCoutEntretienByQuantite(ficheSolution.attributes, watchAllFields.quantite || 0),
            )}
          />
        </EstimationMateriauFieldUnique>

        <EstimationMateriauGlobalPriceFooter
          title={ficheSolution.attributes.titre}
          investissementMin={globalPrice?.fourniture.min}
          investissementMax={globalPrice?.fourniture.max}
          entretienMin={globalPrice?.entretien.min}
          entretienMax={globalPrice?.entretien.max}
        />
        <div className="ml-auto mr-0 mt-10 flex w-fit items-center gap-4">
          <Button
            className="rounded-3xl !p-0"
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
          <Button
            className="rounded-3xl"
            onClick={form.handleSubmit(onSubmitAndClose)}
            disabled={disabled}
            priority="secondary"
          >
            {"Enregistrer et finir plus tard"}
          </Button>
          <Button className="rounded-3xl !p-0" onClick={form.handleSubmit(onSubmitAndNext)} disabled={disabled}>
            <div
              className="h-10 px-4 py-2"
              onClick={() => scrollToTop(`#custom-estimation-materiaux-modal-${estimationId}`)}
            >
              {"Suivant"}
            </div>
          </Button>
        </div>
      </form>
    </>
  );
}
