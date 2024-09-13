import { useEffect, useMemo } from "react";
import { EstimationMateriauxFicheSolution, EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FicheSolutionResponse } from "@/components/ficheSolution/type";

import Button from "@codegouvfr/react-dsfr/Button";

import EstimationMateriauGlobalPriceFooter from "@/forms/estimation/estimation-materiau-global-price-footer";
import { updateEstimationMateriauxAction } from "@/actions/estimation/update-estimation-materiaux-action";
import { notifications } from "@/components/common/notifications";
import { formatNumberWithSpaces, scrollToTop } from "@/helpers/common";
import { EstimationMateriauFieldUnique } from "./estimation-materiau-field-unique";
import {
  EstimationMateriauxSimpleFieldFormData,
  EstimationMateriauxFormSimpleFieldSchema,
} from "./estimation-materiau-form-simple-field-schema";
import InputFormField from "@/components/common/InputFormField";
import { getUniteCoutFromCode } from "@/helpers/cout/cout-common";
import { getLabelCoutEntretienByQuantite, getLabelCoutFournitureByQuantite } from "@/helpers/cout/cout-fiche-solution";

export default function EstimationMateriauSimpleFieldForm({
  ficheSolution,
  estimationId,
  onNext,
  onPrevious,
  onClose,
  onUpdateEstimation,
  estimationMateriaux,
}: {
  ficheSolution: FicheSolutionResponse;
  estimationMateriaux?: EstimationMateriauxFicheSolution;
  estimationId: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onUpdateEstimation: (_: EstimationWithAides) => void;
}) {
  const initialValues = useMemo(
    () => ({
      ficheSolutionId: +ficheSolution.id,
      quantite: estimationMateriaux?.quantite || 0,
    }),
    [estimationMateriaux?.estimationMateriaux, ficheSolution.id],
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
    const quantiteMateriau = watchAllFields.quantite || 0;

    return {
      entretien: {
        min: quantiteMateriau * (ficheSolution.attributes.cout_minimum_entretien || 0),
        max: quantiteMateriau * (ficheSolution.attributes.cout_maximum_entretien || 0),
      },
      fourniture: {
        min: quantiteMateriau * (ficheSolution.attributes.cout_minimum || 0),
        max: quantiteMateriau * (ficheSolution.attributes.cout_maximum || 0),
      },
    };
  }, [ficheSolution, watchAllFields]);

  const disabled = form.formState.isSubmitting;

  return (
    <>
      <form id={`estimation-fiche-solution-${ficheSolution.id}`} onSubmit={form.handleSubmit((data) => onSubmit(data))}>
        <EstimationMateriauFieldUnique ficheSolution={ficheSolution.attributes}>
          <InputFormField
            label={getUniteCoutFromCode(ficheSolution.attributes.cout_unite).estimationLabel}
            type="number"
            control={form.control}
            path="quantite"
            whiteBackground
          />
          <div>Investissement</div>
          <div className="mb-2 font-bold">
            {formatNumberWithSpaces(
              getLabelCoutFournitureByQuantite(ficheSolution.attributes, watchAllFields.quantite || 0),
            )}
          </div>
          <div>Entretien</div>
          <div className="mb-2 font-bold">
            {formatNumberWithSpaces(
              getLabelCoutEntretienByQuantite(ficheSolution.attributes, watchAllFields.quantite || 0),
            )}
          </div>
        </EstimationMateriauFieldUnique>

        <EstimationMateriauGlobalPriceFooter
          title={ficheSolution.attributes.titre}
          investissementMin={globalPrice?.fourniture.min}
          investissementMax={globalPrice?.fourniture.max}
          entretienMin={globalPrice?.entretien.min}
          entretienMax={globalPrice?.entretien.max}
        />
        <div className="flex items-center">
          <Button className={`mr-4 rounded-3xl !p-0`} onClick={form.handleSubmit(onSubmitAndNext)} disabled={disabled}>
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
  );
}
