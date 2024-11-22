"use client";

import { SourcingSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-side-panel-container";
import SourcingMapClient from "@/src/components/sourcing/map/sourcing-map-client";
import { SourcingFilters } from "../filters/sourcing-filters";
import { SourcingFilterTypeEspace } from "../filters/sourcing-filter-type-espace";
import { CustomMarker } from "../types";
import { SourcingFilterProjetStatus } from "../filters/sourcing-filter-projet-status";
import { SourcingFilterBudget } from "../filters/sourcing-filter-budget";
import { useSourcingFilters } from "../filters/use-sourcing-filters";

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
      <div className="flex">
        <div className="h-[715px] w-full max-w-[50rem]">
          <SourcingMapClient
            markers={filteredMarkers}
            setSelectedMarker={setSelectedMarker}
            selectedMarker={selectedMarker}
          />
        </div>
        <div className="h-[715px] w-[400px] shrink-0 overflow-y-auto">
          <SourcingSidePanelContainer marker={selectedMarker} />
        </div>
      </div>
    </>
  );
};

export default SourcingMapContainer;
