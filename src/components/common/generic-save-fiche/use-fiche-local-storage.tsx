import { useLocalStorage } from "usehooks-ts";
import { FichesBookmarked, BOOKMARK_FS_KEY, FICHE_DIAGNOSTIC_IDS_STORAGE_KEY } from "./helpers";
import { TypeFiche } from "@/src/helpers/common";

export const useFicheLocalStorage = (type: TypeFiche) => {
  const isSolution = type === TypeFiche.solution;
  const [fichesInStorage, setFichesInStorage] = useLocalStorage<FichesBookmarked[]>(
    isSolution ? BOOKMARK_FS_KEY : FICHE_DIAGNOSTIC_IDS_STORAGE_KEY,
    [],
  );

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
