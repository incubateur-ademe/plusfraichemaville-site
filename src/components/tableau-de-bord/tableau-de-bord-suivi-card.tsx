"use client";

import clsx from "clsx";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { ReactNode } from "react";
import { TableauDeBordSuiviCardProgress } from ".";
import Link from "next/link";
import { useParams } from "next/navigation";
import { makeUrl } from "./helpers";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";

export type TableauDeBordCardType =
  | "diagnostic"
  | "estimation"
  | "financement"
  | "sourcing"
  | "renseignement"
  | "solution";

export type TableauDeBordSuiviCardProps = {
  title: string;
  progress: "0" | "50" | "100" | ((_projet: ProjetWithRelations | undefined) => "0" | "50" | "100");
  index: number;
  disabled?: boolean;
  children: ReactNode;
  picto?: ReactNode;
  type: TableauDeBordCardType;
};

export const TableauDeBordSuiviCard = ({
  title,
  progress,
  index,
  disabled,
  picto,
  children,
  type,
}: TableauDeBordSuiviCardProps) => {
  const disabledTextClass = disabled ? "text-pfmv-grey" : "text-dsfr-background-flat-blue-france";
  const { projetId } = useParams();
  const linkResolver = makeUrl[type];

  return (
    <Link
      href={linkResolver(+projetId)}
      className={clsx("active:bg-transparent !rounded-2xl !bg-none", disabled && "pointer-events-none")}
    >
      <div className={clsx("pfmv-card h-[370px] w-[355px] cursor-pointer !rounded-2xl")}>
        <div
          className={clsx(
            "relative flex h-1/2 items-center justify-center !rounded-t-2xl",
            disabled ? "bg-dsfr-background-alt-grey" : " bg-dsfr-border-default-blue-france",
          )}
        >
          <small
            className={clsx(
              "absolute left-6 top-3 text-2xl font-bold",
              disabled ? "text-pfmv-grey" : "text-dsfr-blue-france-925",
            )}
          >
            {index}
          </small>
          <div className={clsx(disabled && "contrast-50")}>{picto}</div>
        </div>
        <div className="h-auto p-6 pt-4">
          <h2 className={clsx("mb-2 flex min-h-[3.5rem] items-center text-xl", disabledTextClass)}>{title}</h2>
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
    </Link>
  );
};
