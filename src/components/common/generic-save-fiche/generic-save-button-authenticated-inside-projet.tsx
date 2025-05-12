import { GenericSaveButtonElement } from "./generic-save-button-element";

import { selectSavedOrUnsavedAssets } from "./assets";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { updateFichesProjetAction } from "@/src/actions/projets/update-fiches-projet-action";
import { notifications } from "@/src/components/common/notifications";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { TypeUpdate } from "@/src/helpers/common";
import { checkIfFicheIsSaved } from "./helpers";

export const GenericSaveAuthenticatedInsideProjet = ({ opener, ...props }: GenericSaveFicheButtonWithOpener) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);

  const isSaved = projet && checkIfFicheIsSaved({ projet, ficheId: +props.id, typeFiche: props.type });

  const update = async () => {
    const update = await updateFichesProjetAction({
      projetId: projet?.id!,
      ficheId: +props.id,
      typeFiche: props.type,
      typeUpdate: isSaved ? TypeUpdate.delete : TypeUpdate.add,
    });
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
