"use client";

import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

import { useState } from "react";
import { FicheDiagnosticEffetAttenduFilter } from "./fiche-diagnostic-effet-attendu-filter";
import { StrapiFicheDiagnosticEchelleSpatiale } from "@/src/lib/strapi/types/strapi-custom-types";
import { EffetAttenduDiagnostic } from "@/src/helpers/ficheDiagnostic/effet-attendu-diagnostic";

export const FicheDiagnosticChoixFilters = ({ allFichesDiagnostics }: { allFichesDiagnostics: FicheDiagnostic[] }) => {
  const [selectedFilters, setSelectedFilters] = useState<EffetAttenduDiagnostic["code"][]>([]);

  const handleFilterChange = (filter: EffetAttenduDiagnostic["code"]) => {
    setSelectedFilters((state) => {
      if (state.includes(filter)) {
        return state.filter((f) => f !== filter);
      }
      return [...state, filter];
    });
  };

  const filteredFichesDiagnostics = allFichesDiagnostics.filter((fd) => {
    if (selectedFilters.length === 0) return true;
    return fd.attributes.effets_attendus?.some((echelle: StrapiFicheDiagnosticEchelleSpatiale) =>
      selectedFilters.includes(echelle),
    );
  });

  return (
    <>
      <h2 className="!mb-1 text-pfmv-navy">Les méthodes de diagnostic existantes</h2>
      <div className="mb-6">
        {"Il est recommandé d'anticiper toutes ces méthodes en amont du choix des solutions et des travaux."}
      </div>
      <div className="mb-9 flex gap-12">
        <FicheDiagnosticEffetAttenduFilter setter={handleFilterChange} selectedFilters={selectedFilters} />
      </div>
      <div className="flex flex-wrap gap-6 pb-10">
        {filteredFichesDiagnostics.map((fd) => (
          <FicheDiagnosticCard key={fd.id} ficheDiagnostic={fd} />
        ))}
      </div>
    </>
  );
};
