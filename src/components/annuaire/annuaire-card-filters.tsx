import { ContactTypeKeys, getContactTypeLabelByCode } from "@/src/components/annuaire/helpers";
import { AnnuaireContactFiltersState } from "@/src/components/annuaire/use-annuaire-card-filters";
import clsx from "clsx";

type AnnuaireCardFiltersProps = {
  contactTypeFilters: AnnuaireContactFiltersState;
  setFilter: (_: ContactTypeKeys, _1: boolean) => void;
  contactCountForFilter: (_: ContactTypeKeys) => number;
  className?: string;
};

export const AnnuaireCardFilters = ({
  setFilter,
  contactTypeFilters,
  contactCountForFilter,
  className,
}: AnnuaireCardFiltersProps) => {
  return (
    <div className={clsx("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {contactTypeFilters.map((filter) => (
        <button
          className="flex cursor-pointer gap-2 hover:!bg-white"
          onClick={() => setFilter(filter.filterKey, !filter.selected)}
          key={filter.filterKey}
        >
          <div className="skrink-0 flex size-6 rounded-[4px] border-[1px] border-pfmv-navy text-pfmv-navy">
            {filter.selected && <i className="ri-check-line mr-2" />}
          </div>
          {`${getContactTypeLabelByCode(filter.filterKey)} (${contactCountForFilter(filter.filterKey)})`}
        </button>
      ))}
    </div>
  );
};
