"use client";

import { ALL_ESPACES, TypeEspaceCode } from "../../filters/TypeEspaceFilter";
import { SourcingFiltersAccordion } from "./filters-accordion";
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
    <SourcingFiltersAccordion label="Type d'espaces">
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
