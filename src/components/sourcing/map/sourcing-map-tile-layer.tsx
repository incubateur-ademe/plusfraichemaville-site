import clsx from "clsx";
import { useState } from "react";
import { TileLayer } from "react-leaflet";
import Image from "next/image";

type TileStyle = "terrain" | "satellite";

export const SourcingMapTileLayer = () => {
  const [tileLayer, setTileLayer] = useState<TileStyle>("terrain");

  const switchTileLayer = () => {
    tileLayer === "terrain" ? setTileLayer("satellite") : setTileLayer("terrain");
  };

  return (
    <>
      {tileLayer === "terrain" ? (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
          subdomains="abcd"
        />
      ) : (
        <TileLayer
          attribution="Carte © IGN/Geoplateforme"
          url={
            "https://data.geopf.fr/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM" +
            "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}"
          }
        />
      )}
      <div className={clsx("absolute bottom-14 left-[10px] z-[999] cursor-pointer")} onClick={switchTileLayer}>
        <Image
          src={`/images/sourcing/sourcing-map-${tileLayer}.png`}
          alt="Changer de fond de carte"
          width={70}
          height={70}
        />
      </div>
    </>
  );
};
