import { useState } from "react";

export type AideEstimationEditSortMethod = "submissionDate" | "subventionAmount";

export const useAideEstimationEditSortMethod = () => {
  const [sortMethod, setSortMethod] = useState<AideEstimationEditSortMethod>("submissionDate");

  return { sortMethod, setSortMethod };
};
