import { GenericSaveBase } from "./base";
import { selectSavedOrUnsavedAssets } from "./helpers";
import { useSaveBookmarks } from "./use-save-bookmarks";
import { GenericSaveFicheButtonCommonProps } from ".";
import { useFicheLocalStorage } from "./use-fiche-local-storage";

export const GenericSaveUnauthenticated = ({ id, type, projectName }: GenericSaveFicheButtonCommonProps) => {
  const opener = () => {};
  const [fichesInStorage, setFichesInStorage] = useFicheLocalStorage(type);

  const { isBookmarked, changeFavorite } = useSaveBookmarks(
    type,
    id,
    fichesInStorage,
    setFichesInStorage,
    projectName ?? "",
    opener,
  );
  const assets = selectSavedOrUnsavedAssets(isBookmarked, "common");

  return <GenericSaveBase assets={assets} update={changeFavorite} />;
};

// const actions = {
//   diagnostic: {
//     add: () => {},
//     delete: () => {},
//   },
//   solution: {
//     add: () => {},
//     delete: () => {},
//   },
// };

// const currentActions = actions[type];
