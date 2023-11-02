export const BOOKMARK_FT_KEY = "bookmark-ft-id";

export type ProjectBookmarks = {
  projectName: string;
  ficheTechniqueIds: number[];
};

export const isFicheTechniqueBookmarked = (
  currentBookmarks: ProjectBookmarks[],
  ficheTechniqueId: number,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks?.find((b) => b.projectName === projectName);
  return projectBookmarks && projectBookmarks.ficheTechniqueIds.includes(ficheTechniqueId);
};

export const addFicheTechniqueBookmark = (
  currentBookmarks: ProjectBookmarks[],
  ficheTechniqueId: number,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks.find((b) => b.projectName === projectName);
  if (projectBookmarks) {
    if (!projectBookmarks.ficheTechniqueIds.includes(ficheTechniqueId)) {
      projectBookmarks.ficheTechniqueIds.push(ficheTechniqueId);
    }
  } else {
    currentBookmarks.push({ projectName: projectName, ficheTechniqueIds: [ficheTechniqueId] });
  }
  return currentBookmarks;
};

export const unBookmarkFicheTechnique = (
  currentBookmarks: ProjectBookmarks[],
  ficheTechniqueId: number,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks.find((b) => b.projectName === projectName);
  if (projectBookmarks) {
    const index = projectBookmarks.ficheTechniqueIds.indexOf(ficheTechniqueId);
    if (index > -1) {
      projectBookmarks.ficheTechniqueIds.splice(index, 1);
    }
  }
  return currentBookmarks;
};
