import { FichesDiagnosticsProjetSelected } from "@/src/components/fiches-diagnostic/fiches-diagnostics-projet-selected";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

import { BREADCRUMB_DIAG_PRESTATION_SELECTION } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-diag";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Mes méthodes de diagnostic sélectionnées");

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
