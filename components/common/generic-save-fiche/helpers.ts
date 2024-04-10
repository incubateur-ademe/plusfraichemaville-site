export const BOOKMARK_FS_KEY = "bookmark-fs-id";
export const FICHE_DIAGNOSTIC_IDS_STORAGE_KEY = "fiches-diagnostic";
export type FicheBookmarkedSolution = {
  projectName: string;
  ficheSolutionIds: number[];
};

export type FichesBookmarked = FicheBookmarkedSolution | number;

export const isFicheBookmarked = (
  currentBookmarks: FichesBookmarked[],
  ficheId: number | undefined,
  projectName: string,
): boolean => {
  if (!ficheId) return false;

  for (const bookmark of currentBookmarks) {
    if (typeof bookmark === "number") {
      if (bookmark === +ficheId) return true;
    } else if (bookmark.projectName === projectName) {
      if (bookmark.ficheSolutionIds.includes(+ficheId)) return true;
    }
  }

  return false;
};

export const addFicheBookmark = (
  type: "solution" | "diagnostic",
  currentBookmarks: FichesBookmarked[],
  ficheId: number | undefined,
  projectName: string,
): FichesBookmarked[] => {
  if (!ficheId) return currentBookmarks;

  if (type === "diagnostic") {
    if (!currentBookmarks.includes(+ficheId)) {
      currentBookmarks.push(+ficheId);
    }
  } else {
    const projectIndex = currentBookmarks.findIndex(
      (bookmark) => typeof bookmark !== "number" && bookmark.projectName === projectName,
    );

    if (projectIndex !== -1) {
      const projectBookmark = currentBookmarks[projectIndex] as FicheBookmarkedSolution;
      if (!projectBookmark.ficheSolutionIds.includes(+ficheId)) {
        projectBookmark.ficheSolutionIds.push(+ficheId);
      }
    } else {
      currentBookmarks.push({ projectName, ficheSolutionIds: [+ficheId] });
    }
  }

  return currentBookmarks;
};

export const deleteBookmarkFiche = (
  type: "solution" | "diagnostic",
  currentBookmarks: FichesBookmarked[],
  ficheId: number | undefined,
  projectName: string,
): FichesBookmarked[] => {
  if (!ficheId) return currentBookmarks;

  if (type === "diagnostic") {
    return currentBookmarks.filter((bookmark) => bookmark !== +ficheId);
  } else {
    const updatedBookmarks = currentBookmarks.map((bookmark) => {
      if (typeof bookmark !== "number" && bookmark.projectName === projectName) {
        return {
          ...bookmark,
          ficheSolutionIds: bookmark.ficheSolutionIds.filter((id) => id !== +ficheId),
        };
      }
      return bookmark;
    });

    return updatedBookmarks.filter((bookmark) => {
      return typeof bookmark === "number" || bookmark.ficheSolutionIds.length > 0;
    });
  }
};
