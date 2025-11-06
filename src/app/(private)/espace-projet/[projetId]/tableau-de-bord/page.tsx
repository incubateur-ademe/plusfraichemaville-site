"use client";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_TABLEAU_DE_BORD } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";
import { TableauDeBordSuivi } from "@/src/components/tableau-de-bord/tableau-de-bord-suivi";

export default function TableauDeBordPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_TABLEAU_DE_BORD(currentProjet?.nom || "Projet en cours")} />
      <div className={clsx("-mb-40 min-h-[40rem] bg-dsfr-border-action-low-blue-france pb-40 pt-10")}>
        <div className="fr-container">
          <TableauDeBordSuivi />
        </div>
      </div>
    </>
  );
}
