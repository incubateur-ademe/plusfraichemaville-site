"use client";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";

export const BREADCRUMB_ANNUAIRE_CARTE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Carte des projets et des contacts",
  breadcrumbSegments: (projetId: number, projetName: string) =>
    [BREADCRUMB_SEGMENT_DASHBOARD(projetId, projetName)].flat(1),
};
