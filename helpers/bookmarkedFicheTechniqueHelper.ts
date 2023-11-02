export const BOOKMARK_FT_KEY = "bookmark-ft";

export type ProjectBookmarks = {
  projectName: string;
  ficheTechniqueIds: string[];
};

export const isFicheTechniqueBookmarked = (
  currentBookmarks: ProjectBookmarks[],
  ficheTechniqueSlug: string,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks?.find((b) => b.projectName === projectName);
  return projectBookmarks && projectBookmarks.ficheTechniqueIds.includes(ficheTechniqueSlug);
};

export const addFicheTechniqueBookmark = (
  currentBookmarks: ProjectBookmarks[],
  ficheTechniqueSlug: string,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks.find((b) => b.projectName === projectName);
  if (projectBookmarks) {
    if (!projectBookmarks.ficheTechniqueIds.includes(ficheTechniqueSlug)) {
      projectBookmarks.ficheTechniqueIds.push(ficheTechniqueSlug);
    }
  } else {
    currentBookmarks.push({ projectName: projectName, ficheTechniqueIds: [ficheTechniqueSlug] });
  }
  return currentBookmarks;
};

export const unBookmarkFicheTechnique = (
  currentBookmarks: ProjectBookmarks[],
  ficheTechniqueSlug: string,
  projectName: string,
) => {
  const projectBookmarks = currentBookmarks.find((b) => b.projectName === projectName);
  if (projectBookmarks) {
    const index = projectBookmarks.ficheTechniqueIds.indexOf(ficheTechniqueSlug);
    if (index > -1) {
      projectBookmarks.ficheTechniqueIds.splice(index, 1);
    }
  }
  return currentBookmarks;
};
