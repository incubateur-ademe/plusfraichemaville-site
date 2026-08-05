"use client";
import { ALL_AIDE_DECISION_SORT_FIELD } from "@/src/helpers/aideDecisionSortFilter";
import FilterButton from "@/src/components/common/FilterButton";
import { useUserStore } from "@/src/stores/user/provider";

export default function AideDecisionSortFilter({ className }: { className?: string }) {
  const setChoixSolutionAideDecisionTri = useUserStore((state) => state.setChoixSolutionAideDecisionTri);
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);

  return (
    <div className={`flex shrink flex-row flex-wrap justify-center gap-6 md:justify-start ${className}`}>
      {ALL_AIDE_DECISION_SORT_FIELD.map((sortField) => (
        <FilterButton
          key={sortField.code}
          label={sortField.label}
          code={sortField.code}
          onClick={() => setChoixSolutionAideDecisionTri(sortField.code)}
          isSelected={(code) => code === navigationPreferences.choixSolutionAideDecisionTri}
        />
      ))}
    </div>
  );
}
