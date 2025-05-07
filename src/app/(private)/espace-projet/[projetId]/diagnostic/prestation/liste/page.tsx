import { FicheDiagnosticGuide } from "@/src/components/fiches-diagnostic/fiche-diagnostic-guide";
import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
// eslint-disable-next-line max-len
import { FicheDiagnosticChoixWithFilters } from "@/src/components/fiches-diagnostic/fiche-diagnostic-choix-with-filters";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Link from "next/link";
import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_DIAG_PRESTATION_LISTE } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import React from "react";

export default async function FicheDiagnosticListePage(props: { params: Promise<{ projetId: number }> }) {
  const params = await props.params;
  const allFichesDiagnostics = await getAllFichesDiagnostic();
  return (
    <ProtectedEspaceProjetUrl>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_PRESTATION_LISTE} />
      <div className="fr-container pt-8">
        <FicheDiagnosticGuide />
        <FicheDiagnosticChoixWithFilters allFichesDiagnostics={allFichesDiagnostics} />
        <div className="mt-14 flex items-center justify-between">
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
            className="fr-btn fr-btn--secondary rounded-3xl"
          >
            Revenir au tableau de bord
          </GenericFicheLink>
          <Link
            href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_SELECTION(+params.projetId)}
            className="fr-btn fr-btn rounded-3xl"
          >
            Valider mes méthodes
          </Link>
        </div>
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
