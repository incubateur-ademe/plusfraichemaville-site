import { addAideInProjetAction } from "@/src/actions/projet/add-aide-in-projet-action";
import { deleteAideInProjetAction } from "@/src/actions/projet/delete-aide-in-projet-action";
import { GenericSaveButtonElement } from "@/src/components/common/generic-save-fiche/generic-save-button-element";
import { notifications } from "@/src/components/common/notifications";
import { useDelayedLoading } from "@/src/hooks/use-delayed-loading";
import { useGetSavedAideInProjetId } from "@/src/hooks/use-get-aide-saved-in-projet-id";
import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";

type AideCardSaveButtonProjetProps = {
  aideTerritoireId: number;
  projetId: number;
  className?: string;
};

export const AideCardSaveButtonProjet = ({ aideTerritoireId, projetId, className }: AideCardSaveButtonProjetProps) => {
  const { isLoading, startLoading, stopLoading } = useDelayedLoading(1000);
  const addAideInProjet = useProjetsStore((state) => state.addAideInProjet);
  const deleteAideInProjet = useProjetsStore((state) => state.deleteAideInProjet);
  const savedId = useGetSavedAideInProjetId(aideTerritoireId);

  const updater = {
    delete: {
      action: () => deleteAideInProjetAction(projetId, savedId!),
      storeAction: () => deleteAideInProjet(aideTerritoireId),
    },
    add: {
      action: () => addAideInProjetAction(projetId, aideTerritoireId),
      storeAction: (projetAide: ProjetAideWithAide) => addAideInProjet(projetAide),
    },
  };

  const update = async () => {
    startLoading();

    const result = savedId ? await updater.delete.action() : await updater.add.action();

    if (result.type === "success") {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      savedId ? updater.delete.storeAction() : result.projetAide && updater.add.storeAction(result.projetAide);
    }

    stopLoading();

    notifications(result.type, result.message);
  };

  return (
    <div className={clsx("absolute z-10", className)}>
      {isLoading ? (
        <div className={clsx("h-10 w-40 animate-pulse rounded-3xl bg-dsfr-contrast-grey", className)} />
      ) : (
        <GenericSaveButtonElement
          isSaved={!!savedId}
          className="mt-1"
          update={update}
          id={aideTerritoireId}
          labels={{ saved: "Sauvegardée", notSaved: "Sauvegarder" }}
          size="small"
        />
      )}
    </div>
  );
};
