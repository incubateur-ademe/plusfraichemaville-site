import clsx from "clsx";
import { ReactNode } from "react";
import { TableauDeBordSuiviCardProgress } from ".";
import { makeUrl } from "./helpers";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useParams } from "next/navigation";

export type TableauDeBordCardType = "diagnostic" | "estimation" | "financement" | "annuaire" | "solution";

export type TableauDeBordSuiviCardProps = {
  title: string;
  progress: "0" | "50" | "100" | ((_projet: ProjetWithRelations | undefined) => "0" | "50" | "100");
  children: ReactNode;
  disabled: (_projet: ProjetWithRelations | undefined) => boolean;
  disabledChildren?: ReactNode;
  picto?: ReactNode;
  type: TableauDeBordCardType;
};

export const TableauDeBordSuiviCard = ({
  title,
  progress,
  disabled,
  picto,
  children,
  disabledChildren,
  type,
}: TableauDeBordSuiviCardProps) => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const disabledValue = disabled(currentProjet);
  const textClass = disabledValue ? "text-pfmv-grey" : "text-dsfr-background-flat-blue-france";
  const linkResolver = makeUrl[type];
  const { projetId } = useParams();
  if (!projetId) {
    return null;
  }

  return (
    <div className={clsx("active:bg-transparent !rounded-2xl !bg-none", disabledValue ? "" : "fr-enlarge-link")}>
      <div className={clsx("pfmv-card h-[23rem] w-[23.5rem] !rounded-2xl")}>
        <div
          className={clsx(
            "relative flex h-1/2 items-center justify-center !rounded-t-2xl",
            disabledValue ? "bg-dsfr-background-alt-grey" : " bg-dsfr-border-default-blue-france",
          )}
        >
          <div className={clsx(disabledValue && "contrast-50")}>{picto}</div>
        </div>
        <div className="h-auto p-6 pt-4">
          <h2 className={clsx("mb-2 flex min-h-[3.5rem] text-xl", textClass)}>
            {disabledValue ? (
              <>{title} </>
            ) : (
              <LinkWithoutPrefetch href={currentProjet?.id ? linkResolver(+currentProjet.id) : ""} className="bg-none">
                {title}
              </LinkWithoutPrefetch>
            )}
          </h2>
          <div className={clsx("relative mb-3 h-12", textClass)}>{disabledValue ? disabledChildren : children}</div>
          <div>
            <div className="relative flex h-8 items-center">
              <TableauDeBordSuiviCardProgress progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
