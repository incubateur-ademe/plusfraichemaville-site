import clsx from "clsx";
import { ReactNode } from "react";

export default function SimpleCustomAccordion({
  title,
  expanded,
  ariaId,
  children,
  className,
}: {
  title: string | ReactNode;
  expanded: boolean;
  ariaId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={clsx("fr-accordion before:!shadow-none", className)}>
      <h3 className="mb-0">
        <button
          className={clsx("fr-accordion__btn !bg-white !px-0 !font-bold text-black after:ml-1")}
          aria-expanded={expanded ? "true" : "false"}
          aria-controls={ariaId}
        >
          {title}
        </button>
      </h3>
      <div className={clsx("fr-collapse !m-0 !mt-[-1rem] w-full rounded-b-2xl !px-0 ")} id={ariaId}>
        {children}
      </div>
    </section>
  );
}
