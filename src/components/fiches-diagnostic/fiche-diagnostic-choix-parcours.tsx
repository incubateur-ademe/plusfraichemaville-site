"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import Link from "next/link";
import Image from "next/image";

export const FicheDiagnosticChoixParcours = () => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const savedFichesDiagnostic = getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.diagnostic });

  let urlParcoursPrestation = PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD;
  let urlParcoursIndicateurs = PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD;
  if (projetId) {
    urlParcoursPrestation = isEmpty(savedFichesDiagnostic)
      ? PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projetId)
      : PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_SELECTION(projetId);
    urlParcoursIndicateurs = PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_PRESENTATION(projetId);
  }

  return (
    <>
      <div className="mb-12 flex flex-1 flex-col justify-center  gap-10 px-10 text-center font-bold md:flex-row">
        <Link className="pfmv-card flex flex-col items-center text-[1.375rem] md:ml-0" href={urlParcoursIndicateurs}>
          <Image
            src={"/images/fiches-diagnostic/parcours-indicateurs-environnementaux.svg"}
            alt="Parcours indicateurs thermiques"
            width={250}
            height={250}
            className="mt-12 h-40"
          />
          <div className="flex flex-col content-center items-center p-10">
            <div>Je calcule les indicateurs environnementaux de mon espace</div>
            <div className="font-normal text-dsfr-text-mention-grey">(en open source)</div>
            <div className="fr-btn mt-12 rounded-3xl hover:bg-dsfr-hover-blue-sun">Calculer les indicateurs</div>
          </div>
        </Link>
        <Link className="pfmv-card flex flex-col items-center text-[1.375rem] md:ml-0" href={urlParcoursPrestation}>
          <Image
            src={"/images/fiches-diagnostic/parcours-prestation.svg"}
            alt="Parcours prestation"
            width={250}
            height={250}
            className="mt-12 h-40"
          />
          <div className="flex flex-col content-center items-center p-10">
            <div>Je choisis les bonnes prestations de diagnostic de surchauffe</div>
            <div className="font-normal text-dsfr-text-mention-grey">(en bureau d’étude)</div>
            <div className="fr-btn mt-12 rounded-3xl hover:bg-dsfr-hover-blue-sun">Choisir des prestations</div>
          </div>
        </Link>
      </div>
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
    </>
  );
};
