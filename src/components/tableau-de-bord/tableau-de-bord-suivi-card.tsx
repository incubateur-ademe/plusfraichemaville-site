"use client";

import clsx from "clsx";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { ReactNode } from "react";
import { TableauDeBordSuiviCardProgress } from ".";
import { useParams } from "next/navigation";
import { makeUrl } from "./helpers";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export type TableauDeBordCardType = "diagnostic" | "estimation" | "financement" | "annuaire" | "solution";

export type TableauDeBordSuiviCardProps = {
  title: string;
  progress: "0" | "50" | "100" | ((_projet: ProjetWithRelations | undefined) => "0" | "50" | "100");
  disabled?: boolean;
  children: ReactNode;
  picto?: ReactNode;
  type: TableauDeBordCardType;
};

export const TableauDeBordSuiviCard = ({
  title,
  progress,
  disabled,
  picto,
  children,
  type,
}: TableauDeBordSuiviCardProps) => {
  const disabledTextClass = disabled ? "text-pfmv-grey" : "text-dsfr-background-flat-blue-france";
  const { projetId } = useParams();
  const linkResolver = makeUrl[type];
  if (!projetId) {
    return null;
  }

  return (
    <div
      className={clsx("active:bg-transparent fr-enlarge-link !rounded-2xl !bg-none", disabled && "pointer-events-none")}
    >
      <div className={clsx("pfmv-card h-[23rem] w-[23.5rem] cursor-pointer !rounded-2xl")}>
        <div
          className={clsx(
            "relative flex h-1/2 items-center justify-center !rounded-t-2xl",
            disabled ? "bg-dsfr-background-alt-grey" : " bg-dsfr-border-default-blue-france",
          )}
        >
          <div className={clsx(disabled && "contrast-50")}>{picto}</div>
        </div>
        <div className="h-auto p-6 pt-4">
          <h2 className={clsx("mb-2 flex min-h-[3.5rem] text-xl", disabledTextClass)}>
            <LinkWithoutPrefetch href={linkResolver(+projetId)} className="bg-none">
              {title}
            </LinkWithoutPrefetch>
          </h2>
          <div className={clsx("relative mb-3 h-12", disabledTextClass)}>{children}</div>
          <div>
            <div className="relative flex h-8 items-center">
              {disabled ? (
                <Badge small severity="new" className="!bg-dsfr-border-default-grey">
                  Bientôt disponible
                </Badge>
              ) : (
                <TableauDeBordSuiviCardProgress progress={progress} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
