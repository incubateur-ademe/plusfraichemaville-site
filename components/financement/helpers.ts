import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { AidesTerritoiresAide, AidesTerritoiresAideType } from "./types";

export const resolveAidType = (aid_types_full: AidesTerritoiresAide["aid_types_full"]): AidesTerritoiresAideType => {
  for (const aid of aid_types_full) {
    if (aid.group.name === "Aide financière") {
      return "Aide financière";
    }
  }
  return "Aide en ingénierie";
};

export const getAideSubmissionDeadlineAndName = (estimationAides: EstimationWithAides["estimations_aides"]) =>
  estimationAides.map(({ aide: { submission_deadline, name } }) => ({
    submission_deadline,
    name,
  }));
