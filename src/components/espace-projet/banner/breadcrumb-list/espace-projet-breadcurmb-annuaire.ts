"use client";
import {
  BREADCRUMB_SEGMENT_DASHBOARD,
  EspaceProjetBreadcrumbStep,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import { BreadcrumbSegment } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { PFMV_ROUTES } from "@/src/helpers/routes";

const BREADCRUMB_SEGMENT_ANNUAIRE_MES_CONTACTS = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE(projetId),
  },
  label: "Mes contacts",
});

export const BREADCRUMB_ANNUAIRE_MES_CONTACTS: EspaceProjetBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_ANNUAIRE_MES_CONTACTS(0).label,
  breadcrumbSegments: (projetId: number) => [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
};

export const BREADCRUMB_ANNUAIRE_CARTE: EspaceProjetBreadcrumbStep = {
  currentPageLabel: "Sélection des contacts",
  breadcrumbSegments: (projetId: number) => [
    BREADCRUMB_SEGMENT_DASHBOARD(projetId),
    BREADCRUMB_SEGMENT_ANNUAIRE_MES_CONTACTS(projetId),
  ],
};
