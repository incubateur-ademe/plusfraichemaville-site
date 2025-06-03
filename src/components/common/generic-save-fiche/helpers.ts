import { TypeFiche } from "@/src/helpers/common";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { FicheType } from "@prisma/client";

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
  type: TypeFiche,
  currentBookmarks: FichesBookmarked[],
  ficheId: number | undefined,
  projectName: string,
): FichesBookmarked[] => {
  if (!ficheId) return currentBookmarks;

  if (type === TypeFiche.diagnostic) {
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
  type: TypeFiche,
  currentBookmarks: FichesBookmarked[],
  ficheId: number | undefined,
  projectName: string,
): FichesBookmarked[] => {
  if (!ficheId) return currentBookmarks;

  if (type === TypeFiche.diagnostic) {
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

export const mergeFicheBookmarkedSolutions = (
  newCurrentFichesBookmarked: FicheBookmarkedSolution[],
  currentFichesBookmarked?: FicheBookmarkedSolution[],
): FicheBookmarkedSolution[] => {
  const merged = new Map<string, number[]>();

  const allItems = [...(currentFichesBookmarked ?? []), ...newCurrentFichesBookmarked];

  for (const item of allItems) {
    if (item.projectName === "" || merged.has(item.projectName)) {
      const existingIds = merged.get(item.projectName) || [];
      const newIds = Array.from(new Set([...existingIds, ...item.ficheSolutionIds]));
      merged.set(item.projectName, newIds);
    } else {
      merged.set(item.projectName, item.ficheSolutionIds);
    }
  }

  return Array.from(merged).map(([projectName, ficheSolutionIds]) => ({
    projectName,
    ficheSolutionIds,
  }));
};

export const checkIfFicheIsSaved = ({
  projet,
  ficheId,
  typeFiche,
}: {
  projet: ProjetWithRelations | undefined;
  ficheId: number;
  typeFiche: TypeFiche;
}) => {
  return !!getProjetFichesIdsByType({
    projet,
    typeFiche,
  })?.find((projetFicheId) => projetFicheId === ficheId);
};

export const getProjetFichesIdsByType = ({
  projet,
  typeFiche,
}: {
  projet: ProjetWithRelations | undefined;
  typeFiche: TypeFiche;
}) => {
  const ficheType = typeFiche === TypeFiche.solution ? FicheType.SOLUTION : FicheType.DIAGNOSTIC;
  return projet?.fiches?.filter((fiche) => fiche.type === ficheType)?.map((fiche) => fiche.fiche_id);
};
