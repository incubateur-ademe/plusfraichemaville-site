import clsx from "clsx";
import { ReactNode } from "react";

export default function CustomAccordion({
  title,
  expanded,
  ariaId,
  children,
  className,
  bgColor,
  picto,
  btnTextColor,
  btnTextPadding,
}: {
  title: string | ReactNode;
  expanded: boolean;
  ariaId: string;
  className?: string;
  bgColor?: string;
  children: ReactNode;
  picto?: ReactNode;
  btnTextColor?: string;
  btnTextPadding?: string;
}) {
  return (
    <section className={`fr-accordion before:!shadow-none ${className}`}>
      <h3 className="mb-0">
        <button
          className={clsx(
            "fr-accordion__btn bigIconAccordion !text-[1.375rem] !text-dsfr-text-title-grey" +
              " rounded-2xl !font-bold",
            bgColor ?? "!bg-dsfr-background-alt-grey",
            btnTextColor ?? "!text-dsfr-text-title-grey",
            btnTextPadding ?? "!px-6 !py-6",
          )}
          aria-expanded={expanded ? "true" : "false"}
          aria-controls={ariaId}
        >
          {picto}
          {title}
        </button>
      </h3>
      <div
        className={clsx(
          "fr-collapse !m-0 !mt-[-1rem] w-full rounded-b-2xl !px-6",
          bgColor ?? "!bg-dsfr-background-alt-grey",
        )}
        id={ariaId}
      >
        {children}
      </div>
    </section>
  );
}
