import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { AnnuaireFiltersAccordion } from "./annuaire-filters-accordion";
import { BUDGET_RANGES, BudgetRangeKey } from "../helpers";

type AnnuaireFilterBudgetProps = {
  selectedBudget: BudgetRangeKey[];
  setSelectedBudget: (_status: BudgetRangeKey[]) => void;
};

export const AnnuaireFilterBudget = ({ selectedBudget, setSelectedBudget }: AnnuaireFilterBudgetProps) => {
  const handleSelectedBudget = (budgetKey: BudgetRangeKey) => {
    setSelectedBudget(
      selectedBudget?.includes(budgetKey)
        ? selectedBudget?.filter((t) => t !== budgetKey)
        : [...selectedBudget, budgetKey],
    );
  };
  return (
    <AnnuaireFiltersAccordion code="budget">
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
    </AnnuaireFiltersAccordion>
  );
};
