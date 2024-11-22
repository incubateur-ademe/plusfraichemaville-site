import Accordion from "@codegouvfr/react-dsfr/Accordion";
import clsx from "clsx";
import { ReactNode } from "react";

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
  const filter = filters.find((f) => f.code === code);
  return (
    <Accordion
      className={clsx("!z-[1500] h-fit w-56 !border-x-[1px] !border-x-dsfr-border-default-grey bg-white", className)}
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
