"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { EstimationInfoForm } from "@/src/forms/estimation/EstimationInfoForm";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { isEmpty } from "@/src/helpers/listUtils";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import React from "react";
// eslint-disable-next-line max-len
import { BREADCRUMB_ESTIMATION_CREATION } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-estimation";

export default function CreateEstimationPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const fichesSolutionsIds = getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution });

  if (!currentProjet) {
    return null;
  }

  return (
    <ProtectedEspaceProjetUrl>
      <BannerProjetBreadcrumb step={BREADCRUMB_ESTIMATION_CREATION} />
      <div className="fr-container pt-8">
        <h1 className="mb-2 text-2xl font-bold">{"Je fais une estimation de budget pour mon projet"}</h1>
        {!isEmpty(fichesSolutionsIds) ? (
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
    </ProtectedEspaceProjetUrl>
  );
}
