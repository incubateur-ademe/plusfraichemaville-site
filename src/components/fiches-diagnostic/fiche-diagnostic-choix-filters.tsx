"use client";

import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

import { useState } from "react";
import { FicheDiagnosticChoixFilterByType, FicheDiagnosticTypeFilters } from "./fiche-diagnostic-choix-filters-by-type";

export const FicheDiagnosticChoixFilters = ({ allFichesDiagnostics }: { allFichesDiagnostics: FicheDiagnostic[] }) => {
  const [selectedFilters, setSelectedFilters] = useState<FicheDiagnosticTypeFilters[]>([]);

  const handleFilterChange = (filter: FicheDiagnosticTypeFilters) => {
    setSelectedFilters((state) => {
      if (state.includes(filter)) {
        return state.filter((f) => f !== filter);
      }
      return [...state, filter];
    });
  };

  const filteredFichesDiagnostics = allFichesDiagnostics.filter((fd) => {
    if (selectedFilters.length === 0) return true;
    return fd.attributes.echelle_spatiale?.some((echelle: FicheDiagnosticTypeFilters) =>
      selectedFilters.includes(echelle),
    );
  });

  return (
    <>
      <h2 className="mb-5 text-pfmv-navy">Les méthodes de diagnostic existantes</h2>
      <div className="mb-9 flex gap-12">
        <FicheDiagnosticChoixFilterByType
          filterType="spatiale"
          label="Échelle spatiale de l'étude"
          setter={handleFilterChange}
          selectedFilters={selectedFilters}
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
