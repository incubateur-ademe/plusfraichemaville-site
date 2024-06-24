import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { AidesTerritoiresAide, AidesTerritoiresAideType, TypeAidesTerritoiresAide } from "./types";
import { changeNodeListClassname } from "@/helpers/common";

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
