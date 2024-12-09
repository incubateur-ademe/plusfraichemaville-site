import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";

export default function SourcingCardAccordion({
  ariaId,
  title,
  children,
  className,
}: {
  ariaId: string;
  className?: string;
  title: ReactNode;
} & PropsWithChildren) {
  return (
    <section className={`fr-accordion before:!shadow-none ${className}`}>
      <h3 className="mb-0">
        <button
          className={clsx(
            "sourcingCardAccordionBtn fr-accordion__btn !text-[1.375rem] !text-dsfr-text-title-grey",
            "!bg-dsfr-background-alt-blue-france !p-6 !font-bold",
            "fr-icon-arrow-down-s-line  fr-btn--icon-left !mb-4",
          )}
          aria-expanded={"false"}
          aria-controls={ariaId}
        >
          {title}
        </button>
      </h3>
      <div
        className={clsx(
          "fr-collapse !m-0 !mt-[-1rem] w-full rounded-b-2xl !bg-dsfr-background-alt-blue-france !px-6 !pt-0",
        )}
        id={ariaId}
      >
        {children}
      </div>
    </section>
  );
}
