"use client";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import {
  BREADCRUMB_CREATE_PROJET,
  BREADCRUMB_SEGMENT_MES_PROJETS,
} from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import clsx from "clsx";

export default function CreateProjetBreadcrumb({ className }: { className?: string }) {
  return (
    <Breadcrumb
      className={clsx(className, "!mb-0 !mt-0 !pb-1 !pt-3")}
      currentPageLabel={BREADCRUMB_CREATE_PROJET?.currentPageLabel}
      classes={{ link: "text-pfmv-navy font-normal" }}
      segments={[BREADCRUMB_SEGMENT_MES_PROJETS]}
    />
  );
}
