import { ALL_ESPACES } from "@/src/helpers/type-espace-filter";
import { TypeEspaceCode } from "@/src/helpers/type-espace-filter";
import { SourcingFiltersAccordion } from "./sourcing-filters-accordion";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";

type SourcingFilterTypeEspaceProps = {
  selectedTypeEspace: TypeEspaceCode[];
  setSelectedTypeEspace: (_type: TypeEspaceCode[]) => void;
};
export const SourcingFilterTypeEspace = ({
  selectedTypeEspace,
  setSelectedTypeEspace,
}: SourcingFilterTypeEspaceProps) => {
  const handleSelectedType = (type: TypeEspaceCode) => {
    setSelectedTypeEspace(
      selectedTypeEspace?.includes(type)
        ? selectedTypeEspace?.filter((t) => t !== type)
        : [...selectedTypeEspace, type],
    );
  };
  return (
    <SourcingFiltersAccordion code="type-espace">
      <Checkbox
        className="h-72"
        options={ALL_ESPACES.map((espace) => ({
          label: espace.label,
          value: espace.code,
          nativeInputProps: {
            onChange: () => handleSelectedType(espace.code),
            checked: selectedTypeEspace?.includes(espace.code),
          },
        }))}
      />
    </SourcingFiltersAccordion>
  );
};
