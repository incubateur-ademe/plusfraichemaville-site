"use client";
import { useMultipleValuesFilter } from "@/hooks/useMultipleValuesFilter";
import { TYPE_SOLUTION_FILTERS } from "@/helpers/typeSolution";

export default function TypeSolutionFilter({ className }: { className?: string }) {
  const FILTER_NAME = "typeSolutionFilter";

  const { changeFilter, isFilterCodeSelected } = useMultipleValuesFilter(FILTER_NAME);

  const linkStyle = (codeRegion: string) => {
    const baseStyle = " fr-tag fr-text--xs whitespace-nowrap ";
    return isFilterCodeSelected(codeRegion) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div>
      <div className="text-sm text-center md:text-left text-dsfr-text-mention-grey mb-3">Types de solution</div>
      <div className={`flex flex-row md:flex-col justify-center md:justify-start flex-wrap shrink gap-4 ${className}`}>
        {TYPE_SOLUTION_FILTERS.map((typeSolution) => (
          <button
            key={typeSolution.code}
            onClick={() => changeFilter(typeSolution.code)}
            className={linkStyle(typeSolution.code)}
          >
            {typeSolution.coloredIcon("fr-icon--sm mr-2 ")} {typeSolution.label}
          </button>
        ))}
      </div>
    </div>
  );
}
