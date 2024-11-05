"use client";
// eslint-disable-next-line max-len
import { useState } from "react";
// eslint-disable-next-line max-len
import { SourcingSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-side-panel-container";
import { CustomMarker } from "@/src/components/sourcing/helpers-client";
import SourcingMapClient from "@/src/components/sourcing/map/sourcing-map-client";

const SourcingMapContainer = ({ markers }: { markers: CustomMarker[] }) => {
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker>();

  return (
    <div className="flex">
      <div className="h-[715px] w-[50rem] shrink-0">
        <SourcingMapClient markers={markers} setSelectedMarker={setSelectedMarker} />
      </div>
      <div className="h-[715px] w-full overflow-scroll p-5">
        <SourcingSidePanelContainer marker={selectedMarker} />
      </div>
    </div>
  );
};

export default SourcingMapContainer;
