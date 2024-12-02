import Accordion from "@codegouvfr/react-dsfr/Accordion";
import clsx from "clsx";
import { ReactNode } from "react";

type FavorisAccordionProps = {
  children: NonNullable<ReactNode>;
  projectName?: string;
  type: "solution" | "diagnostic";
  count: number;
};
export const FavorisAccordion = ({ children, type, projectName, count }: FavorisAccordionProps) => {
  const countText = count ? `(${count})` : "";
  return (
    <Accordion
      label={
        <h2 className="mb-0 text-[22px] text-black">
          <span>
            {!projectName && type === "diagnostic" ? (
              <>
                Mes méthodes de diagnostic mises en favoris <span className="font-normal">{countText}</span>
              </>
            ) : (
              <>
                Mes solutions mises en favoris{" "}
                <span className="font-normal">
                  {projectName ? "pour " + projectName : ""} {countText}
                </span>
              </>
            )}
          </span>
        </h2>
      }
      className={clsx(
        "favoris-accordion mb-8 before:!hidden",
        "!text-black",
        "!rounded-[20px] bg-dsfr-background-default-grey-hover hover:!rounded-[20px]",
      )}
    >
      {children}
    </Accordion>
  );
};
