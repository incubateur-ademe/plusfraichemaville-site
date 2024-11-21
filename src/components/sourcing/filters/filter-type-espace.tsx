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
    <SourcingFiltersAccordion label="Type d'espaces">
      <div className="flex flex-col gap-3">
        {ALL_ESPACES.map((espace) => (
          <div
            onClick={() => handleSelectedType(espace.code)}
            className={clsx(
              "flex items-center gap-2 rounded-2xl px-[18px] py-4 text-sm",
              "cursor-pointer shadow-pfmv-navy-shadow",
              "border-[1px]",
              selectedTypeEspace?.includes(espace.code)
                ? "bg-pfmv-navy/10 border-pfmv-navy"
                : "border-white hover:border-pfmv-navy",
            )}
            key={espace.code}
          >
            <Image width={55} height={55} src={`/images/espaces/${espace.icon}`} alt={espace.label} />
            {espace.label}
          </div>
        ))}
      </div>
    </SourcingFiltersAccordion>
  );
};
