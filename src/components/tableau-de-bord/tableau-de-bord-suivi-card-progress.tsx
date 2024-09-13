import clsx from "clsx";
import { TableauDeBordSuiviCardProps } from "./tableau-de-bord-suivi-card";
import { useProjetsStore } from "@/src/stores/projets/provider";

type TableauDeBordSuiviCardProgressProps = {
  progress: TableauDeBordSuiviCardProps["progress"];
};

const progressState = (progress?: "0" | "50" | "100") => {
  if (!progress) {
    return { label: "non commencé", widthClass: "w-0" };
  }
  const state = {
    "0": { label: "non commencé", widthClass: "w-0" },
    "50": { label: "en cours", widthClass: "w-1/2" },
    "100": { label: "complété", widthClass: "w-full" },
  };

  return state[progress];
};

export const TableauDeBordSuiviCardProgress = ({ progress }: TableauDeBordSuiviCardProgressProps) => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const progressValue = typeof progress === "function" ? progress(currentProjet) : progress;
  const { label, widthClass } = progressState(progressValue);

  return (
    <>
      <div className="relative w-2/3">
        <div
          className={clsx(
            "absolute left-0 h-2 bg-dsfr-background-action-high-success-hover",
            " text-dsfr-background-action-low-blue-france",
            `z-10 origin-top-left rounded-3xl ${widthClass}`,
          )}
        ></div>
        <div className={`relative h-2 w-full rounded-3xl bg-dsfr-border-default-grey`}></div>
      </div>
      {progressValue == "100" && (
        <i className="ri-checkbox-circle-fill ml-2 text-dsfr-background-action-high-success-hover"></i>
      )}
      <span
        className={clsx(
          "ml-2 text-xs font-medium",
          progressValue == "100" ? "text-dsfr-text-default-success" : "text-pfmv-grey",
        )}
      >
        {label}
      </span>
    </>
  );
};
