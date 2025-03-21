"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {
  CompletionLabelCompleted,
  CompletionLabelInProgress,
  CompletionLabelNotStarted,
} from "@/src/components/common/fiche-completion-label";

export const FicheDiagnosticChoixParcours = () => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  let parcoursIndicateursProgress = <CompletionLabelNotStarted className="mr-4 mt-3 text-right" />;

  let parcoursPrestationUrl = PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD;
  let parcoursIndicateursUrl = PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD;
  let parcoursIndicateursButtonLabel = "Calculer les indicateurs";
  let parcoursPrestationButtonLabel = "Choisir des prestations";
  const hasMadeDiagnosticSimulation = !isEmpty(currentProjet?.diagnostic_simulations);
  const hasSelectedFicheDiagnostic = !isEmpty(
    getProjetFichesIdsByType({
      projet: currentProjet,
      typeFiche: TypeFiche.diagnostic,
    }),
  );
  let parcoursIndicateursLabel = "Je fais une analyse simplifiée et immédiate de la surchauffe";
  let parcoursPrestationLabel = "Je fais réaliser par un prestataire un diagnostic approfondi";
  if (projetId) {
    if (hasSelectedFicheDiagnostic) {
      parcoursPrestationUrl = PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_SELECTION(projetId);
      parcoursPrestationButtonLabel = "Consulter mes prestations";
      parcoursPrestationLabel = "Je consulte les prestations de diagnostic choisies";
    } else {
      parcoursPrestationUrl = PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projetId);
    }

    if (!hasMadeDiagnosticSimulation) {
      parcoursIndicateursUrl = PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_PRESENTATION(projetId);
    } else {
      if (!currentProjet?.diagnostic_simulations[0].validated) {
        parcoursIndicateursUrl = PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(projetId);
        parcoursIndicateursButtonLabel = "Reprendre le calcul";
        parcoursIndicateursProgress = <CompletionLabelInProgress className="mr-4 mt-3 text-right" />;
      } else {
        parcoursIndicateursUrl = PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_RESULTATS(projetId);
        parcoursIndicateursButtonLabel = "Voir mes indicateurs";
        parcoursIndicateursLabel = "Je consulte l’analyse simplifiée de mon espace";
        parcoursIndicateursProgress = <CompletionLabelCompleted className="mr-4 mt-3 text-right" />;
      }
    }
  }

  return (
    <>
      <div
        className={clsx(
          "mb-12 grid grid-cols-1  justify-center gap-10 px-10 text-center font-bold md:grid-cols-2",
          "md:flex-row md:gap-16 ",
        )}
      >
        <Link className="pfmv-strong-card flex flex-col" href={parcoursIndicateursUrl}>
          {parcoursIndicateursProgress}
          <Image
            src={"/images/fiches-diagnostic/parcours-indicateurs-environnementaux.svg"}
            alt="Parcours indicateurs thermiques"
            width={250}
            height={250}
            className="mt-12 h-40 self-center"
          />
          <div className="flex flex-col content-center items-center p-10 text-[1.375rem]">
            <div>{parcoursIndicateursLabel}</div>
            <div className="fr-btn mt-12 rounded-3xl hover:bg-dsfr-hover-blue-sun">
              {parcoursIndicateursButtonLabel}
            </div>
          </div>
        </Link>
        <Link className="pfmv-strong-card flex flex-col" href={parcoursPrestationUrl}>
          {hasSelectedFicheDiagnostic ? (
            <CompletionLabelCompleted className="mr-4 mt-3 text-right" />
          ) : (
            <CompletionLabelNotStarted className="mr-4 mt-3 text-right" />
          )}
          <Image
            src={"/images/fiches-diagnostic/parcours-prestation.svg"}
            alt="Parcours prestation"
            width={250}
            height={250}
            className="mt-12 h-40 self-center"
          />
          <div className="flex flex-col content-center items-center p-10 text-[1.375rem]">
            <div>{parcoursPrestationLabel}</div>
            <div className="fr-btn mt-12 rounded-3xl hover:bg-dsfr-hover-blue-sun">{parcoursPrestationButtonLabel}</div>
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
