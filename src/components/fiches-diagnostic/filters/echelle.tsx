import { EchelleButtonFilter } from "./echelle-button";
import { FichesDiagnosticFilterUpdater } from "./use-fiches-diagnostic-filters";
import { Echelle } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const ALL_ECHELLES = [
  { label: "Sur le territoire", code: Echelle.Territoire, icon: "echelle-territoire" },
  { label: "Sur un espace", code: Echelle.Espace, icon: "echelle-espace" },
];

export const EchelleFilter = ({ updater, isActive }: FichesDiagnosticFilterUpdater) => {
  return (
    <div className="mb-8 mt-8 flex flex-row flex-wrap justify-evenly md:ml-52 md:justify-normal">
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
