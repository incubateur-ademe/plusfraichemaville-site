import clsx from "clsx";
import {
  AideEstimationEditFiltersState,
  FichesDiagnosticFiltersKey,
} from "@/src/hooks/use-aide-estimation-edit-filter";

type AideEditFilterProps = {
  aideFinanciereCount: number;
  aideTechniqueCount: number;
  selectedAidesCount: number;
  filters: AideEstimationEditFiltersState;
  toggleFilter: (_: FichesDiagnosticFiltersKey) => void;
  isLoading: boolean;
};

export const AideEditFilter = ({
  aideFinanciereCount,
  aideTechniqueCount,
  selectedAidesCount,
  filters,
  toggleFilter,
  isLoading,
}: AideEditFilterProps) => {
  return (
    <div className="flex gap-5">
      <button
        className="flex cursor-pointer gap-2 hover:!bg-white"
        onClick={() => toggleFilter("showAidesFinancieres")}
      >
        <div className="skrink-0 flex size-6 rounded-[4px] border-[1px] border-pfmv-navy text-pfmv-navy">
          {filters.showAidesFinancieres && <i className="ri-check-line mr-2" />}
        </div>
        Aides financières
        <span className={clsx(isLoading && "w-9 animate-pulse rounded-lg bg-pfmv-grey/20")}>
          {!isLoading && `(${aideFinanciereCount})`}
        </span>
      </button>
      <button className="flex cursor-pointer gap-2 hover:!bg-white" onClick={() => toggleFilter("showAidesIngenierie")}>
        <div className="skrink-0 flex size-6 rounded-[4px] border-[1px] border-pfmv-navy text-pfmv-navy">
          {filters.showAidesIngenierie && <i className="ri-check-line mr-2" />}
        </div>
        Aides techniques
        <div className={clsx(isLoading && "w-9 animate-pulse rounded-lg bg-pfmv-grey/20")}>
          {!isLoading && `(${aideTechniqueCount})`}
        </div>
      </button>
      <button className="flex cursor-pointer gap-2 hover:!bg-white" onClick={() => toggleFilter("selectedAides")}>
        <div className="skrink-0 flex size-6 rounded-[4px] border-[1px] border-pfmv-navy text-pfmv-navy">
          {filters.selectedAides && <i className="ri-check-line mr-2" />}
        </div>
        Mes aides sélectionnées
        <div className={clsx(isLoading && "w-9 animate-pulse rounded-lg bg-pfmv-grey/20")}>
          {!isLoading && `(${selectedAidesCount})`}
        </div>
      </button>
    </div>
  );
};
