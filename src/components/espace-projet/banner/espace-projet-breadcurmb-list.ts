"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

const BREADCRUMB_SEGMENT_DASHBOARD = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.TABLEAU_DE_BORD(projetId),
  },
  label: "Tableau de bord",
});

const BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projetId),
  },
  label: "Liste des prestations de diagnostic",
});

const BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_PRESENTATION(projetId),
  },
  label: "Présentation des coefficients",
});

const BREADCRUMB_SEGMENT_DIAG_INDICATEURS_QUESTIONS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(projetId),
  },
  label: "Saisie des informations",
});

export type EspaceProjetBreadcrumbStep = {
  currentPageLabel: string;
  breadcrumbSegments: (_: number) => BreadcrumbSegment[];
};

export const BREADCRUMB_DIAG_FICHE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Méthode de diagnostic",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId),
  ],
};

export const BREADCRUMB_DIAG_REX: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Diagnostic réalisé",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId),
  ],
};

export const BREADCRUMB_DIAG_PRESTATION_LISTE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_DIAG_PRESTATION_SELECTION: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Mes prestations de diagnostic sélectionnées",
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_DIAG_INDICATEURS_PRESENTATION: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_DIAG_INDICATEURS_QUESTIONS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_INDICATEURS_QUESTIONS(0).label,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(projetId),
  ],
};

export const BREADCRUMB_DIAG_INDICATEURS_RESULTATS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Résultats de mon diagnostic",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_QUESTIONS(projetId),
  ],
};
