import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
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

export const getAideSubmissionDeadlineAndName = (estimationAides: EstimationWithAides["estimations_aides"]) =>
  estimationAides.map(({ aide: { submission_deadline, name } }) => ({
    submission_deadline,
    name,
  }));
