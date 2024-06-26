import { addAideInEstimationAction } from "@/actions/estimation/add-aide-in-estimation-action";
import { deleteAideInEstimationAction } from "@/actions/estimation/delete-aide-in-estimation-action";
import { selectSavedOrUnsavedAssets } from "@/components/common/generic-save-fiche/assets";
import { GenericSaveButtonElement } from "@/components/common/generic-save-fiche/generic-save-button-element";
import { notifications } from "@/components/common/notifications";
import { useGetSavedAideInEstimationId } from "@/hooks/use-get-aide-saved-in-estimation-id";
import { EstimationAide } from "@/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/stores/projets/provider";
import clsx from "clsx";

type AideCardSaveButtonProps = {
  aideTerritoireId: number;
  estimationId: number;
  className?: string;
};

export const AideCardSaveButton = ({ aideTerritoireId, estimationId, className }: AideCardSaveButtonProps) => {
  const addAideInEstimation = useProjetsStore((state) => state.addAideInEstimation);
  const deleteAideInEstimation = useProjetsStore((state) => state.deleteAideInEstimation);
  const savedId = useGetSavedAideInEstimationId(estimationId, aideTerritoireId);
  const assets = selectSavedOrUnsavedAssets(!!savedId, "common");

  const updater = {
    delete: {
      action: () => deleteAideInEstimationAction(estimationId, aideTerritoireId),
      storeAction: () => deleteAideInEstimation(estimationId, aideTerritoireId),
    },
    add: {
      action: () => addAideInEstimationAction(estimationId, aideTerritoireId),
      storeAction: (estimationAide: EstimationAide) => addAideInEstimation(estimationId, estimationAide),
    },
  };

  const update = async () => {
    const result = savedId ? await updater.delete.action() : await updater.add.action();
    if (result.type === "success") {
      savedId ? updater.delete.storeAction() : result.estimationAide && updater.add.storeAction(result.estimationAide);
    }

    notifications(result.type, result.message);
  };

  return (
    <div className={clsx("absolute", className)}>
      <GenericSaveButtonElement
        type="aide"
        withoutModal
        className=""
        update={update}
        assets={assets}
        id={aideTerritoireId}
      />
    </div>
  );
};
