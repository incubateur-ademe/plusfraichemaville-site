"use client";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { EspaceProjetBreadcrumbStep } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import clsx from "clsx";
import { useProjetsStore } from "@/src/stores/projets/provider";
import BannerProjet from "@/src/components/espace-projet/banner/banner-projet";

export default function BannerProjetBreadcrumb({
  step,
  className,
}: {
  step: EspaceProjetBreadcrumbStep;
  className?: string;
}) {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  if (!currentProjet) {
    return null;
  }
  return (
    <div className="bg-dsfr-background-alt-blue-france">
      <div className="fr-container">
        <Breadcrumb
          className={clsx(className, "!mb-0 !mt-0 !pb-1 !pt-3")}
          currentPageLabel={step?.currentPageLabel}
          classes={{ link: "text-pfmv-navy font-normal" }}
          segments={step?.breadcrumbSegments(currentProjet.id, currentProjet.nom) || []}
        />
      </div>
      <BannerProjet />
    </div>
  );
}
