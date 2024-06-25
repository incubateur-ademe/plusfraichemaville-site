import { addAideInEstimationAction } from "@/actions/estimation/add-aide-in-estimation-action";
import { deleteAideInEstimationAction } from "@/actions/estimation/delete-aide-in-estimation-action";
import { selectSavedOrUnsavedAssets } from "@/components/common/generic-save-fiche/assets";
import { GenericSaveButtonElement } from "@/components/common/generic-save-fiche/generic-save-button-element";
import { useGetSavedAideInEstimationId } from "@/hooks/use-get-aide-saved-in-estimation-id";
import clsx from "clsx";

type AideCardSaveButtonProps = {
  aideTerritoireId: number;
  estimationId: number;
  className?: string;
};

export const AideCardSaveButton = ({ aideTerritoireId, estimationId, className }: AideCardSaveButtonProps) => {
  const savedId = useGetSavedAideInEstimationId(estimationId, aideTerritoireId);
  const assets = selectSavedOrUnsavedAssets(!!savedId, "common");
  const updater = savedId
    ? () => deleteAideInEstimationAction(estimationId, savedId)
    : () => addAideInEstimationAction(estimationId, aideTerritoireId);

  return (
    <div className={clsx("absolute", className)}>
      <GenericSaveButtonElement
        type="diagnostic"
        withoutModal
        className=""
        update={updater}
        assets={assets}
        id={aideTerritoireId}
      />
    </div>
  );
};
