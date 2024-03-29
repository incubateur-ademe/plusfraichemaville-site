import clsx from "clsx";
import { TableauDeBordSuiviCardProps } from "./tableau-de-bord-suivi-card";
import { useProjetsStore } from "@/stores/projets/provider";

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
  const progressValue = typeof progress === "function" ? progress(currentProjet!) : progress;
  const { label, widthClass } = progressState(progressValue);

  return (
    <>
      <div className="w-2/3 relative">
        <div
          className={clsx(
            "h-2 absolute left-0 bg-dsfr-background-action-high-success-hover",
            " text-dsfr-background-action-low-blue-france",
            `rounded-3xl origin-top-left z-10 ${widthClass}`,
          )}
        ></div>
        <div className={`w-full h-2 relative bg-dsfr-border-default-grey rounded-3xl`}></div>
      </div>
      {progressValue == "100" && (
        <i className="ri-checkbox-circle-fill ml-2 text-dsfr-background-action-high-success-hover"></i>
      )}
      <span className="text-xs ml-2 text-dsfr-background-action-high-success-hover font-medium">{label}</span>
    </>
  );
};
