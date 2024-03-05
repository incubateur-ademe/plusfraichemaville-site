import { BOOKMARK_FS_KEY, ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { useLocalStorage } from "usehooks-ts";
import union from "lodash/union";
import unionBy from "lodash/unionBy";

function mergeProjectBookmarks(oldBookmarks: ProjectBookmarks[], newBookmarks: ProjectBookmarks[]): ProjectBookmarks[] {
  const mergedArray = unionBy(oldBookmarks, newBookmarks, "projectName");

  const updatedBookmarks = mergedArray.map((project) => ({
    projectName: project.projectName,
    ficheSolutionIds: union(
      ...[
        oldBookmarks.find((p) => p.projectName === project.projectName),
        newBookmarks.find((p) => p.projectName === project.projectName),
      ]
        .filter(Boolean)
        .map((p) => p!.ficheSolutionIds),
    ),
  }));

  return updatedBookmarks;
}

// let init = false;

export const useSavedProjets = () => {
  const [bookmarkedFichesSolutions] = useLocalStorage<ProjectBookmarks[]>(BOOKMARK_FS_KEY, []);

  const n = mergeProjectBookmarks(bookmarkedFichesSolutions, Neww);
  console.log({ n });
};

const Neww = [
  {
    projectName: "",
    ficheSolutionIds: [10],
  },
  {
    projectName: "École",
    ficheSolutionIds: [11, 14, 15],
  },
  {
    projectName: "Rue",
    ficheSolutionIds: [12, 10],
  },
];
