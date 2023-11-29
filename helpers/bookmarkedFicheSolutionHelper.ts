export const BOOKMARK_FS_KEY = "bookmark-fs-id";

export type ProjectBookmarks = {
  projectName: string;
  ficheSolutionIds: number[];
};

export const isFicheSolutionBookmarked = (
  currentBookmarks: ProjectBookmarks[],
  ficheSolutionId: number,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks?.find((b) => b.projectName === projectName);
  return projectBookmarks && projectBookmarks.ficheSolutionIds.includes(ficheSolutionId);
};

export const addFicheSolutionBookmark = (
  currentBookmarks: ProjectBookmarks[],
  ficheSolutionId: number,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks.find((b) => b.projectName === projectName);
  if (projectBookmarks) {
    if (!projectBookmarks.ficheSolutionIds.includes(ficheSolutionId)) {
      projectBookmarks.ficheSolutionIds.push(ficheSolutionId);
    }
  } else {
    currentBookmarks.push({ projectName: projectName, ficheSolutionIds: [ficheSolutionId] });
  }
  return currentBookmarks;
};

export const unBookmarkFicheSolution = (
  currentBookmarks: ProjectBookmarks[],
  ficheSolutionId: number,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks.find((b) => b.projectName === projectName);
  if (projectBookmarks) {
    const index = projectBookmarks.ficheSolutionIds.indexOf(ficheSolutionId);
    if (index > -1) {
      projectBookmarks.ficheSolutionIds.splice(index, 1);
    }
  }
  return currentBookmarks;
};
