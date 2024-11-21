"use client";
import { useState } from "react";
import { SourcingSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-side-panel-container";

import SourcingMapClient from "@/src/components/sourcing/map/sourcing-map-client";
import { SourcingFilters } from "../filters/filters";
import { SourcingFilterTypeEspace } from "../filters/filter-type-espace";
import { CustomMarker, CustomMarkerType } from "../types";
import { TypeEspaceCode } from "../../filters/TypeEspaceFilter";
import { SourcingFilterProjetStatus } from "../filters/filter-projet-status";

type SourcingMapContainerProps = {
  markers: CustomMarker[];
};

const SourcingMapContainer = ({ markers }: SourcingMapContainerProps) => {
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker>();
  const [selectedTypeEspace, setSelectedTypeEspace] = useState<TypeEspaceCode[]>([]);
  const [selectedProjetStatus, setSelectedProjetStatus] = useState<CustomMarkerType[]>([]);

  const filteredMarkers = markers.filter((marker) => {
    const typeEspaceMatch =
      selectedTypeEspace.length === 0 ||
      [marker.projet?.typeEspace ?? []].flat().some((type) => selectedTypeEspace.includes(type));

    const statusMatch = selectedProjetStatus.length === 0 || selectedProjetStatus.includes(marker.type);

    return typeEspaceMatch && statusMatch;
  });

  return (
    <div>
      <h2 className="mb-6 text-2xl">Je sélectionne des prestataires et des partenaires</h2>
      <SourcingFilters className="h-20">
        <SourcingFilterTypeEspace
          selectedTypeEspace={selectedTypeEspace}
          setSelectedTypeEspace={setSelectedTypeEspace}
        />
        <SourcingFilterProjetStatus
          selectedProjetStatus={selectedProjetStatus}
          setSelectedProjetStatus={setSelectedProjetStatus}
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
