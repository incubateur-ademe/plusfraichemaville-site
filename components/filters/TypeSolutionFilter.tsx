"use client";
import { useMultipleValuesFilter } from "@/hooks/useMultipleValuesFilter";
import { ALL_TYPES_SOLUTION } from "@/helpers/typeSolution";

export default function TypeSolutionFilter({ className }: { className?: string }) {
  const FILTER_NAME = "typeSolutionFilter";

  const { changeFilter, isFilterCodeSelected } = useMultipleValuesFilter(FILTER_NAME);

  const linkStyle = (codeRegion: string) => {
    const baseStyle = " fr-tag fr-text--xs mb-3 whitespace-nowrap ";
    return isFilterCodeSelected(codeRegion) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div className={`flex flex-row md:flex-col justify-center md:justify-start flex-wrap shrink ${className}`}>
      {ALL_TYPES_SOLUTION.map((typeSolution) => (
        <button
          key={typeSolution.code}
          onClick={() => changeFilter(typeSolution.code)}
          className={linkStyle(typeSolution.code)}
        >
          {typeSolution.icon("fr-icon--sm mr-2 ")} {typeSolution.label}
        </button>
      ))}
    </div>
  );
}
