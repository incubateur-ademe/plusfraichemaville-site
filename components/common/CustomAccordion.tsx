import React from "react";

export default function CustomAccordion({
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
            "fr-accordion__btn bigIconAccordion !text-[1.375rem] !text-dsfr-text-title-grey" +
            " rounded-2xl !bg-dsfr-background-alt-grey !p-6 !font-bold"
          }
          aria-expanded={expanded ? "true" : "false"}
          aria-controls={ariaId}
        >
          {title}
        </button>
      </h3>
      <div className="fr-collapse !mt-[-1rem] rounded-b-2xl bg-dsfr-background-alt-grey !px-8 " id={ariaId}>
        {children}
      </div>
    </section>
  );
}
