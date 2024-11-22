"use client";

import { SourcingFilters } from "../filters/sourcing-filters";
import { SourcingFilterTypeEspace } from "../filters/sourcing-filter-type-espace";
import { CustomMarker } from "../types";
import { SourcingFilterProjetStatus } from "../filters/sourcing-filter-projet-status";
import { SourcingFilterBudget } from "../filters/sourcing-filter-budget";
import { useSourcingFilters } from "../filters/use-sourcing-filters";
import dynamic from "next/dynamic";

import { SourcingMapSkeleton } from "./sourcing-map-skeleton";
const LazySourcingMapClient = dynamic(() => import("../map/sourcing-map-client"), {
  ssr: false,
  loading: () => <SourcingMapSkeleton />,
});

type SourcingMapContainerProps = {
  markers: CustomMarker[];
};

const SourcingMapContainer = ({ markers }: SourcingMapContainerProps) => {
  const {
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
  } = useSourcingFilters(markers);

  return (
    <>
      <h2 className="mb-6 text-2xl">Je sélectionne des prestataires et des partenaires</h2>
      <SourcingFilters>
        <SourcingFilterTypeEspace
          selectedTypeEspace={selectedTypeEspace}
          setSelectedTypeEspace={setSelectedTypeEspace}
        />
        <SourcingFilterProjetStatus selectedProjetStatus={selectedStatus} setSelectedProjetStatus={setSelectedStatus} />
        <SourcingFilterBudget selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />
        <button className="h-14 underline hover:!bg-white" onClick={resetFilters}>
          Réinitialiser les filtres
        </button>
      </SourcingFilters>

      <LazySourcingMapClient
        markers={filteredMarkers}
        setSelectedMarker={setSelectedMarker}
        selectedMarker={selectedMarker}
      />
    </>
  );
};

export default SourcingMapContainer;
