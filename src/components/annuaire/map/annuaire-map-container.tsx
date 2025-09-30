"use client";

import { AnnuaireFilters } from "../filters/annuaire-filters";
import { AnnuaireFilterTypeEspace } from "../filters/annuaire-filter-type-espace";
import { CustomMarker } from "../types";
import { AnnuaireFilterProjetStatus } from "../filters/annuaire-filter-projet-status";
import { AnnuaireFilterBudget } from "../filters/annuaire-filter-budget";
import { useAnnuaireFilters } from "../filters/use-annuaire-filters";
import dynamic from "next/dynamic";

import { AnnuaireMapSkeleton } from "./annuaire-map-skeleton";
import { AnnuaireFilterAdresse } from "../filters/annuaire-filter-adresse";
import { AnnuaireLayoutButton } from "@/src/components/annuaire/annuaire-layout-button";
const LazyAnnuaireMapClient = dynamic(() => import("././annuaire-map-client"), {
  ssr: false,
  loading: () => <AnnuaireMapSkeleton />,
});

type AnnuaireMapContainerProps = {
  markers: CustomMarker[];
};

const AnnuaireMapContainer = ({ markers }: AnnuaireMapContainerProps) => {
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
    mapFocus,
    setMapFocus,
  } = useAnnuaireFilters(markers);

  return (
    <div className="fr-container mt-8">
      <h2 className="mb-6 text-[1.75rem]">Je sélectionne des prestataires et des partenaires</h2>
      <AnnuaireFilters>
        <AnnuaireFilterAdresse setMapFocus={setMapFocus} />
        <div className="flex flex-wrap gap-4">
          <AnnuaireFilterTypeEspace
            selectedTypeEspace={selectedTypeEspace}
            setSelectedTypeEspace={setSelectedTypeEspace}
          />
          <AnnuaireFilterProjetStatus
            selectedProjetStatus={selectedStatus}
            setSelectedProjetStatus={setSelectedStatus}
          />
          <AnnuaireFilterBudget selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />
          <button className="h-12 underline hover:!bg-white" onClick={resetFilters}>
            Réinitialiser
          </button>
        </div>
      </AnnuaireFilters>

      <LazyAnnuaireMapClient
        markers={filteredMarkers}
        setSelectedMarker={setSelectedMarker}
        selectedMarker={selectedMarker}
        mapFocus={mapFocus}
        className="mb-10"
      />
      <AnnuaireLayoutButton />
    </div>
  );
};

export default AnnuaireMapContainer;
