"use client";

import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Popup, TileLayer, useMapEvent, WMSTileLayer } from "react-leaflet";
import { Climadiag } from "@/src/components/climadiag/types";
import { LCZMapFocus } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-lcz-map-focus";

const ArcGISFeatureInfo = () => {
  const [popup, setPopup] = useState<null | { latlng: LatLngExpression; content: string }>(null);

  useMapEvent("click", async (e) => {
    // Convert latlng to EPSG:3857 (Web Mercator)
    const point = L.Projection.SphericalMercator.project(e.latlng);
    const size = 10; // envelope size in meters (adjust for sensitivity)
    const xmin = point.x - size / 2;
    const xmax = point.x + size / 2;
    const ymin = point.y - size / 2;
    const ymax = point.y + size / 2;

    const geometry = encodeURIComponent(
      JSON.stringify({
        spatialReference: { latestWkid: 3857, wkid: 102100 },
        xmin,
        ymin,
        xmax,
        ymax,
      }),
    );

    const url = `https://cartagene.cerema.fr/server/rest/services/l_lcz_spot_000_2022_mil/MapServer/0/query?f=json&geometry=${geometry}&maxAllowableOffset=4.777314267945864&outFields=are,bsr,bur,hre,identifier,lcz,ror,ver,vhr,war,FID&spatialRel=esriSpatialRelIntersects&where=1%3D1&geometryType=esriGeometryEnvelope&inSR=102100&outSR=102100`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const props = data.features[0].attributes;
        // Format the popup content as you wish
        const content = Object.entries(props)
          .map(([k, v]) => `<b>${k}</b>: ${v}`)
          .join("<br/>");
        setPopup({ latlng: e.latlng, content });
      } else {
        setPopup({ latlng: e.latlng, content: "Aucune donnée." });
      }
    } catch (err) {
      setPopup({ latlng: e.latlng, content: "Erreur lors de la récupération des données." });
    }
  });

  return popup ? (
    <Popup position={popup.latlng} eventHandlers={{ remove: () => setPopup(null) }}>
      <div dangerouslySetInnerHTML={{ __html: popup.content }} />
    </Popup>
  ) : null;
};

type SurchauffeUrbaineLCZMapProps = {
  climadiagInfo: Climadiag;
};

export const SurchauffeUrbaineLCZMap = ({ climadiagInfo }: SurchauffeUrbaineLCZMapProps) => {
  return (
    <MapContainer className="h-full w-full" attributionControl={true} zoomControl={true} zoom={11}>
      <TileLayer
        attribution="Carte © IGN/Geoplateforme"
        url={
          "https://data.geopf.fr/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM" +
          "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}"
        }
      />
      <WMSTileLayer
        url="https://cartagene.cerema.fr/server/services/l_lcz_spot_000_2022_mil/MapServer/WMSServer"
        layers="0"
        format="image/png"
        transparent={true}
        version="1.3.0"
        attribution='&copy; <a href="https://cartagene.cerema.fr/">Cerema</a>'
        opacity={0.5}
        minZoom={14}
      />
      <TileLayer
        url="https://cartagene.cerema.fr/server/rest/services/Hosted/l_lcz_spot_000_2022_tl/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://cartagene.cerema.fr/">Cerema</a>'
        opacity={0.7}
        maxZoom={14}
      />
      <LCZMapFocus climadiagInfo={climadiagInfo} />
      <ArcGISFeatureInfo />
    </MapContainer>
  );
};

export default SurchauffeUrbaineLCZMap;
