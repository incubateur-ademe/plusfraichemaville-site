"use client";
import { useMultipleValuesFilter } from "@/src/hooks/useMultipleValuesFilter";
import { ALL_TYPES_SOLUTION } from "@/src/helpers/type-fiche-solution";
import { TYPE_SOLUTION_FILTER_NAME } from "@/src/helpers/routes";

export default function TypeSolutionFilter({ className }: { className?: string }) {
  const { changeFilter, isFilterCodeSelected } = useMultipleValuesFilter(TYPE_SOLUTION_FILTER_NAME);

  const linkStyle = (codeRegion: string) => {
    const baseStyle = " fr-tag fr-text--xs whitespace-nowrap ";
    return isFilterCodeSelected(codeRegion) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div>
      <div className="mb-3 text-center text-sm text-dsfr-text-mention-grey md:text-left">Types de solution</div>
      <div className={`flex shrink flex-row flex-wrap justify-center gap-4 md:flex-col md:justify-start ${className}`}>
        {ALL_TYPES_SOLUTION.map((typeSolution) => (
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
