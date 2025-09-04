"use client";
import { ALL_REGIONS } from "@/src/helpers/regions";
import { useMultipleValuesFilter } from "@/src/hooks/useMultipleValuesFilter";

export default function RegionFilter({ className }: { className?: string }) {
  const FILTER_NAME = "regionFilter";

  const { changeFilter, clearFilter, isFilterCodeSelected } = useMultipleValuesFilter(FILTER_NAME);

  const linkStyle = (codeRegion: string) => {
    const baseStyle = " fr-tag fr-text--xs whitespace-nowrap ";
    return isFilterCodeSelected(codeRegion) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div className={className}>
      <div className="mb-3 text-center text-sm text-dsfr-text-mention-grey md:text-left">Régions</div>
      <div className={"flex shrink flex-row flex-wrap justify-center gap-3 md:flex-col md:justify-start"}>
        <button className="fr-tag fr-text--xs" onClick={() => clearFilter()}>
          Toutes régions
        </button>
        {ALL_REGIONS.map((region) => (
          <button
            role="checkbox"
            aria-checked={isFilterCodeSelected(region.code)}
            key={region.code}
            onClick={() => changeFilter(region.code)}
            className={linkStyle(region.code)}
          >
            {region.label}
          </button>
        ))}
      </div>
    </div>
  );
}
