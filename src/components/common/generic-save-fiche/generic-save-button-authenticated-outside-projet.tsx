import { GenericSaveButtonElement } from "./generic-save-button-element";
import { useUserStore } from "@/src/stores/user/provider";
import { selectSavedOrUnsavedAssets } from "./assets";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { isFicheBookmarked } from "./helpers";
import { setBadgeOn, NotificationElements } from "@/src/helpers/notification-badge";
import { TypeFiche } from "@/src/helpers/common";

export const GenericSaveAuthenticatedOutsideProjet = ({ opener, ...props }: GenericSaveFicheButtonWithOpener) => {
  const isSolution = props.type === TypeFiche.solution;
  const userFichesSolutions = useUserStore((state) => state.userInfos?.selection_fiches_solutions) as number[];
  const userFichesDiagnostic = useUserStore((state) => state.userInfos?.selection_fiches_diagnostic) as number[];
  const currentFiches = isSolution ? userFichesSolutions : userFichesDiagnostic;
  const isSaved = isFicheBookmarked(currentFiches, props.id, props.projectName ?? "");
  const updater = useUserStore((state) => state.updateFichesUser);
  const update = () => {
    updater(props.type, props.id, props.projectName ?? "");
    !isSaved && opener && opener();
    !isSaved && setBadgeOn(NotificationElements.selectionMenuItem);
  };

  const assets = selectSavedOrUnsavedAssets(isSaved, "common");

  return <GenericSaveButtonElement isSaved={isSaved} update={update} assets={assets} {...props} />;
};
