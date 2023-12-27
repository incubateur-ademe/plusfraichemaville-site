"use client";
import { ALL_REGIONS } from "@/helpers/regions";
import { useMultipleValuesFilter } from "@/hooks/useMultipleValuesFilter";

export default function RegionFilter({ className }: { className?: string }) {
  const FILTER_NAME = "regionFilter";

  const { changeFilter, clearFilter, isFilterCodeSelected } = useMultipleValuesFilter(FILTER_NAME);

  const linkStyle = (codeRegion: string) => {
    const baseStyle = " fr-tag fr-text--xs mb-3 whitespace-nowrap ";
    return isFilterCodeSelected(codeRegion) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div className={`flex flex-row md:flex-col justify-center md:justify-start flex-wrap shrink ${className}`}>
      <div className="text-sm text-dsfr-text-mention-grey mb-4">Régions</div>
      <button className="fr-tag fr-text--xs mb-3" onClick={() => clearFilter()}>
        Toutes régions
      </button>
      {ALL_REGIONS.map((region) => (
        <button key={region.code} onClick={() => changeFilter(region.code)} className={linkStyle(region.code)}>
          {region.label}
        </button>
      ))}
    </div>
  );
}
