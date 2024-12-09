import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { SourcingFiltersAccordion } from "./sourcing-filters-accordion";
import { BUDGET_RANGES, BudgetRangeKey } from "../helpers";

type SourcingFilterBudgetProps = {
  selectedBudget: BudgetRangeKey[];
  setSelectedBudget: (_status: BudgetRangeKey[]) => void;
};

export const SourcingFilterBudget = ({ selectedBudget, setSelectedBudget }: SourcingFilterBudgetProps) => {
  const handleSelectedBudget = (budgetKey: BudgetRangeKey) => {
    setSelectedBudget(
      selectedBudget?.includes(budgetKey)
        ? selectedBudget?.filter((t) => t !== budgetKey)
        : [...selectedBudget, budgetKey],
    );
  };
  return (
    <SourcingFiltersAccordion code="budget">
      <Checkbox
        className="h-48"
        options={Object.entries(BUDGET_RANGES).map(([key, range]) => ({
          label: range.label,
          value: key,
          nativeInputProps: {
            onChange: () => handleSelectedBudget(key as BudgetRangeKey),
            checked: selectedBudget?.includes(key as BudgetRangeKey),
          },
        }))}
      />
    </SourcingFiltersAccordion>
  );
};
