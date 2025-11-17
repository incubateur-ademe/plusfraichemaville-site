import { Layer, Source } from "@vis.gl/react-maplibre";
import { Feature, Point } from "geojson";
import { CustomMarker } from "@/src/components/annuaire/types";
import { useMemo } from "react";
import { CircleLayerSpecification, SymbolLayerSpecification } from "maplibre-gl";

const clusterLayer: CircleLayerSpecification = {
  id: "clusters",
  type: "circle",
  source: "projets",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#ffffff",
    "circle-radius": ["step", ["get", "point_count"], 20, 8, 23, 15, 25, 20, 30, 30, 35, 40, 40],
    "circle-stroke-width": 6,
    "circle-stroke-color": "#cacafb",
  },
};

const clusterCountLayer: SymbolLayerSpecification = {
  id: "cluster-count",
  type: "symbol",
  source: "projets",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["Marianne", "Arial Unicode MS Bold"],
    "text-size": 16,
  },
  paint: {
    "text-color": "#000091",
  },
};

const unclusteredPointLayer: SymbolLayerSpecification = {
  id: "markers",
  type: "symbol",
  source: "projets",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "icon-image": ["get", "icon"],
    "icon-size": 0.7,
    "icon-allow-overlap": true,
  },
};

type AnnuaireMapClustersProps = {
  markers: CustomMarker[];
  selectedMarker?: CustomMarker | null;
  focusedMarker?: CustomMarker | null;
};

export const AnnuaireMapClusters = ({ markers, selectedMarker, focusedMarker }: AnnuaireMapClustersProps) => {
  const geojson: GeoJSON.FeatureCollection<Point> = useMemo(() => {
    const features: Feature<Point>[] = markers.map((marker) => ({
      type: "Feature",
      properties: {
        ...marker,
        icon: `annuaire-projet-${marker.type}${
          marker.type === selectedMarker?.type && marker.idProjet === selectedMarker.idProjet
            ? "-active"
            : marker.type === focusedMarker?.type && marker.idProjet === focusedMarker.idProjet
              ? "-focus"
              : ""
        }`,
      },
      geometry: {
        type: "Point",
        coordinates: [marker.geocode[1], marker.geocode[0]], // GeoJSON format is [longitude, latitude]
      },
    }));

    return {
      type: "FeatureCollection",
      features: features,
    };
  }, [markers, selectedMarker, focusedMarker]);

  return (
    <Source id="projets" type="geojson" data={geojson} cluster={true} clusterMaxZoom={14} clusterRadius={70}>
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} />
    </Source>
  );
};
