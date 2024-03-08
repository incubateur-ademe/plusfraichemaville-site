import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
export type ExtractedProjectBookmarks = {
  projectName: string;
  ficheSolutionIds: string[];
};

import union from "lodash/union";
import unionBy from "lodash/unionBy";

export function mergeBookmarkedFichesSolutions(
  oldBookmarks: ProjectBookmarks[],
  newBookmarks: ProjectBookmarks[],
): ProjectBookmarks[] {
  const mergedArray = unionBy(oldBookmarks, newBookmarks, "projectName");

  const updatedBookmarks = mergedArray.map((project) => {
    const combinedIds = union(
      ...[
        oldBookmarks.find((p) => p.projectName === project.projectName),
        newBookmarks.find((p) => p.projectName === project.projectName),
      ]
        .filter(Boolean)
        .map((p) => p!.ficheSolutionIds),
    );

    const ficheSolutionIdsAsNumbers = combinedIds.map((id) => id);

    return {
      projectName: project.projectName,
      ficheSolutionIds: ficheSolutionIdsAsNumbers,
    };
  });

  return updatedBookmarks;
}

export const convertBookmarkIdsToNumbers = (bookmarks: ExtractedProjectBookmarks[]) =>
  bookmarks.map((bookmark) => ({
    ...bookmark,
    ficheSolutionIds: bookmark.ficheSolutionIds.map((id) => Number(id)),
  }));
