import { addAideInEstimationAction } from "@/src/actions/estimation/add-aide-in-estimation-action";
import { deleteAideInEstimationAction } from "@/src/actions/estimation/delete-aide-in-estimation-action";
import { selectSavedOrUnsavedAssets } from "@/src/components/common/generic-save-fiche/assets";
import { GenericSaveButtonElement } from "@/src/components/common/generic-save-fiche/generic-save-button-element";
import { notifications } from "@/src/components/common/notifications";
import { Spinner } from "@/src/components/common/spinner";
import { useDelayedLoading } from "@/src/hooks/use-delayed-loading";
import { useGetSavedAideInEstimationId } from "@/src/hooks/use-get-aide-saved-in-estimation-id";
import { EstimationAide } from "@/src/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";

type AideCardSaveButtonProps = {
  aideTerritoireId: number;
  estimationId: number;
  className?: string;
};

export const AideCardSaveButton = ({ aideTerritoireId, estimationId, className }: AideCardSaveButtonProps) => {
  const { isLoading, startLoading, stopLoading } = useDelayedLoading(1000);
  const addAideInEstimation = useProjetsStore((state) => state.addAideInEstimation);
  const deleteAideInEstimation = useProjetsStore((state) => state.deleteAideInEstimation);
  const savedId = useGetSavedAideInEstimationId(estimationId, aideTerritoireId);
  const assets = selectSavedOrUnsavedAssets(!!savedId, "common");

  const updater = {
    delete: {
      action: () => deleteAideInEstimationAction(estimationId, savedId!),
      storeAction: () => deleteAideInEstimation(estimationId, aideTerritoireId),
    },
    add: {
      action: () => addAideInEstimationAction(estimationId, aideTerritoireId),
      storeAction: (estimationAide: EstimationAide) => addAideInEstimation(estimationId, estimationAide),
    },
  };

  const update = async () => {
    startLoading();

    const result = savedId ? await updater.delete.action() : await updater.add.action();

    if (result.type === "success") {
      savedId ? updater.delete.storeAction() : result.estimationAide && updater.add.storeAction(result.estimationAide);
    }

    stopLoading();

    notifications(result.type, result.message);
  };

  return (
    <div className={clsx("absolute z-10", className)}>
      {isLoading ? (
        <div className="z-10 rounded-full  bg-pfmv-navy">
          <Spinner />
        </div>
      ) : (
        <GenericSaveButtonElement className="" update={update} assets={assets} id={aideTerritoireId} />
      )}
    </div>
  );
};
