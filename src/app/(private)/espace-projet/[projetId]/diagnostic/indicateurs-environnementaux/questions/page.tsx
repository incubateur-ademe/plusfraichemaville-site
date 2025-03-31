"use client";
import IndicateursEnvironnementauxForm from "@/src/forms/indicateursEnvironnementaux/indicateurs-environnementaux-form";
import { useProjetsStore } from "@/src/stores/projets/provider";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_DIAG_INDICATEURS_QUESTIONS } from "@/src/components/espace-projet/banner/breadcurmb-list";
import React from "react";

export default function IndicateursEnvironnementauxPresentationPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  if (!currentProjet) {
    return null;
  }
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_INDICATEURS_QUESTIONS} />
      <div className="fr-container ">
        <IndicateursEnvironnementauxForm projet={currentProjet} />
      </div>
    </>
  );
}
