import { AidesTerritoiresAide, AidesTerritoiresAideType } from "./types";

export const resolveAidType = (aid_types_full: AidesTerritoiresAide["aid_types_full"]): AidesTerritoiresAideType => {
  for (const aid of aid_types_full) {
    if (aid.group.name === "Aide financière") {
      return "Aide financière";
    }
  }
  return "Aide en ingénierie";
};
