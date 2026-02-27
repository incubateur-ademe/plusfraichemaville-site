import { aide } from "@/src/generated/prisma/client";
import { dateSort } from "@/src/helpers/dateUtils";
import { AideEditSortFilterType, AidesSortFilters } from "@/src/hooks/use-aide-estimation-edit-sort-method";
import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { ReactNode } from "react";
import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "./types";

export const resolveAidType = (aid_types_full: AidesTerritoiresAide["aid_types_full"]): TypeAidesTerritoiresAide => {
  for (const aid of aid_types_full) {
    if (aid.group.name === "Aide financière") {
      return TypeAidesTerritoiresAide.financement;
    }
  }
  return TypeAidesTerritoiresAide.ingenierie;
};

export const countAidesByType = (aides: AidesTerritoiresAide[]) => {
  return aides.reduce(
    (acc, current) => {
      if (resolveAidType(current.aid_types_full) === TypeAidesTerritoiresAide.financement) {
        acc.aideFinanciereCount = acc.aideFinanciereCount + 1;
      } else {
        acc.aideTechniqueCount = acc.aideTechniqueCount + 1;
      }
      return acc;
    },
    { aideFinanciereCount: 0, aideTechniqueCount: 0 },
  );
};

export const countSelectedAides = (allAides: AidesTerritoiresAide[], projetAides: ProjetAideWithAide[]) => {
  const allAidesIds = allAides.map((aide) => aide.id);
  const selectedAidesIds = projetAides.map((projetAide) => projetAide.aide.aideTerritoireId);
  return selectedAidesIds.filter((aideId) => allAidesIds.includes(aideId)).length;
};

export const countAidesByTypeFromDB = (aides: aide[]) => {
  return aides.reduce(
    (acc, current) => {
      if (current.type === TypeAidesTerritoiresAide.financement) {
        acc.aideFinanciereCount++;
      } else {
        acc.aideTechniqueCount++;
      }
      return acc;
    },
    { aideFinanciereCount: 0, aideTechniqueCount: 0 },
  );
};

export const getAideSubmissionDeadlineAndName = (
  estimationAides: { aide: { submission_deadline: Date | null; name: string | null } }[],
) =>
  estimationAides
    .filter(({ aide: { submission_deadline } }) => submission_deadline !== null)
    .map(({ aide: { submission_deadline, name } }) => ({ submission_deadline, name }));

export const processDescription = (description: ReactNode | string | string[] | null) => {
  if (Array.isArray(description)) {
    const removeEmptyStrings = (arr: string[]): string[] => {
      return arr.filter((item) => item.trim().length > 0);
    };
    return removeEmptyStrings(description).join(", ");
  }
  return description as string;
};

export const findSortFilterByCode = (code: AideEditSortFilterType["code"]): AideEditSortFilterType =>
  AidesSortFilters.find((sortFilter) => sortFilter.code === code) || AidesSortFilters[0];

export const sumbissionDateSortBase = (
  a: { aide: { submission_deadline: Date | null } },
  b: { aide: { submission_deadline: Date | null } },
) => dateSort(a.aide.submission_deadline, b.aide.submission_deadline);
