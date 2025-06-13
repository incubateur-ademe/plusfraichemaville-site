"use client";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";

export const BREADCRUMB_ESTIMATION_CREATION: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Création d'une estimation",
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_ESTIMATION_LISTE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Mes estimations",
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};
