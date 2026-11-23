"use client";

import { CHARTE_REGION_FILTER_NAME, CharteRegionCount } from "@/src/components/charte/charte-helpers";
import { useMultipleValuesFilter } from "@/src/hooks/useMultipleValuesFilter";
import clsx from "clsx";

type CharteRegionFilterProps = {
  regions: CharteRegionCount[];
  totalCount: number;
  className?: string;
};

export const CharteRegionFilter = ({ regions, totalCount, className }: CharteRegionFilterProps) => {
  const { changeFilter, clearFilter, isFilterCodeSelected, selectedFilterCodes } =
    useMultipleValuesFilter(CHARTE_REGION_FILTER_NAME);
  const noRegionSelected = selectedFilterCodes.length === 0;

  const tagStyle = (isSelected: boolean) => clsx("fr-tag whitespace-nowrap", isSelected && "fr-tag--dismiss");

  return (
    <div className={clsx("flex flex-row flex-wrap gap-3", className)}>
      <button
        role="checkbox"
        aria-checked={noRegionSelected}
        className={tagStyle(noRegionSelected)}
        onClick={() => clearFilter()}
      >
        Toutes les régions ({totalCount})
      </button>
      {regions.map((region) => (
        <button
          role="checkbox"
          aria-checked={isFilterCodeSelected(region.code)}
          key={region.code}
          onClick={() => changeFilter(region.code)}
          className={tagStyle(!!isFilterCodeSelected(region.code))}
        >
          {region.label} ({region.count})
        </button>
      ))}
    </div>
  );
};
