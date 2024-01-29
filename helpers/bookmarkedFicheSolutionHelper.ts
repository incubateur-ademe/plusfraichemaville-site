export const BOOKMARK_FS_KEY = "bookmark-fs-id";

export type ProjectBookmarks = {
  projectName: string;
  ficheSolutionIds: number[];
};

export const isFicheSolutionBookmarked = (
  currentBookmarks: ProjectBookmarks[],
  ficheSolutionId: number | undefined,
  projectName: string,
) => {
  console.log("ficheSolutionId", ficheSolutionId);
  console.log("currentBookmarks", ficheSolutionId);
  console.log("projectName", projectName);
  if (!ficheSolutionId) {
    return false;
  }
  const projectBookmarks = currentBookmarks?.find((b) => b.projectName === projectName);
  console.log("projectBookmarks", projectBookmarks);
  console.log(
    "isFicheSolutionBookmarked",
    projectBookmarks && projectBookmarks.ficheSolutionIds.includes(ficheSolutionId),
  );
  return projectBookmarks && projectBookmarks.ficheSolutionIds.includes(ficheSolutionId);
};

export const addFicheSolutionBookmark = (
  currentBookmarks: ProjectBookmarks[],
  ficheSolutionId: number | undefined,
  projectName: string,
) => {
  if (!ficheSolutionId) {
    return currentBookmarks;
  }
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
  ficheSolutionId: number | undefined,
  projectName: string,
) => {
  if (!ficheSolutionId) {
    return currentBookmarks;
  }
  const projectBookmarks = currentBookmarks.find((b) => b.projectName === projectName);
  if (projectBookmarks) {
    const index = projectBookmarks.ficheSolutionIds.indexOf(ficheSolutionId);
    if (index > -1) {
      projectBookmarks.ficheSolutionIds.splice(index, 1);
    }
  }
  return currentBookmarks.filter((projectBookmarks) => projectBookmarks.ficheSolutionIds.length > 0);
};
