"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

export const BREADCRUMB_SEGMENT_DASHBOARD = (projetId: number, projetName: string): BreadcrumbSegment[] => [
  {
    linkProps: {
      href: PFMV_ROUTES.ESPACE_PROJET,
    },
    label: "Mes projets",
  },
  {
    linkProps: {
      href: PFMV_ROUTES.TABLEAU_DE_BORD(projetId),
    },
    label: projetName,
  },
];

export type EspaceProjetBreadcrumbStep = {
  currentPageLabel: string;
  breadcrumbSegments: (_projetId: number, _projetName: string) => BreadcrumbSegment[];
};

export const BREADCRUMB_EDIT_PROJET: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Renseignements sur mon projet",
  breadcrumbSegments: (projetId: number, projetName: string) =>
    BREADCRUMB_SEGMENT_DASHBOARD(projetId, projetName),
};
