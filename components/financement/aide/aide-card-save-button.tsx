import { addAideInEstimationAction } from "@/actions/estimation/add-aide-in-estimation-action";
import { selectSavedOrUnsavedAssets } from "@/components/common/generic-save-fiche/assets";
import { GenericSaveButtonElement } from "@/components/common/generic-save-fiche/generic-save-button-element";

type AideCardSaveButtonProps = {
  aideTerritoireId: number;
  estimationId: number;
};

export const AideCardSaveButton = ({ aideTerritoireId, estimationId }: AideCardSaveButtonProps) => {
  const assets = selectSavedOrUnsavedAssets(false, "common");
  console.log({ aideTerritoireId, estimationId });

  return (
    <div className="absolute right-2 top-2">
      <GenericSaveButtonElement
        type="diagnostic"
        withoutModal
        className=""
        update={() => addAideInEstimationAction(estimationId, aideTerritoireId)}
        assets={assets}
        id={aideTerritoireId}
      />
    </div>
  );
};
