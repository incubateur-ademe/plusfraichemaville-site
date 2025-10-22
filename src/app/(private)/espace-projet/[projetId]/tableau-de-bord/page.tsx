"use client";
import { TableauDeBord } from "@/src/components/tableau-de-bord";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_TABLEAU_DE_BORD } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import { useProjetsStore } from "@/src/stores/projets/provider";

export default function TableauDeBordPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_TABLEAU_DE_BORD(currentProjet?.nom || "Projet en cours")} />
      <TableauDeBord />
    </>
  );
}
