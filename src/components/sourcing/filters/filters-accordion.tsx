import Accordion from "@codegouvfr/react-dsfr/Accordion";
import clsx from "clsx";
import { ReactNode, useState } from "react";
type SourcingFilterType = {
  label: "Type d'espaces" | "Statut du projet" | "Budget";
  iconId: string;
};

type SourcingFiltersAccordionProps = {
  label: SourcingFilterType["label"];
  children: NonNullable<ReactNode>;
  className?: string;
};

const filters: SourcingFilterType[] = [
  { label: "Type d'espaces", iconId: "ri-tree-line" },
  { label: "Statut du projet", iconId: "ri-bar-chart-2-line" },
  { label: "Budget", iconId: "ri-money-euro-circle-line" },
];

export const SourcingFiltersAccordion = ({ label, children, className }: SourcingFiltersAccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const filter = filters.find((f) => f.label === label);
  return (
    <Accordion
      className={clsx("h-fit w-56 !border-x-[1px] !border-x-dsfr-border-default-grey bg-white", className)}
      onExpandedChange={(value: boolean) => setExpanded(!value)}
      expanded={expanded}
      label={
        <>
          <i className={clsx(filter?.iconId, "!mb-4 mr-2 size-4 before:!size-4")} />
          {label}
        </>
      }
    >
      {children}
    </Accordion>
  );
};
