import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { AideTerritoireBase, AidesTerritoiresAide, TypeAidesTerritoiresAide } from "./types";
import { ReactNode } from "react";

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

export const countAidesByTypeFromDB = (aides: AideTerritoireBase[]) => {
  return aides.reduce(
    (acc, current) => {
      if (current.type === "financement") {
        acc.aideFinanciereCount++;
      } else {
        acc.aideTechniqueCount++;
      }
      return acc;
    },
    { aideFinanciereCount: 0, aideTechniqueCount: 0 },
  );
};

export const getAideSubmissionDeadlineAndName = (estimationAides: EstimationWithAides["estimations_aides"]) =>
  estimationAides.map(({ aide: { submission_deadline, name } }) => ({
    submission_deadline,
    name,
  }));

export const processDescription = (description: ReactNode | string | string[] | null) => {
  if (Array.isArray(description)) {
    const removeEmptyStrings = (arr: string[]): string[] => {
      return arr.filter((item) => item.trim().length > 0);
    };
    return removeEmptyStrings(description).join(", ");
  }
  return description as string;
};
