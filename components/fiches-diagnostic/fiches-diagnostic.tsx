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
  const { updater, isActive } = useFichesDiagnosticFilters();

  return (
    <div className="fr-container">
      <EchelleFilter updater={updater} isActive={isActive} />
      <div className="flex">
        <MethodeFilter updater={updater} isActive={isActive} />
        <FichesDiagnosticList fichesDiagnostic={fichesDiagnostic} />
      </div>
    </div>
  );
};
