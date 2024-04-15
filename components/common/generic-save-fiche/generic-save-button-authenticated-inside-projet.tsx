import { GenericSaveButtonElement } from "./generic-save-button-element";

import { selectSavedOrUnsavedAssets } from "./assets";
import { useProjetsStore } from "@/stores/projets/provider";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";

export const GenericSaveAuthenticatedInsideProjet = ({ opener, ...props }: GenericSaveFicheButtonWithOpener) => {
  const isSolution = props.type === "solution";
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const updater = useProjetsStore((state) => state.updateSelectedFiches);
  const update = () => {
    updater(props.type, props.id, projet?.id!);

    !isSaved && !props.withoutModal && opener && opener();
  };

  const isSaved = isSolution
    ? projet?.fiches_solutions_id.includes(+props.id)
    : projet?.fiches_diagnostic_id.includes(+props.id);

  const assets = selectSavedOrUnsavedAssets(isSaved ?? false, "projet");

  return <GenericSaveButtonElement isSaved={isSaved} update={update} assets={assets} {...props} />;
};
