import { useState } from "react";
import { TypeEspaceCode } from "../../filters/TypeEspaceFilter";
import { BUDGET_RANGES, BudgetRangeKey } from "../helpers";
import { CustomMarker, CustomMarkerType, ZoomLevelKey } from "../types";
import { LatLngTuple } from "leaflet";

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
      return (
        marker.projet?.budget != null && Math.abs(marker.projet.budget) >= min && Math.abs(marker.projet.budget) < max
      );
    });

  return markers.filter((marker) => isTypeEspaceMatch(marker) && isStatusMatch(marker) && isBudgetMatch(marker));
};

export const useSourcingFilters = (markers: CustomMarker[]) => {
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker>();
  const [selectedTypeEspace, setSelectedTypeEspace] = useState<TypeEspaceCode[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<CustomMarkerType[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRangeKey[]>([]);
  const [mapFocus, setMapFocus] = useState<{ coordinates?: LatLngTuple; zoom?: ZoomLevelKey }>();

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
    mapFocus,
    setMapFocus,
  };
};
