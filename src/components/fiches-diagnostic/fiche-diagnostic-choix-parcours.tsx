"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import Link from "next/link";

export const FicheDiagnosticChoixParcours = () => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const savedFichesDiagnostic = getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.diagnostic });

  let urlParcoursPrestation = PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD;
  if (projetId) {
    urlParcoursPrestation = isEmpty(savedFichesDiagnostic)
      ? PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_PRESTATION_LISTE(projetId)
      : PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_PRESTATION_SELECTION(projetId);
  }

  return (
    <div>
      <Link className="pfmv-card flex h-80 w-72 flex-col md:ml-0" href={urlParcoursPrestation}>
        {"Parcours choix d'une prestation"}
      </Link>
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
    </div>
  );
};
