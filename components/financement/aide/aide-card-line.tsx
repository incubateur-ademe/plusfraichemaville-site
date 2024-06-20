import clsx from "clsx";
import { PropsWithChildren } from "react";

type AideCardLineProps = {
  icon: "subvention" | "recurrence" | "porteur" | "calendrier";
  isAideFinanciere: boolean;
} & PropsWithChildren;

export const AideCardLine = ({ isAideFinanciere, icon, children }: AideCardLineProps) => {
  const icons = {
    subvention: {
      title: "Taux de subention",
      picto: "ri-percent-line",
    },
    recurrence: {
      title: "Récurrence",
      picto: "ri-loop-left-line",
    },
    porteur: {
      title: "Porteur(s) d'aide",
      picto: "ri-hand-coin-line",
    },
    calendrier: {
      title: "Calendrier",
      picto: "ri-calendar-2-line",
    },
  };

  return (
    <div className="border-t-[1px] border-t-black/10 py-4">
      <div className="mb-2 flex gap-2">
        <i
          className={clsx(`${icons[icon].picto} block shrink-0`, "size-4 before:!size-4 before:!align-top", {
            "text-dsfr-background-flat-info": isAideFinanciere,
            "text-dsfr-background-flat-orange-terre-battue": !isAideFinanciere,
          })}
        ></i>
        <span className="text-sm font-bold">{icons[icon].title}</span>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
};
