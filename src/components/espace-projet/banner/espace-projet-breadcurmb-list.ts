"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

export const BREADCRUMB_SEGMENT_MES_PROJETS: BreadcrumbSegment = {
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET,
  },
  label: "Mes projets",
};

export const BREADCRUMB_SEGMENT_DASHBOARD = (projetId: number, projetName: string): BreadcrumbSegment[] => [
  BREADCRUMB_SEGMENT_MES_PROJETS,
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

export const BREADCRUMB_TABLEAU_DE_BORD = (projetName: string): EspaceProjetBreadcrumbStep => ({
  currentPageLabel: projetName,
  breadcrumbSegments: (_projetId: number, _projetName: string) => [BREADCRUMB_SEGMENT_MES_PROJETS],
});

export const BREADCRUMB_EDIT_PROJET: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Renseignements sur mon projet",
  breadcrumbSegments: (projetId: number, projetName: string) => BREADCRUMB_SEGMENT_DASHBOARD(projetId, projetName),
};

export const BREADCRUMB_STATUT_PROJET: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Statut de mon projet",
  breadcrumbSegments: (projetId: number, projetName: string) => BREADCRUMB_SEGMENT_DASHBOARD(projetId, projetName),
};
