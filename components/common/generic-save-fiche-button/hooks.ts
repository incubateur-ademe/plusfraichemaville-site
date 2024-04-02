import {
  ProjectBookmarks,
  isFicheSolutionBookmarked,
  unBookmarkFicheSolution,
  addFicheSolutionBookmark,
} from "@/helpers/bookmarkedFicheSolutionHelper";
import { useState, useEffect } from "react";

export const useSaveBookmarksSolution = (
  ficheSolutionId: number,
  _bookmarkedFichesSolutions: ProjectBookmarks[],
  setBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: ProjectBookmarks[]) => void,
  projectName: string,
  openModal: () => void,
) => {
  const ficheSolutionIdConverted = +ficheSolutionId;
  const bookmarkedFichesSolutions = _bookmarkedFichesSolutions;
  const [isBookmarked, setIsBookmarked] = useState(
    isFicheSolutionBookmarked(bookmarkedFichesSolutions, ficheSolutionIdConverted, projectName),
  );

  useEffect(() => {
    setIsBookmarked(isFicheSolutionBookmarked(bookmarkedFichesSolutions, ficheSolutionIdConverted, projectName));
  }, [bookmarkedFichesSolutions, ficheSolutionIdConverted, projectName]);

  const changeFavorite = () => {
    if (isBookmarked) {
      setBookmarkedFichesSolutions(
        unBookmarkFicheSolution(bookmarkedFichesSolutions, ficheSolutionIdConverted, projectName),
      );
      setIsBookmarked(false);
    } else {
      setBookmarkedFichesSolutions(
        addFicheSolutionBookmark(bookmarkedFichesSolutions, ficheSolutionIdConverted, projectName),
      );
      setIsBookmarked(true);
      openModal();
    }
  };

  return { isBookmarked, changeFavorite };
};
