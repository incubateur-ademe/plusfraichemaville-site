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
const LazyAnnuaireMapClient = dynamic(() => import("./annuaire-map-client"), {
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
    <>
      <h2 className="mb-6 text-[28px]">Je sélectionne des prestataires et des partenaires</h2>
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
      />
    </>
  );
};

export default AnnuaireMapContainer;
