import { PFMV_ROUTES } from "@/src/helpers/routes";

type BreadcrumbSegment = {
  linkProps: {
    href: string;
  };
  label: string;
};

const BREADCRUMB_SEGMENT_DASHBOARD = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.TABLEAU_DE_BORD(projetId),
  },
  label: "Tableau de bord",
});

const BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE = (projetId: number): BreadcrumbSegment => ({
  linkProps: {
    href: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projetId),
  },
  label: "Liste des prestations de diagnostic",
});

type BreadcrumbStep = {
  currentPageLabel: string;
  matchSegments: string[];
  breadcrumbSegments: BreadcrumbSegment[];
};

export const BREADCRUMB_DIAG_FICHE = (projetId: number): BreadcrumbStep => ({
  currentPageLabel: "Méthode de diagnostic",
  matchSegments: ["diagnostic", "prestation", "fiche-diagnostic"],
  breadcrumbSegments: [BREADCRUMB_SEGMENT_DASHBOARD(projetId), BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId)],
});

export const BREADCRUMB_DIAG_REX = (projetId: number): BreadcrumbStep => ({
  currentPageLabel: "Diagnostic realisé",
  matchSegments: ["diagnostic", "prestation", "retour-experience"],
  breadcrumbSegments: [BREADCRUMB_SEGMENT_DASHBOARD(projetId), BREADCRUMB_SEGMENT_DIAG_PRESTATION_LISTE(projetId)],
});

export const BREADCRUMB_DIAG_PRESTATION_LISTE = (projetId: number): BreadcrumbStep => ({
  currentPageLabel: "Liste des prestations de diagnostic",
  matchSegments: ["diagnostic", "prestation", "liste"],
  breadcrumbSegments: [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
});

export const BREADCRUMB_DIAG_PRESTATION_SELECTION = (projetId: number): BreadcrumbStep => ({
  currentPageLabel: "Mes prestations de diagnostic sélectionnées",
  matchSegments: ["diagnostic", "prestation", "selection"],
  breadcrumbSegments: [BREADCRUMB_SEGMENT_DASHBOARD(projetId)],
});

export const ALL_BREADCRUMB_STEPS = (projetId: number): BreadcrumbStep[] => [
  BREADCRUMB_DIAG_FICHE(projetId),
  BREADCRUMB_DIAG_REX(projetId),
  BREADCRUMB_DIAG_PRESTATION_LISTE(projetId),
  BREADCRUMB_DIAG_PRESTATION_SELECTION(projetId),
];
