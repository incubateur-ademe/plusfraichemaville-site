import { ContactTypeKeys, getContactTypeLabelByCode } from "@/src/components/sourcing/helpers";
import { SourcingContactFiltersState } from "@/src/components/sourcing/use-sourcing-card-filters";

type SourcingCardFiltersProps = {
  contactTypeFilters: SourcingContactFiltersState;
  setFilter: (_: ContactTypeKeys, _1: boolean) => void;
  contactCountForFilter: (_: ContactTypeKeys) => number;
};

export const SourcingCardFilters = ({
  setFilter,
  contactTypeFilters,
  contactCountForFilter,
}: SourcingCardFiltersProps) => {
  return (
    <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
