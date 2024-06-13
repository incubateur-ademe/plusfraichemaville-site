import { AidesTerritoiresAideName, AidesTerritoiresAideType, aidesTerritoiresAideNameAndTypeMap } from "./types";

export const resolveAidType = (aid_types: AidesTerritoiresAideName[]): AidesTerritoiresAideType => {
  for (const aid of aid_types) {
    if (aidesTerritoiresAideNameAndTypeMap[aid] === "Aide financière") {
      return "Aide financière";
    }
  }
  return "Aide en ingénierie";
};
