"use client";
import { useAideDecisionSortFilter } from "@/hooks/useAideDecisionSortFilter";
import { ALL_AIDE_DECISION_SORT_FIELD } from "@/helpers/aideDecisionSortFilter";
import FilterButton from "@/components/common/FilterButton";

export default function AideDecisionSortFilter({ className }: { className?: string }) {
  const { setAideDecisionSortField, isAideDecisionSortFieldSelected } = useAideDecisionSortFilter();

  return (
    <div className={`flex flex-row flex-wrap shrink justify-center md:justify-start gap-6 ${className}`}>
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
