import clsx from "clsx";
import { FichesDiagnosticFilterUpdater } from "./use-fiches-diagnostic-filters";

export const ALL_METHODES = [
  { label: "Observation", code: "observation" },
  { label: "Modélisation", code: "modelisation_spatiale" },
  { label: "Enquête", code: "enquete" },
  { label: "Simulation numérique", code: "simulation_numerique" },
  { label: "Analyse spatiale", code: "analyse_spatiale" },
];

export const MethodeFilter = ({ updater, isActive }: FichesDiagnosticFilterUpdater) => {
  return (
    <div className="md:min-w-[13rem]">
      <div className="text-sm text-center md:text-left text-dsfr-text-mention-grey mb-3">Types de méthodes</div>
      <div className={`flex flex-row md:flex-col justify-center md:justify-start flex-wrap shrink gap-4`}>
        {ALL_METHODES.map((methode) => (
          <button
            key={methode.code}
            onClick={() => updater(methode.code, "methode")}
            className={clsx(
              "fr-tag fr-text--xs whitespace-nowrap",
              isActive(methode.code, "methode") ? "fr-tag--dismiss" : "fr-tag",
            )}
          >
            {methode.label}
          </button>
        ))}
      </div>
    </div>
  );
};
