import {
  ProjectBookmarks,
  BOOKMARK_FS_KEY,
  isFicheSolutionBookmarked,
  unBookmarkFicheSolution,
  addFicheSolutionBookmark,
} from "@/helpers/bookmarkedFicheSolutionHelper";
import { useUserStore } from "@/stores/user/provider";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useSaveBookmarksButton = (ficheSolutionId: number, projectName: string, openModal: () => void) => {
  const session = useSession();

  const isAuthenticated = session.status === "authenticated";

  const [disconnectedBookmarkedFichesSolutions, setDisconnectedBookmarkedFichesSolutions] = useLocalStorage<
    ProjectBookmarks[]
  >(BOOKMARK_FS_KEY, []);

  const ficheSolutionIdConverted = isAuthenticated ? +ficheSolutionId : ficheSolutionId;

  const connectedBookmarkedFichesSolutions = useUserStore((state) => state.bookmarkedFichesSolutions);
  const setConnectedBookmarkedFichesSolutions = useUserStore((state) => state.updateBookmarkedFichesSolutions);

  const bookmarkedFichesSolutions = isAuthenticated
    ? connectedBookmarkedFichesSolutions
    : disconnectedBookmarkedFichesSolutions;

  const setBookmarkedFichesSolutions = isAuthenticated
    ? setConnectedBookmarkedFichesSolutions
    : setDisconnectedBookmarkedFichesSolutions;

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

  return { isBookmarked, changeFavorite, isAuthenticated };
};
