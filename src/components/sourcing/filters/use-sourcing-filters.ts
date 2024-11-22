import { useState } from "react";
import { TypeEspaceCode } from "../../filters/TypeEspaceFilter";
import { BudgetRangeKey, BUDGET_RANGES } from "../helpers";
import { CustomMarker, CustomMarkerType } from "../types";

const useFilteredMarkers = (
  markers: CustomMarker[],
  filters: {
    typeEspace: TypeEspaceCode[];
    status: CustomMarkerType[];
    budget: BudgetRangeKey[];
  },
) => {
  const isTypeEspaceMatch = (marker: CustomMarker) =>
    filters.typeEspace.length === 0 ||
    [marker.projet?.typeEspace ?? []].flat().some((type) => filters.typeEspace.includes(type));

  const isStatusMatch = (marker: CustomMarker) => filters.status.length === 0 || filters.status.includes(marker.type);

  const isBudgetMatch = (marker: CustomMarker) =>
    filters.budget.length === 0 ||
    filters.budget.some((budgetKey) => {
      const { min, max } = BUDGET_RANGES[budgetKey];
      return marker.projet?.budget && marker.projet.budget >= min && marker.projet.budget < max;
    });

  return markers.filter((marker) => isTypeEspaceMatch(marker) && isStatusMatch(marker) && isBudgetMatch(marker));
};

export const useSourcingFilters = (markers: CustomMarker[]) => {
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker>();
  const [selectedTypeEspace, setSelectedTypeEspace] = useState<TypeEspaceCode[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<CustomMarkerType[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRangeKey[]>([]);

  const resetFilters = () => {
    setSelectedTypeEspace([]);
    setSelectedStatus([]);
    setSelectedBudget([]);
  };

  const filteredMarkers = useFilteredMarkers(markers, {
    typeEspace: selectedTypeEspace,
    status: selectedStatus,
    budget: selectedBudget,
  });

  return {
    filteredMarkers,
    selectedMarker,
    setSelectedMarker,
    selectedTypeEspace,
    setSelectedTypeEspace,
    selectedStatus,
    setSelectedStatus,
    selectedBudget,
    setSelectedBudget,
    resetFilters,
  };
};
