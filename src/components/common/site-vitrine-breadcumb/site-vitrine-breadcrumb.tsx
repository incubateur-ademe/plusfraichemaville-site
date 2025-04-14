"use client";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import clsx from "clsx";
import { SiteVitrineBreadcrumbStep } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

export default function SiteVitrineBreadcrumb({
  step,
  className,
}: {
  step: SiteVitrineBreadcrumbStep;
  className?: string;
}) {
  return (
    <Breadcrumb
      className={clsx(className, "!mb-2")}
      currentPageLabel={step?.currentPageLabel}
      segments={step?.breadcrumbSegments || []}
    />
  );
}
