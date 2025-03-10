"use client";

import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

import { useEffect, useState } from "react";
import { FicheDiagnosticEchelleThermiqueFilter } from "./fiche-diagnostic-echelle-thermique-filter";
import { EchelleThermiqueDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-thermique-diagnostic";
import ToggleSwitch from "@codegouvfr/react-dsfr/ToggleSwitch";

export const FicheDiagnosticChoixFilters = ({ allFichesDiagnostics }: { allFichesDiagnostics: FicheDiagnostic[] }) => {
  const [selectedFilters, setSelectedFilters] = useState<EchelleThermiqueDiagnostic["code"][]>([]);
  const [filteredFichesDiagnostics, setFilteredFichesDiagnostics] = useState<FicheDiagnostic[]>(allFichesDiagnostics);
  const [onlyCheapDiagnostic, setOnlyCheapDiagnostic] = useState<boolean>(false);

  const handleFilterChange = (filter: EchelleThermiqueDiagnostic["code"]) => {
    setSelectedFilters((state) => {
      if (state.includes(filter)) {
        return state.filter((f) => f !== filter);
      }
      return [...state, filter];
    });
  };
  useEffect(() => {
    const filteredFd = allFichesDiagnostics
      .filter((fd) => !onlyCheapDiagnostic || (fd.attributes.cout_max || 0) <= 10000)
      .filter(
        (fd) =>
          selectedFilters.length === 0 ||
          fd.attributes.echelle_thermique?.some((echelle: EchelleThermiqueDiagnostic["code"]) =>
            selectedFilters.includes(echelle),
          ),
      );
    setFilteredFichesDiagnostics(filteredFd);
  }, [selectedFilters, onlyCheapDiagnostic, allFichesDiagnostics]);

  return (
    <>
      <h2 className="!mb-1 text-pfmv-navy">Les méthodes de diagnostic existantes</h2>
      <div className="mb-6">
        {"Il est recommandé d'anticiper toutes ces méthodes en amont du choix des solutions et des travaux."}
      </div>
      <div className="mb-9 flex items-center gap-12">
        <FicheDiagnosticEchelleThermiqueFilter setter={handleFilterChange} selectedFilters={selectedFilters} />
        <ToggleSwitch
          labelPosition="right"
          label="Petit budget"
          showCheckedHint={false}
          checked={onlyCheapDiagnostic}
          className="w-52"
          onChange={() => setOnlyCheapDiagnostic(!onlyCheapDiagnostic)}
        />
      </div>
      <div className="flex flex-wrap gap-6 pb-10">
        {filteredFichesDiagnostics.map((fd) => (
          <FicheDiagnosticCard key={fd.id} ficheDiagnostic={fd} />
        ))}
      </div>
    </>
  );
};
