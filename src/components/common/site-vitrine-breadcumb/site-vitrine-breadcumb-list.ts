import { PFMV_ROUTES } from "@/src/helpers/routes";

export type BreadcrumbSegment = {
  linkProps: {
    href: string;
  };
  label: string;
};

export type SiteVitrineBreadcrumbStep = {
  currentPageLabel: string;
  breadcrumbSegments: BreadcrumbSegment[];
};

const BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_HOME: BreadcrumbSegment = {
  linkProps: {
    href: PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION,
  },
  label: "La ville dans une France à +4°C",
};

const BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_COMPRENDRE: BreadcrumbSegment = {
  linkProps: {
    href: PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE,
  },
  label: "Comprendre la surchauffe urbaine",
};

const BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_TIMING: BreadcrumbSegment = {
  linkProps: {
    href: PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING,
  },
  label: "Pourquoi et quand faire un diagnostic",
};

const BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_REX_LISTE: BreadcrumbSegment = {
  linkProps: {
    href: PFMV_ROUTES.SURCHAUFFE_URBAINE_REX,
  },
  label: "Diagnostics réalisés par les collectivités",
};

export const BREADCRUMB_SURCHAUFFE_URBAINE_COMPRENDRE: SiteVitrineBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_COMPRENDRE.label,
  breadcrumbSegments: [BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_HOME],
};

export const BREADCRUMB_SURCHAUFFE_URBAINE_TIMING: SiteVitrineBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_TIMING.label,
  breadcrumbSegments: [BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_HOME],
};

export const BREADCRUMB_SURCHAUFFE_URBAINE_REX_LISTE: SiteVitrineBreadcrumbStep = {
  currentPageLabel: BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_REX_LISTE.label,
  breadcrumbSegments: [BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_HOME],
};

export const BREADCRUMB_SURCHAUFFE_URBAINE_REX = (lieuRex: string): SiteVitrineBreadcrumbStep => ({
  currentPageLabel: lieuRex,
  breadcrumbSegments: [BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_HOME, BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_REX_LISTE],
});

export const BREADCRUMB_SURCHAUFFE_URBAINE_FICHE_DIAG: SiteVitrineBreadcrumbStep = {
  currentPageLabel: "Méthode de diagnostic",
  breadcrumbSegments: [BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_HOME, BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_REX_LISTE],
};

export const BREADCRUMB_SURCHAUFFE_URBAINE_TERRITOIRE = (lieu?: string | null): SiteVitrineBreadcrumbStep => ({
  currentPageLabel: `Exposition du territoire à la surchauffe urbaine ${lieu ? ` : ${lieu}` : ""}`,
  breadcrumbSegments: [BREADCRUMB_SEGMENT_SURCHAUFFE_URBAINE_HOME],
});
