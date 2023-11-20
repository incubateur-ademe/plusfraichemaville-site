"use client";
import { useRegionFilter } from "@/hooks/useRegionFilter";

type Region = {
  label: string;
  code: string;
};

const ALL_REGIONS: Region[] = [
  { code: "FR-ARA", label: "Auvergne-Rhône-Alpes" },
  { code: "FR-BFC", label: "Bourgogne-Franche-Comté" },
  { code: "FR-BRE", label: "Bretagne" },
  { code: "FR-CVL", label: "Centre-Val de Loire" },
  { code: "FR-COR", label: "Corse" },
  { code: "FR-GES", label: "Grand Est" },
  { code: "FR-HDF", label: "Hauts-de-France" },
  { code: "FR-IDF", label: "Île-de-France" },
  { code: "FR-NOR", label: "Normandie" },
  { code: "FR-NAQ", label: "Nouvelle-Aquitaine" },
  { code: "FR-OCC", label: "Occitanie" },
  { code: "FR-PDL", label: "Pays de la Loire" },
  { code: "FR-PAC", label: "Provence-Alpes-Côte d'Azur" },
  { code: "FR-GUA", label: "Guadeloupe" },
  { code: "FR-GUF", label: "Guyane" },
  { code: "FR-MTQ", label: "Martinique" },
  { code: "FR-LRE", label: "La Réunion" },
  { code: "FR-MAY", label: "Mayotte" },
];

export default function RegionFilter({ className }: { className?: string }) {
  const { changeRegionFilter, clearRegionFilter, isRegionSelected } = useRegionFilter();

  const linkStyle = (codeRegion: string) => {
    const baseStyle = " fr-tag fr-text--xs mb-3 ";
    return isRegionSelected(codeRegion) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div className={`flex flex-row md:flex-col justify-center flex-wrap ${className}`}>
      <button className="fr-tag fr-text--xs mb-3" onClick={() => clearRegionFilter()}>
        Toutes régions
      </button>
      {ALL_REGIONS.map((region) => (
        <button key={region.code} onClick={() => changeRegionFilter(region.code)} className={linkStyle(region.code)}>
          {region.label}
        </button>
      ))}
    </div>
  );
}
