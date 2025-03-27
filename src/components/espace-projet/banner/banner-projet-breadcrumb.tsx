"use client";
import { useMemo } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { ALL_BREADCRUMB_STEPS } from "@/src/components/espace-projet/banner/breadcurmb-list";
import clsx from "clsx";
import { isEmpty } from "lodash";

export default function BannerProjetBreadcrumb({
  currentProjet,
  className,
}: {
  currentProjet: ProjetWithRelations;
  className?: string;
}) {
  const layoutSegments = useSelectedLayoutSegments();

  const breadcrumbStep = useMemo(() => {
    return ALL_BREADCRUMB_STEPS(currentProjet.id).find((step) =>
      step.matchSegments.every((segment) => layoutSegments.includes(segment)),
    );
  }, [currentProjet.id, layoutSegments]);

  if (isEmpty(breadcrumbStep?.breadcrumbSegments)) {
    return null;
  }
  return (
    <Breadcrumb
      className={clsx(className, "!mb-0 !mt-2")}
      currentPageLabel={breadcrumbStep?.currentPageLabel}
      classes={{ link: "text-pfmv-navy font-normal" }}
      segments={breadcrumbStep?.breadcrumbSegments || []}
    />
  );
}
