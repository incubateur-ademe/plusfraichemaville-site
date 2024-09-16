import { AideEstimationEditSortMethod } from "@/src/hooks/use-aide-estimation-edit-sort-method";
import { Select } from "@codegouvfr/react-dsfr/Select";

type AideEditFilterProps = {
  sortMethod: AideEstimationEditSortMethod;
  setSortMethod: (_: AideEstimationEditSortMethod) => void;
};

export const AideEditSortField = ({ sortMethod, setSortMethod }: AideEditFilterProps) => {
  return (
    <Select
      label=""
      className="customSelect"
      nativeSelectProps={{
        onChange: (event) => setSortMethod(event.target.value as AideEstimationEditSortMethod),
        value: sortMethod,
      }}
    >
      <option className="text-lg" value="submissionDate">
        Trier par échéance
      </option>
      <option className="text-lg" value="subventionAmount">
        Trier par subvention
      </option>
    </Select>
  );
};
