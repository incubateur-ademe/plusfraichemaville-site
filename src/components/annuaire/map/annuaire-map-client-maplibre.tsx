"use client";

import { Map, MapMouseEvent, MapRef, Marker, NavigationControl } from "react-map-gl/maplibre";
import { useCallback, useEffect, useRef } from "react";
import { CustomMarker, ZoomLevelKey } from "../types";
import Image from "next/image";
import { AnnuaireSidePanelContainer } from "../side-panel/annuaire-side-panel-container";
import { LatLngTuple } from "leaflet";
import clsx from "clsx";
import { MapSelectorControl, mapStyles } from "carte-facile";
import { AnnuaireMapLegend } from "@/src/components/annuaire/map/annuaire-map-legend";
import "maplibre-gl/dist/maplibre-gl.css";
import "./carte-facile.css";
import { AnnuaireMapClusters } from "@/src/components/annuaire/map/annuaire-map-clusters";
import { Point } from "geojson";
import { useCurrentProjetCoordinates } from "@/src/components/annuaire/hooks";
import { AnnuaireMapFocusMaplibre } from "@/src/components/annuaire/map/annuaire-map-focus-maplibre";

export type AnnuaireMapClientProps = {
  markers: CustomMarker[];
  setSelectedMarker: (_: CustomMarker) => void;
  selectedMarker?: CustomMarker;
  mapFocus?: { coordinates?: LatLngTuple; zoom?: ZoomLevelKey };
  className?: string;
};

const AnnuaireMapClientMapLibre = ({
  markers,
  setSelectedMarker,
  selectedMarker,
  mapFocus,
  className,
}: AnnuaireMapClientProps) => {
  const mapRef = useRef<MapRef>(null);
  const currentProjetCoordinates = useCurrentProjetCoordinates();
  if (!currentProjetCoordinates) {
    return null;
  }

  const loadImage = (map: maplibregl.Map, url: string, name: string) => {
    map.loadImage(url).then((image) => {
      if (image && !map.hasImage(name)) {
        map.addImage(name, image.data);
      }
    });
  };

  const handleMarkerClick = (selectedMarker: CustomMarker) => {
    setSelectedMarker(selectedMarker);
  };

  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    if (currentProjetCoordinates && currentProjetCoordinates[0]) {
      map.easeTo({
        center: [currentProjetCoordinates[1], currentProjetCoordinates[0]],
        zoom: 8,
        duration: 1000,
      });
    }
    map.on("click", "clusters", handleIconClick);
    map.on("click", "markers", handleIconClick);
    map.on("mouseenter", "markers", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "markers", () => {
      map.getCanvas().style.cursor = "grab";
    });
    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "grab";
    });

    const markerTypes = ["in-progress", "rex"];
    markerTypes.forEach((type) => {
      loadImage(map, `/images/annuaire/annuaire-projet-${type}.png`, `annuaire-projet-${type}`);
      loadImage(map, `/images/annuaire/annuaire-projet-${type}-active.png`, `annuaire-projet-${type}-active`);
    });
    map.addControl(
      new MapSelectorControl({
        styles: ["desaturated", "aerial", "simple"],
        overlays: ["administrativeBoundaries"],
      }),
      "top-right",
    );
  }, []);

  const handleClusterClick = useCallback((clusterId: number, coordinates: [number, number]) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const source = map.getSource("projets") as maplibregl.GeoJSONSource;
    source.getClusterExpansionZoom(clusterId).then((zoom) => {
      map.easeTo({
        center: coordinates,
        zoom: zoom + 1,
        duration: 1000,
      });
    });
  }, []);

  const handleIconClick = (e: MapMouseEvent) => {
    const feature = e.features && e.features[0];
    if (!feature) return;

    if (feature.properties?.cluster) {
      const clusterId = feature.properties.cluster_id;
      const point = feature.geometry as Point;
      handleClusterClick(clusterId, point.coordinates as [number, number]);
    } else {
      handleMarkerClick({
        ...feature.properties,
        geocode: JSON.parse(feature.properties.geocode as string),
      } as CustomMarker);
    }
  };

  useEffect(() => {
    if (mapFocus?.coordinates) {
      mapRef.current?.flyTo({
        center: [mapFocus.coordinates[1], mapFocus.coordinates[0]],
        zoom: mapFocus.zoom ? 12 : 8,
        duration: 2000,
      });
    }
  }, [mapFocus]);

  return (
    <div className={clsx("flex", className)}>
      <div className="h-[715px] w-full max-w-[50rem]">
        <Map ref={mapRef} onLoad={onMapLoad} style={{ width: "100%", height: "100%" }} mapStyle={mapStyles.simple}>
          <AnnuaireMapClusters markers={markers} selectedMarker={selectedMarker} />
          <NavigationControl position="top-right" showCompass={false} />
          <AnnuaireMapLegend />
          <AnnuaireMapFocusMaplibre coordinates={currentProjetCoordinates} />
          <Marker
            latitude={currentProjetCoordinates[0]}
            longitude={currentProjetCoordinates[1]}
            onClick={(_) => {
              handleMarkerClick({
                geocode: currentProjetCoordinates,
                type: "ma-collectivite",
              });
            }}
          >
            <Image
              src={`/images/annuaire/annuaire-projet-ma-collectivite${
                selectedMarker?.type === "ma-collectivite" ? "-active" : ""
              }.svg`}
              width={45}
              height={54}
              alt="Localisation de mon projet"
            />
          </Marker>
        </Map>
      </div>
      <div className="h-[715px] w-[400px] shrink-0 overflow-y-auto">
        <AnnuaireSidePanelContainer marker={selectedMarker} />
      </div>
    </div>
  );
};

export default AnnuaireMapClientMapLibre;
