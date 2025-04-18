import { useLocalStorage } from "usehooks-ts";
import { BOOKMARK_FS_KEY, FichesBookmarked } from "./helpers";

export const useFicheLocalStorage = () => {
  const [fichesInStorage, setFichesInStorage] = useLocalStorage<FichesBookmarked[]>(BOOKMARK_FS_KEY, []);

  // Conversion des strings en numbers pour fichesIds
  const fichesBookmarkedConverted: FichesBookmarked[] = fichesInStorage.map((bookmark) => {
    if (typeof bookmark === "number" || typeof bookmark === "string") {
      return +bookmark;
    } else {
      return {
        ...bookmark,
        ficheSolutionIds: bookmark.ficheSolutionIds.map((id) => parseInt(id.toString(), 10)),
      };
    }
  });

  return [fichesBookmarkedConverted, setFichesInStorage] as const;
};
