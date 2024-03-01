"use client";

import clsx from "clsx";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { ReactNode } from "react";
import { TableauDeBordSuiviCardProgress } from ".";
import Link from "next/link";
import { useParams } from "next/navigation";
import { makeUrl } from "./helpers";

export type TableauDeBordCardType =
  | "diagnostic"
  | "estimation"
  | "financement"
  | "lancement"
  | "renseignement"
  | "solution";

export type TableauDeBordSuiviCardProps = {
  title: string;
  progress: "0" | "50" | "100";
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
  const disabledTextClass = disabled ? "text-dsfr-text-disabled-grey" : "text-dsfr-background-flat-blue-france";
  const { projetId } = useParams();
  const linkResolver = makeUrl[type];

  return (
    <Link
      href={linkResolver(+projetId)}
      className={clsx("!bg-none active:bg-transparent !rounded-2xl", disabled && "pointer-events-none")}
    >
      <div className={clsx("pfmv-card w-[355px] h-[370px] !rounded-2xl cursor-pointer")}>
        <div
          className={clsx(
            "h-1/2 !rounded-t-2xl flex justify-center items-center relative",
            disabled ? "bg-dsfr-background-alt-grey" : " bg-dsfr-border-default-blue-france",
          )}
        >
          <small
            className={clsx(
              "absolute top-3 left-6 text-2xl font-bold",
              disabled ? "text-dsfr-text-disabled-grey" : "text-dsfr-blue-france-925",
            )}
          >
            {index}
          </small>
          {picto}
        </div>
        <div className="h-auto p-6 pt-4">
          <h3 className={clsx("flex items-center mb-2 min-h-[3.5rem] text-xl", disabledTextClass)}>{title}</h3>
          <div className={clsx("mb-3 h-12 relative", disabledTextClass)}>{children}</div>
          <div>
            <div className="relative flex items-center h-8">
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
