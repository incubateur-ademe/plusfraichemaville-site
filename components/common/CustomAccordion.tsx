import React from "react";

export default async function CustomAccordion({
  title,
  expanded,
  ariaId,
  children,
  className,
}: {
  title: string;
  expanded: boolean;
  ariaId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`fr-accordion before:!shadow-none ${className}`}>
      <h3 className="mb-0">
        <button
          className={
            "fr-accordion__btn text-dsfr-text-title-grey text-[1.375rem] bigIconAccordion" +
            " font-bold !bg-dsfr-background-alt-grey rounded-2xl p-6"
          }
          aria-expanded={expanded ? "true" : "false"}
          aria-controls={ariaId}
        >
          {title}
        </button>
      </h3>
      <div className="fr-collapse bg-dsfr-background-alt-grey rounded-b-2xl !mt-[-1rem] !px-8 " id={ariaId}>
        {children}
      </div>
    </section>
  );
}
