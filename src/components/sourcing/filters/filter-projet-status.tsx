"use client";
import Image from "next/image";
import { ALL_ESPACES, TypeEspaceCode } from "../../filters/TypeEspaceFilter";
import { SourcingFiltersAccordion } from "./filters-accordion";
import clsx from "clsx";

export const SourcingFilterTypeEspace = ({
  selectedTypeEspace,
  setSelectedTypeEspace,
}: {
  selectedTypeEspace: TypeEspaceCode[];
  setSelectedTypeEspace: (_type: TypeEspaceCode[]) => void;
}) => {
  const handleSelectedType = (type: TypeEspaceCode) => {
    setSelectedTypeEspace(
      selectedTypeEspace?.includes(type)
        ? selectedTypeEspace?.filter((t) => t !== type)
        : [...selectedTypeEspace, type],
    );
  };
  return (
    <SourcingFiltersAccordion label="Statut du projet" className="mb-6">
      test
    </SourcingFiltersAccordion>
  );
};
