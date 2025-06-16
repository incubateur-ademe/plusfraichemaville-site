"use client";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { PFMV_ROUTES } from "@/src/helpers/routes";

const BREADCRUMB_SEGMENT_SOLUTION_MES_ESTIMATIONS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(projetId),
  },
  label: "Mes estimations",
});

export const BREADCRUMB_MES_ESTIMATIONS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SOLUTION_MES_ESTIMATIONS(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_ESTIMATION_CREATION = (projetHasEstimations: boolean): EspaceProjetBreadcrumbStep => {
  if (projetHasEstimations) {
    return {
      currentPageLabel: "Création d'une estimation",
      breadcrumbSegments: (projetId: number) => [
        BREADCRUMB_SEGMENT_DASHBOARD(projetId),
        BREADCRUMB_SEGMENT_SOLUTION_MES_ESTIMATIONS(projetId),
      ],
    };
  } else {
    return {
      currentPageLabel: "Création d'une estimation",
      breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
    };
  }
};
