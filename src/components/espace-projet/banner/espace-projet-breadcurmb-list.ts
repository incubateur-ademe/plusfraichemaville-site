"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

export const BREADCRUMB_SEGMENT_DASHBOARD = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.TABLEAU_DE_BORD(projetId),
  },
  label: "Tableau de bord",
});

export type EspaceProjetBreadcrumbStep = {
  currentPageLabel: string;
  breadcrumbSegments: (_: number) => BreadcrumbSegment[];
};

export const BREADCRUMB_EDIT_PROJET: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Renseignements sur mon projet",
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};
