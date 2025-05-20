"use client";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import clsx from "clsx";
import { SiteVitrineBreadcrumbStep } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { SITE_VITRINE_BREADCRUMB_FIL_ARIANE } from "@/src/helpers/matomo/matomo-tags";

export default function SiteVitrineBreadcrumb({
  step,
  className,
}: {
  step: SiteVitrineBreadcrumbStep;
  className?: string;
}) {
  const segmentsWithTracking = step?.breadcrumbSegments.map((segment) => ({
    ...segment,
    linkProps: {
      ...segment.linkProps,
      onClick: () => trackEvent(SITE_VITRINE_BREADCRUMB_FIL_ARIANE(step?.currentPageLabel || "")),
    },
  }));
  return (
    <Breadcrumb
      className={clsx(className, "!mb-2")}
      currentPageLabel={step?.currentPageLabel}
      segments={segmentsWithTracking || []}
    />
  );
}
