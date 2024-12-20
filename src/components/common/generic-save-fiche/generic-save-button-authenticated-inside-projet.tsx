import { GenericSaveButtonElement } from "./generic-save-button-element";

import { selectSavedOrUnsavedAssets } from "./assets";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { updateFichesProjetAction } from "@/src/actions/projets/update-fiches-projet-action";
import { notifications } from "@/src/components/common/notifications";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { TypeFiche, TypeUpdate } from "@/src/helpers/common";

export const GenericSaveAuthenticatedInsideProjet = ({ opener, ...props }: GenericSaveFicheButtonWithOpener) => {
  const isSolution = props.type === TypeFiche.solution;
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);

  const isSaved = isSolution
    ? projet?.fiches_solutions_id.includes(+props.id)
    : projet?.fiches_diagnostic_id.includes(+props.id);

  const update = async () => {
    const update = await updateFichesProjetAction(
      projet?.id!,
      +props.id,
      props.type,
      isSaved ? TypeUpdate.delete : TypeUpdate.add,
    );
    if (update.projet) {
      addOrUpdateProjet(update.projet);
      !isSaved && !props.withoutModal && opener && opener();
    } else if (update.type === "error") {
      notifications(update.type, update.message);
    }
  };
  const assets = selectSavedOrUnsavedAssets(isSaved ?? false, "projet");

  const canEditProjet = useCanEditProjet(projet?.id);

  if (!canEditProjet) {
    return null;
  }

  return <GenericSaveButtonElement isSaved={isSaved} update={update} assets={assets} {...props} />;
};
