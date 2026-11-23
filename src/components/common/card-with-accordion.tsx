import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";

export default function CardWithAccordion({
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
      <div className="mb-0">
        <button
          className={clsx(
            "annuaireCardAccordionBtn fr-accordion__btn !text-dsfr-text-title-grey",
            "!bg-dsfr-background-alt-blue-france !font-bold",
            "fr-icon-arrow-down-s-line  fr-btn--icon-left !mb-4",
          )}
          aria-expanded={"false"}
          aria-controls={ariaId}
        >
          {title}
        </button>
      </div>
      <div
        className={clsx("fr-collapse !m-0 !mt-[-1rem] w-full !bg-dsfr-background-alt-blue-france !px-6 !pt-0")}
        id={ariaId}
      >
        {children}
      </div>
    </section>
  );
}
