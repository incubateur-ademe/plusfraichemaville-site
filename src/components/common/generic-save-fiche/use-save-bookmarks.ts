import { useState, useEffect } from "react";
import { FichesBookmarked, isFicheBookmarked, deleteBookmarkFiche, addFicheBookmark } from "./helpers";
import { TypeFiche } from "@/src/helpers/common";

export const useSaveBookmarks = (
  type: TypeFiche,
  ficheId: number,
  fichesInStorage: FichesBookmarked[],
  setFichesInStorage: (_fichesInStorage: FichesBookmarked[]) => void,
  projectName: string,
  openModal?: () => void,
) => {
  const convertedFicheId = +ficheId;

  const [isBookmarked, setIsBookmarked] = useState(isFicheBookmarked(fichesInStorage, convertedFicheId, projectName));

  useEffect(() => {
    setIsBookmarked(isFicheBookmarked(fichesInStorage, convertedFicheId, projectName));
  }, [fichesInStorage, convertedFicheId, projectName]);

  const update = () => {
    if (isBookmarked) {
      setFichesInStorage(deleteBookmarkFiche(type, fichesInStorage, convertedFicheId, projectName));
      setIsBookmarked(false);
    } else {
      setFichesInStorage(addFicheBookmark(type, fichesInStorage, convertedFicheId, projectName));
      setIsBookmarked(true);
      openModal && openModal();
    }
  };

  return { isBookmarked, update };
};
