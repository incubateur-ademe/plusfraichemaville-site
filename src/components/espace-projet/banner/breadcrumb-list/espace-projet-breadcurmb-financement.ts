"use client";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { PFMV_ROUTES } from "@/src/helpers/routes";

const BREADCRUMB_SEGMENT_SOLUTION_MES_FINANCEMENTS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT(projetId),
  },
  label: "Mes aides",
});

export const BREADCRUMB_MES_FINANCEMENTS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SOLUTION_MES_FINANCEMENTS(0).label,
  breadcrumbSegments: (projetId: number, projetName: string) => BREADCRUMB_SEGMENT_DASHBOARD(projetId, projetName),
};

export const BREADCRUMB_FINANCEMENTS_LISTE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: `Choisir mes aides à sauvegarder `,
  breadcrumbSegments: (projetId: number, projetName: string) =>
    [BREADCRUMB_SEGMENT_DASHBOARD(projetId, projetName), BREADCRUMB_SEGMENT_SOLUTION_MES_FINANCEMENTS(projetId)].flat(
      1,
    ),
};
