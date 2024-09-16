"use client";
import { useAideDecisionSortFilter } from "@/src/hooks/useAideDecisionSortFilter";
import { ALL_AIDE_DECISION_SORT_FIELD } from "@/src/helpers/aideDecisionSortFilter";
import FilterButton from "@/src/components/common/FilterButton";

export default function AideDecisionSortFilter({ className }: { className?: string }) {
  const { setAideDecisionSortField, isAideDecisionSortFieldSelected } = useAideDecisionSortFilter();

  return (
    <div className={`flex shrink flex-row flex-wrap justify-center gap-6 md:justify-start ${className}`}>
      {ALL_AIDE_DECISION_SORT_FIELD.map((sortField) => (
        <FilterButton
          key={sortField.code}
          label={sortField.label}
          code={sortField.code}
          onClick={() => setAideDecisionSortField(sortField.code)}
          isSelected={(code) => isAideDecisionSortFieldSelected(code)}
        />
      ))}
    </div>
  );
}
