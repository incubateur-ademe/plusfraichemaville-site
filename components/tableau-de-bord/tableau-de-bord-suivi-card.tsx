import clsx from "clsx";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { ReactNode } from "react";
import { TableauDeBordSuiviCardProgress } from ".";

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
};

export const TableauDeBordSuiviCard = ({
  title,
  progress,
  index,
  disabled,
  picto,
  children,
}: TableauDeBordSuiviCardProps) => {
  const disabledTextClass = disabled ? "text-dsfr-text-disabled-grey" : "text-dsfr-background-flat-blue-france";

  return (
    <div
      className={clsx(
        "pfmv-card w-[355px] h-[370px] !rounded-2xl mb-6 cursor-pointer",
        disabled && "pointer-events-none",
      )}
    >
      <div
        className={clsx(
          "h-1/2 !rounded-t-2xl flex justify-center items-center relative",
          disabled ? "bg-dsfr-grey-975" : " bg-dsfr-border-default-blue-france",
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
  );
};