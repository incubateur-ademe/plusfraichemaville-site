import { BREADCRUMB_UTILISATEURS_PROJET } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { PartageOverviewAdmin } from "@/src/components/espace-projet/utilisateurs-projet/partage-overview-admin";
import { PartageOverviewQuit } from "@/src/components/espace-projet/utilisateurs-projet/partage-overview-quit";
import React from "react";

export default function Page() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_UTILISATEURS_PROJET} />
      <div className="fr-container pt-8">
        <h1 className="text-2xl ">Gérer les membres de votre collectivité sur ce projet</h1>
        <PartageOverviewAdmin />
        <PartageOverviewQuit />
      </div>
    </>
  );
}
