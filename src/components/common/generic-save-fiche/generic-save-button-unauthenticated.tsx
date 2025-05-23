import { setBadgeOn, NotificationElements } from "@/src/helpers/notification-badge";
import { selectSavedOrUnsavedAssets } from "./assets";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { GenericSaveButtonElement } from "./generic-save-button-element";

import { useFicheLocalStorage } from "./use-fiche-local-storage";
import { useSaveBookmarks } from "./use-save-bookmarks";

export const GenericSaveUnauthenticated = ({ ...props }: GenericSaveFicheButtonWithOpener) => {
  const [fichesIds, setFichesIds] = useFicheLocalStorage();

  const { update, isBookmarked } = useSaveBookmarks(
    props.type,
    props.id,
    fichesIds,
    setFichesIds,
    props.projectName ?? "",
    props.opener,
  );

  const assets = selectSavedOrUnsavedAssets(isBookmarked, "common");
  const updater = () => {
    update();
    !isBookmarked && setBadgeOn(NotificationElements.selectionMenuItem);
  };
  return <GenericSaveButtonElement isSaved={isBookmarked} assets={assets} update={updater} {...props} />;
};
