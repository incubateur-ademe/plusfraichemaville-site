"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";

type BreadcrumbSegment = {
  linkProps: {
    href: string;
  };
  label: string;
};

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

export type BreadcrumbStep = {
  currentPageLabel: string;
  breadcrumbSegments: (_: number) => BreadcrumbSegment[];
};

export const BREADCRUMB_DIAG_FICHE: BreadcrumbStep = {
  currentPageLabel: "Méthode de diagnostic",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId),
  ],
};

export const BREADCRUMB_DIAG_REX: BreadcrumbStep = {
  currentPageLabel: "Diagnostic réalisé",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId),
  ],
};

export const BREADCRUMB_DIAG_PRESTATION_LISTE: BreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_DIAG_PRESTATION_SELECTION: BreadcrumbStep = {
  currentPageLabel: "Mes prestations de diagnostic sélectionnées",
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_DIAG_INDICATEURS_PRESENTATION: BreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_DIAG_INDICATEURS_QUESTIONS: BreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_INDICATEURS_QUESTIONS(0).label,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(projetId),
  ],
};

export const BREADCRUMB_DIAG_INDICATEURS_RESULTATS: BreadcrumbStep = {
  currentPageLabel: "Résultats de mon diagnostic",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_QUESTIONS(projetId),
  ],
};
