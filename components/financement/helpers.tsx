import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { AidesTerritoiresAide, AidesTerritoiresAideType } from "./types";
import { changeNodeListClassname } from "@/helpers/common";

export const resolveAidType = (aid_types_full: AidesTerritoiresAide["aid_types_full"]): AidesTerritoiresAideType => {
  for (const aid of aid_types_full) {
    if (aid.group.name === "Aide financière") {
      return "Aide financière";
    }
  }
  return "Aide en ingénierie";
};

export const countAidesByType = (aides: AidesTerritoiresAide[]) => {
  const types = aides.map((aide) => resolveAidType(aide.aid_types_full));

  const countOccurrences = (arr: string[]): Record<string, number> => {
    const keyMap: Record<string, string> = {
      "Aide financière": "aideFinanciereCount",
      "Aide en ingénierie": "aideTechniqueCount",
    };

    return arr.reduce(
      (acc, curr) => {
        const key = keyMap[curr];
        if (key) {
          acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  return countOccurrences(types);
};

export const getAideSubmissionDeadlineAndName = (estimationAides: EstimationWithAides["estimations_aides"]) =>
  estimationAides.map(({ aide: { submission_deadline, name } }) => ({
    submission_deadline,
    name,
  }));

export const aideCardOff = (aideCardType: AidesTerritoiresAideType) => {
  const aideCard = document.querySelectorAll<HTMLElement>(`[data-type="${aideCardType}"]`);
  const aideCardList = Array.from(aideCard);

  if (aideCard) {
    changeNodeListClassname(aideCardList, "remove", "block");
    changeNodeListClassname(aideCardList, "add", "hidden");
  }
};

export const aideCardOn = (aideCardType: AidesTerritoiresAideType) => {
  const aideCard = document.querySelectorAll<HTMLElement>(`[data-type="${aideCardType}"]`);
  const aideCardList = Array.from(aideCard);

  if (aideCard) {
    changeNodeListClassname(aideCardList, "add", "block");
    changeNodeListClassname(aideCardList, "remove", "hidden");
  }
};
