import clsx from "clsx";
import { FichesDiagnosticFilterUpdater } from "./use-fiches-diagnostic-filters";

export const ALL_METHODES = [
  { label: "Observation", code: "observation" },
  { label: "Modélisation", code: "modelisation_spatiale" },
  { label: "Enquête", code: "enquete" },
  { label: "Analyse spatiale", code: "analyse_spatiale" },
];

export const MethodeFilter = ({ updater, isActive }: FichesDiagnosticFilterUpdater) => {
  return (
    <div className="mb-10 md:min-w-[13rem] lg:mb-0">
      <div className="mb-5 text-center text-sm text-dsfr-text-mention-grey lg:mb-3 lg:text-left">Types de méthodes</div>
      <div className={`flex shrink flex-row flex-wrap justify-center gap-4 lg:flex-col lg:justify-start`}>
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

export const getMethodeDiagnosticFromCode = (methodeDiagnosticCode?: string | null) =>
  methodeDiagnosticCode ? ALL_METHODES.find((r) => r.code === methodeDiagnosticCode) : null;
