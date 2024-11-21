"use client";
import { useState } from "react";
import { SourcingSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-side-panel-container";

import SourcingMapClient from "@/src/components/sourcing/map/sourcing-map-client";
import { SourcingFilters } from "../filters/filters";
import { SourcingFiltersTypeEspace } from "../filters/filters-type-espace";
import { CustomMarker } from "../types";
import { TypeEspaceCode } from "../../filters/TypeEspaceFilter";

type SourcingMapContainerProps = {
  markers: CustomMarker[];
};

const SourcingMapContainer = ({ markers }: SourcingMapContainerProps) => {
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker>();
  const [selectedTypeEspace, setSelectedTypeEspace] = useState<TypeEspaceCode[]>([]);

  const filteredMarkers =
    selectedTypeEspace.length > 0
      ? markers.filter((marker) =>
          [marker.projet?.typeEspace ?? []].flat().some((type) => selectedTypeEspace.includes(type)),
        )
      : markers;

  return (
    <div>
      <h2 className="mb-6 text-2xl">Je sélectionne des prestataires et des partenaires</h2>
      <SourcingFilters className="h-20">
        <SourcingFiltersTypeEspace
          selectedTypeEspace={selectedTypeEspace}
          setSelectedTypeEspace={setSelectedTypeEspace}
        />
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
    </div>
  );
};

export default SourcingMapContainer;
