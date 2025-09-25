"use client";
import { useEffect, useState } from "react";
import { AidesTerritoiresAide } from "@/src/components/financement/types";
import { findSortFilterByCode } from "@/src/components/financement/helpers";
import { dateSort } from "@/src/helpers/dateUtils";

export type AideEditSortFilterType = {
  code: string;
  label: string;
  sortMethod: (a: AidesTerritoiresAide, b: AidesTerritoiresAide) => number;
};

export const maxSubventionRateSortApi = (a: AidesTerritoiresAide, b: AidesTerritoiresAide) =>
  (a.subvention_rate_upper_bound || 0) > (b.subvention_rate_upper_bound || 0) ? -1 : 0;

export const sumbissionDateSortApi = (a: AidesTerritoiresAide, b: AidesTerritoiresAide) =>
  dateSort(a.submission_deadline, b.submission_deadline);

export const AidesSortFilters: AideEditSortFilterType[] = [
  { code: "relevance", label: "Trier par pertinence", sortMethod: (_, __) => 0 },
  { code: "submissionDate", label: "Trier par échéance", sortMethod: sumbissionDateSortApi },
  { code: "subventionAmount", label: "Trier par subvention", sortMethod: maxSubventionRateSortApi },
];

export const useAideEstimationEditSortMethod = () => {
  const [sortMethodCode, setSortMethodCode] = useState<AideEditSortFilterType["code"]>(AidesSortFilters[0]["code"]);

  const [sortMethod, setSortMethod] = useState<AideEditSortFilterType>(AidesSortFilters[0]);

  useEffect(() => {
    setSortMethod(findSortFilterByCode(sortMethodCode));
  }, [sortMethodCode]);

  return { sortMethodCode, setSortMethodCode, sortMethod };
};
