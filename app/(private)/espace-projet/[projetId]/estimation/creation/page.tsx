"use client";
import { useProjetsStore } from "@/stores/projets/provider";
import { EstimationInfoForm } from "@/forms/estimation/EstimationInfoForm";
import Button from "@codegouvfr/react-dsfr/Button";
import React from "react";
import { PFMV_ROUTES } from "@/helpers/routes";

export default function CreateEstimationPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  if (!currentProjet) {
    return null;
  }
  return (
    <div className="fr-container pt-8">
      <h1 className="mb-2 text-2xl font-bold">{"Je fais une estimation de budget pour mon projet"}</h1>
      {currentProjet.fiches_solutions_id?.length > 0 ? (
        <>
          <div className="text-lg">{`Mes solutions sélectionnées pour mon projet ${currentProjet?.nom}.`}</div>
          <div className="mb-10  text-lg">
            {`Vous pouvez estimer une fourchette de prix en fonction des matériaux et systèmes choisis.`}
          </div>
          <EstimationInfoForm projet={currentProjet} />
        </>
      ) : (
        <>
          <div>
            {"Vous ne pouvez pas faire d'estimation de budget tant que " +
              "vous n'avez pas sélectionné de fiches solutions."}
          </div>
          <Button
            className="mt-4 rounded-3xl"
            linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(currentProjet.id), target: "_self" }}
          >
            Sélectionner des fiches solutions
          </Button>
        </>
      )}
    </div>
  );
}
