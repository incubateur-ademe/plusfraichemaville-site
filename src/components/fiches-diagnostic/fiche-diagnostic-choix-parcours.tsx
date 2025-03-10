"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import Link from "next/link";
import Button from "@codegouvfr/react-dsfr/Button";

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
      <div className="mb-8 flex justify-between px-36 text-center font-bold">
        <div className="pfmv-flat-card flex w-[25rem] flex-col text-xl md:ml-0">
          <div className="h-40 rounded-t-2xl bg-dsfr-background-alt-blue-france" />
          <div className="flex flex-col content-center items-center p-12">
            <div>{"Je fais un état des lieux thermique et environnemental de l’espace à rafraîchir"}</div>
            <Button className="mt-12 rounded-2xl" disabled onClick={() => {}}>
              {"Utiliser l'outil de calcul"}
            </Button>
          </div>
        </div>
        <Link className="pfmv-card flex w-[25rem] flex-col text-xl md:ml-0" href={urlParcoursPrestation}>
          <div className="h-40 rounded-t-2xl bg-dsfr-background-alt-blue-france" />
          <div className="flex flex-col content-center items-center p-12">
            <div>{"Je choisis les bonnes prestations de diagnostic de surchauffe"}</div>
            <div className="fr-btn mt-12 rounded-2xl">{"Choisir les prestations"}</div>
          </div>
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
