"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";

import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import Image from "next/image";
import {
  CompletionLabelCompleted,
  CompletionLabelInProgress,
  CompletionLabelNotStarted,
} from "@/src/components/common/fiche-completion-label";
import { Separator } from "@/src/components/common/separator";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

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
      parcoursPrestationUrl = PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_MES_PRESTATIONS(projetId);
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
      <div className="mb-12 flex flex-col justify-center gap-8 px-10 text-center font-bold md:flex-row ">
        <LinkWithoutPrefetch className="pfmv-strong-card max-w-[30rem]" href={parcoursIndicateursUrl}>
          {parcoursIndicateursProgress}
          <Image
            src="/images/fiches-diagnostic/parcours-indicateurs-environnementaux.svg"
            alt="Parcours indicateurs thermiques"
            width={250}
            height={250}
            className="mx-auto mt-12 h-40"
          />
          <div className="content-center items-center p-10">
            <div className="text-[1.375rem]">{parcoursIndicateursLabel}</div>
            <Separator className="my-4" />
            <div className="mb-8 text-left font-normal text-dsfr-text-mention-grey">
              Observez la surchauffe au sein de votre espace à un instant “T” à l’aide de quatre indicateurs open source
              et de vos propres relevés terrain.
            </div>
            <div className="fr-btn rounded-3xl hover:bg-dsfr-hover-blue-sun">{parcoursIndicateursButtonLabel}</div>
          </div>
        </LinkWithoutPrefetch>
        <LinkWithoutPrefetch className="pfmv-strong-card flex max-w-[30rem] flex-col" href={parcoursPrestationUrl}>
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
          <div className="content-center items-center p-10">
            <div className="text-[1.375rem]">{parcoursPrestationLabel}</div>
            <Separator className="my-4" />
            <div className="mb-8 text-left font-normal text-dsfr-text-mention-grey">
              Sollicitez une expertise pour une analyse détaillée de l’effet d’îlot de chaleur urbain et/ou du confort
              thermique, à différentes échelles.
            </div>
            <div className="fr-btn rounded-3xl hover:bg-dsfr-hover-blue-sun">{parcoursPrestationButtonLabel}</div>
          </div>
        </LinkWithoutPrefetch>
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
