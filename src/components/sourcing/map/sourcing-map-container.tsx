"use client";
import { useState } from "react";
import { SourcingSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-side-panel-container";
import { CustomMarker } from "@/src/components/sourcing/helpers-client";
import SourcingMapClient from "@/src/components/sourcing/map/sourcing-map-client";

const SourcingMapContainer = ({ markers }: { markers: CustomMarker[] }) => {
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker>();

  return (
    <div className="flex">
      <div className="h-[715px] w-full max-w-[50rem]">
        <SourcingMapClient markers={markers} setSelectedMarker={setSelectedMarker} selectedMarker={selectedMarker} />
      </div>
      <div className="h-[715px] w-[400px] shrink-0 overflow-y-auto">
        <SourcingSidePanelContainer marker={selectedMarker} />
      </div>
    </div>
  );
};

export default SourcingMapContainer;