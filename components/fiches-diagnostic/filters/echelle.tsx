import { EchelleButtonFilter } from "./echelle-button";
import { FichesDiagnosticFilterUpdater } from "./use-fiches-diagnostic-filters";

export const ALL_ECHELLES = [
  { label: "Sur le territoire", code: "territoire", icon: "echelle-territoire" },
  { label: "Sur un espace", code: "espace", icon: "echelle-espace" },
];

export const EchelleFilter = ({ updater, isActive }: FichesDiagnosticFilterUpdater) => {
  return (
    <div className="flex flex-row flex-wrap mb-8 mt-8 md:ml-52 justify-center md:justify-normal">
      <EchelleButtonFilter
        updater={() => updater(null, "echelle")}
        isActive={isActive(null, "echelle")}
        icon="echelle-toutes"
        label="Toutes les échelles"
      ></EchelleButtonFilter>
      {ALL_ECHELLES.map((echelle) => (
        <EchelleButtonFilter
          updater={() => updater(echelle.code, "echelle")}
          isActive={isActive(echelle.code, "echelle")}
          {...echelle}
          key={echelle.code}
        />
      ))}
    </div>
  );
};
