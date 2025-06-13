"use client";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { PFMV_ROUTES } from "@/src/helpers/routes";

const BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT(projetId),
  },
  label: "Mes financements",
});

export const BREADCRUMB_MES_FINANCEMENTS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_FINANCEMENTS_LISTE = (dateEstimation: string): EspaceProjetBreadcrumbStep => ({
  currentPageLabel: `Financements pour l'estimation du ${dateEstimation}`,
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_SOLUTION_MES_SOLUTIONS(projetId),
  ],
});
