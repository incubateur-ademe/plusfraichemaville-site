import { AideDto, EstimationAideDto, EstimationWithAidesDto } from "@/src/types/dto";
import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "./types";
import { ReactNode } from "react";
import { dateSort } from "@/src/helpers/dateUtils";
import { AideEditSortFilterType, AidesSortFilters } from "@/src/hooks/use-aide-estimation-edit-sort-method";

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

export const countAidesByTypeFromDB = (aides: AideDto[]) => {
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

export const getAideSubmissionDeadlineAndName = (estimationAides: EstimationWithAidesDto["estimationsAides"]) =>
  estimationAides
    .filter(({ aide: { submissionDeadline } }) => submissionDeadline !== null)
    .map(({ aide: { submissionDeadline, name } }) => ({ submission_deadline: submissionDeadline, name }));

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

export const sumbissionDateSortBase = (a: EstimationAideDto, b: EstimationAideDto) =>
  dateSort(a.aide.submissionDeadline, b.aide.submissionDeadline);
