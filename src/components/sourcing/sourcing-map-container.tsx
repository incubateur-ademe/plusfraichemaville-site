"use client";
// eslint-disable-next-line max-len
import { useState } from "react";
// eslint-disable-next-line max-len
import { SourcingSidePanelContainer } from "@/src/components/sourcing/sidePanel/sourcing-side-panel-container";
import { CustomMarker } from "@/src/components/sourcing/helpers-client";
import SourcingMapClient from "@/src/components/sourcing/sourcing-map-client";

const SourcingMapContainer = ({ markers }: { markers: CustomMarker[] }) => {
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker>();

  return (
    <div className="flex">
      <div className="w-[50rem] shrink-0">
        <SourcingMapClient markers={markers} setSelectedMarker={setSelectedMarker} />
      </div>
      <div className="w-full">
        <SourcingSidePanelContainer marker={selectedMarker} />
      </div>
    </div>
  );
};

export default SourcingMapContainer;
