import { FichesDiagnosticsProjetSelected } from "@/src/components/fiches-diagnostic/fiches-diagnostics-projet-selected";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
// eslint-disable-next-line max-len
import { BREADCRUMB_DIAG_PRESTATION_SELECTION } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import React from "react";

export default async function FicheDiagnosticSelectionPage() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_PRESTATION_SELECTION} />
      <div className="fr-container pt-8">
        <h1 className="mb-2 text-2xl font-bold">Je souhaite utiliser ces méthodes de diagnostic pour mon projet</h1>
        <div className="mb-6 mt-4">Retrouvez ici les méthodes de diagnostic mises de côté</div>
        <FichesDiagnosticsProjetSelected />
      </div>
    </>
  );
}
