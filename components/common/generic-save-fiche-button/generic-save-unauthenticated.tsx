import { GenericSaveBase } from "./base";
import { selectSavedOrUnsavedAssets } from "./helpers";
import { useSaveBookmarksSolution } from "./hooks";
import { useLocalStorage } from "usehooks-ts";
import { ProjectBookmarks, BOOKMARK_FS_KEY } from "@/helpers/bookmarkedFicheSolutionHelper";

export const GenericSaveUnauthenticated = () => {
  const ficheSolutionId = 1;
  const projectName = "";
  const opener = () => {};
  const [bookmarkedFichesSolutions, setBookmarkedFichesSolutions] = useLocalStorage<ProjectBookmarks[]>(
    BOOKMARK_FS_KEY,
    [],
  );

  const { isBookmarked } = useSaveBookmarksSolution(
    ficheSolutionId,
    bookmarkedFichesSolutions,
    setBookmarkedFichesSolutions,
    projectName,
    opener,
  );

  const assets = selectSavedOrUnsavedAssets(isBookmarked, "common");

  return <GenericSaveBase assets={assets} />;
};
