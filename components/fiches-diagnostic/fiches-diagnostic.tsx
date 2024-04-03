"use client";

import { PropsWithChildren } from "react";
import { EchelleFilter, MethodeFilter } from "./filters";
import { FichesDiagnosticResponse } from "./types";
import { FichesDiagnosticList } from "./fiches-diagnostic-list";
import { useFichesDiagnosticFilters } from "./filters/use-fiches-diagnostic-filters";

type FichesDiagnosticProps = {
  fichesDiagnostic: FichesDiagnosticResponse;
} & PropsWithChildren;

export const FichesDiagnostic = ({ fichesDiagnostic }: FichesDiagnosticProps) => {
  const { updater, isActive, filters } = useFichesDiagnosticFilters();

  const filteredFichesDiagnostic = fichesDiagnostic.filter((fiche) => {
    const isFilterInactive = !filters.echelle && (!filters.methode || filters.methode.length === 0);
    const matchesEchelle = filters.echelle
      ? fiche.attributes.echelle === filters.echelle || !fiche.attributes.echelle
      : true;
    const matchesMethode = filters.methode?.length ? filters.methode.includes(fiche.attributes.methode!) : true;
    return isFilterInactive || (matchesEchelle && matchesMethode);
  });

  return (
    <div className="fr-container">
      <EchelleFilter updater={updater} isActive={isActive} />
      <div className="flex flex-col lg:flex-row">
        <MethodeFilter updater={updater} isActive={isActive} />
        <FichesDiagnosticList fichesDiagnostic={filteredFichesDiagnostic} />
      </div>
    </div>
  );
};
