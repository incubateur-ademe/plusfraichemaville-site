"use client";
import { useRegionFilter } from "@/hooks/useRegionFilter";
import { ALL_REGIONS } from "@/helpers/regions";

export default function RegionFilter({ className }: { className?: string }) {
  const { changeRegionFilter, clearRegionFilter, isRegionSelected } = useRegionFilter();

  const linkStyle = (codeRegion: string) => {
    const baseStyle = " fr-tag fr-text--xs mb-3 whitespace-nowrap ";
    return isRegionSelected(codeRegion) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div className={`flex flex-row md:flex-col justify-center md:justify-start flex-wrap shrink ${className}`}>
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
