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
      <div className="mb-8 flex justify-between px-28">
        <div className="pfmv-card flex h-80 w-96 flex-col p-8 text-xl md:ml-0">
          {"Je fais un état des lieux thermique et environnemental de l’espace à rafraîchir"}
        </div>
        <Link className="pfmv-card flex h-80 w-96 flex-col p-8  text-xl md:ml-0" href={urlParcoursPrestation}>
          {"Je choisis les bonnes prestations de diagnostic\n" + "de surchauffe"}
        </Link>
      </div>
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
    </div>
  );
};
