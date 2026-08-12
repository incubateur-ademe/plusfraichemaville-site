"use client";
import { ALL_AIDE_DECISION_SORT_FIELD } from "@/src/helpers/aideDecisionSortFilter";
import FilterButton from "@/src/components/common/FilterButton";
import { useUserStore } from "@/src/stores/user/provider";
import clsx from "clsx";

export default function AideDecisionSortFilter({ className }: { className?: string }) {
  const setChoixSolutionAideDecisionTri = useUserStore((state) => state.setChoixSolutionAideDecisionTri);
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);

  return (
    <div className={clsx("flex shrink flex-row flex-wrap items-center justify-start gap-6", className)}>
      <span>Trier par : </span>
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
