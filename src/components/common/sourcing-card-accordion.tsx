import clsx from "clsx";
import React, { ReactNode } from "react";
import Badge from "@codegouvfr/react-dsfr/Badge";

export default function SourcingCardAccordion({
  ariaId,
  children,
  className,
}: {
  ariaId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`fr-accordion before:!shadow-none ${className}`}>
      <h3 className="mb-0">
        <button
          className={clsx(
            "sourcingCardAccordionBtn fr-accordion__btn !rounded-b-2xl !text-[1.375rem] !text-dsfr-text-title-grey",
            "!bg-dsfr-background-alt-blue-france !p-6 !font-bold",
            "fr-icon-arrow-down-s-line  fr-btn--icon-left",
          )}
          aria-expanded={"false"}
          aria-controls={ariaId}
        >
          <Badge small noIcon className="!bg-pfmv-navy !text-dsfr-background-alt-blue-france">
            Projet en cours
          </Badge>
        </button>
      </h3>
      <div
        className={clsx("fr-collapse !m-0 !mt-[-1rem] w-full rounded-b-2xl !bg-dsfr-background-alt-blue-france !px-6")}
        id={ariaId}
      >
        {children}
      </div>
    </section>
  );
}
