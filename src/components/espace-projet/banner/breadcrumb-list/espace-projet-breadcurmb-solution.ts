"use client";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";

const BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId),
  },
  label: "Mes solutions de rafraîchissement",
});

const BREADCRUMB_SEGMENT_SOLUTION_LISTE = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projetId),
  },
  label: "Toutes les solutions",
});

export const BREADCRUMB_SOLUTION_MES_SOLUTIONS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_SOLUTION_TOUTES_SOLUTIONS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SOLUTION_LISTE(0).label,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS(projetId),
  ],
};

export const BREADCRUMB_SOLUTION_FICHE_SOLUTION: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Solution de rafraîchissement",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS(projetId),
    BREADCRUMB_SEGMENT_SOLUTION_LISTE(projetId),
  ],
};

export const BREADCRUMB_SOLUTION_RETOUR_EXPERIENCE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Retour d'expérience",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS(projetId),
    BREADCRUMB_SEGMENT_SOLUTION_LISTE(projetId),
  ],
};
