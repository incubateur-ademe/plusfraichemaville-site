"use client";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";

const BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS(projetId),
  },
  label: "Diagnostic de la surchauffe",
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
const BREADCRUMB_SEGMENT_DIAG_MES_PRESTATIONS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_MES_PRESTATIONS(projetId),
  },
  label: "Mes prestations de diagnostic",
});
const BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projetId),
  },
  label: "Toutes les prestations",
});
export const BREADCRUMB_CHOIX_PARCOURS_DIAGNOSTIC: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};
export const BREADCRUMB_DIAG_FICHE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Méthode de diagnostic",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(projetId),
    BREADCRUMB_SEGMENT_DIAG_MES_PRESTATIONS(projetId),
    BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId),
  ],
};
export const BREADCRUMB_DIAG_REX: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Diagnostic réalisé",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(projetId),
    BREADCRUMB_SEGMENT_DIAG_MES_PRESTATIONS(projetId),
    BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId),
  ],
};
export const BREADCRUMB_DIAG_PRESTATION_SELECTION: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_MES_PRESTATIONS(0).label,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(projetId),
  ],
};
export const BREADCRUMB_DIAG_PRESTATION_LISTE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(0).label,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(projetId),
    BREADCRUMB_SEGMENT_DIAG_MES_PRESTATIONS(projetId),
  ],
};
export const BREADCRUMB_DIAG_INDICATEURS_PRESENTATION: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(0).label,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(projetId),
  ],
};
export const BREADCRUMB_DIAG_INDICATEURS_QUESTIONS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_DIAG_INDICATEURS_QUESTIONS(0).label,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(projetId),
  ],
};
export const BREADCRUMB_DIAG_INDICATEURS_RESULTATS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Résultats de mon diagnostic",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_DIAG_CHOIX_PARCOURS(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_PRESENTATION(projetId),
    BREADCRUMB_SEGMENT_DIAG_INDICATEURS_QUESTIONS(projetId),
  ],
};
