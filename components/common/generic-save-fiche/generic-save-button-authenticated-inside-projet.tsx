import { GenericSaveButtonElement } from "./generic-save-button-element";

import { selectSavedOrUnsavedAssets } from "./assets";
import { useProjetsStore } from "@/stores/projets/provider";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { updateFichesProjetAction } from "@/actions/projets/update-fiches-projet-action";
import { notifications } from "@/components/common/notifications";

export const GenericSaveAuthenticatedInsideProjet = ({ opener, ...props }: GenericSaveFicheButtonWithOpener) => {
  const isSolution = props.type === "solution";
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const update = async () => {
    const update = await updateFichesProjetAction(projet?.id!, +props.id, props.type);
    if (update.projet) {
      addOrUpdateProjet(update.projet);
      !isSaved && !props.withoutModal && opener && opener();
    } else if (update.type === "error") {
      notifications(update.type, update.message);
    }
  };

  const isSaved = isSolution
    ? projet?.fiches_solutions_id.includes(+props.id)
    : projet?.fiches_diagnostic_id.includes(+props.id);

  const assets = selectSavedOrUnsavedAssets(isSaved ?? false, "projet");

  return <GenericSaveButtonElement isSaved={isSaved} update={update} assets={assets} {...props} />;
};
