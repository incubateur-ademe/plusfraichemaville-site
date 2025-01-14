import Accordion from "@codegouvfr/react-dsfr/Accordion";
import clsx from "clsx";
import { ReactNode, useRef, useState } from "react";
import { useClickOutsideManagement } from "@/src/hooks/use-click-outside-management";

type SourcingFilterType = {
  code: "type-espace" | "statut-projet" | "budget";
  label: string;
  iconId: string;
};

type SourcingFiltersAccordionProps = {
  code: SourcingFilterType["code"];
  children: NonNullable<ReactNode>;
  className?: string;
};

const filters: SourcingFilterType[] = [
  { code: "type-espace", label: "Type d'espace", iconId: "ri-tree-line" },
  { code: "statut-projet", label: "Statut du projet", iconId: "ri-bar-chart-2-line" },
  { code: "budget", label: "Budget", iconId: "ri-money-euro-circle-line" },
];

export const SourcingFiltersAccordion = ({ code, children, className }: SourcingFiltersAccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const filter = filters.find((f) => f.code === code);
  const filterRef = useRef<HTMLInputElement>(null);
  useClickOutsideManagement({
    ref: filterRef,
    action: () => {
      setExpanded(false);
    },
  });
  return (
    <Accordion
      onExpandedChange={() => setExpanded(!expanded)}
      expanded={expanded}
      ref={filterRef}
      className={clsx(
        "!z-[1500] h-fit w-[212px] !border-x-[1px] !border-x-dsfr-border-default-grey bg-white",
        className,
        "sourcingFilterAccordion",
      )}
      label={
        <>
          <i className={clsx(filter?.iconId, "!mb-4 mr-2 size-4 before:!size-4")} />
          {filter?.label}
        </>
      }
    >
      {children}
    </Accordion>
  );
};
