import { AidesSortFilters, AideEditSortFilterType } from "@/src/hooks/use-aide-estimation-edit-sort-method";
import { Select } from "@codegouvfr/react-dsfr/Select";

type AideEditFilterProps = {
  sortMethodCode: AideEditSortFilterType["code"];
  setSortMethodCode: (_: AideEditSortFilterType["code"]) => void;
};

export const AideEditSortField = ({ sortMethodCode, setSortMethodCode }: AideEditFilterProps) => {
  return (
    <Select
      label=""
      className="customSelect"
      nativeSelectProps={{
        onChange: (event) => setSortMethodCode(event.target.value as AideEditSortFilterType["code"]),
        value: sortMethodCode,
      }}
    >
      {AidesSortFilters.map((method) => (
        <option className="text-lg" value={method.code} key={method.code}>
          {method.label}
        </option>
      ))}
    </Select>
  );
};
