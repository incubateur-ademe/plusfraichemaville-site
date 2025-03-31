"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import React from "react";
import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import IndienResultRange from "@/src/components/diagnostic-indien/indien-result-range";
// eslint-disable-next-line max-len
import {
  INDIEN_BIODIVERSITE,
  INDIEN_CANOPEE,
  INDIEN_PERMEABILITE,
  INDIEN_RAFRAICHISSEMENT_URBAIN,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import clsx from "clsx";
import Image from "next/image";
import IndienCoeffExplanationModal from "@/src/components/diagnostic-indien/indien-coeff-explanation-modal";
import { IndienResultCombinaisonAdvice } from "@/src/components/diagnostic-indien/indien-result-combinaison-advice";
import {
  TYPE_SOLUTION_BLEUE,
  TYPE_SOLUTION_DOUCE,
  TYPE_SOLUTION_GRISE,
  TYPE_SOLUTION_VERTE,
} from "@/src/helpers/type-fiche-solution";
import IndienResultPieChartSurface from "@/src/components/diagnostic-indien/indien-result-surface-repartition";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_DIAG_INDICATEURS_RESULTATS } from "@/src/components/espace-projet/banner/breadcurmb-list";

export default function IndicateursEnvironnementauxResultatsPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  if (!currentProjet) {
    return null;
  }
  const diagnosticSimulation = currentProjet.diagnostic_simulations[0];
  if (!diagnosticSimulation) {
    return (
      <div className="fr-container pt-8">
        <h1 className="mb-4 text-2xl font-bold">
          {"Vous n'avez pas encore renseigné les données de diagnostic de votre projet !"}
        </h1>
        <Link
          href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(currentProjet.id)}
          className="fr-btn rounded-3xl"
        >
          Renseigner les données de diagnostic
        </Link>
      </div>
    );
  }
  const diagnosticResults = diagnosticSimulation.initial_values as ProjetIndiEnSimuation;
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_INDICATEURS_RESULTATS} />
      <div className="fr-container pt-8">
        <h1 className="mb-4 text-[1.75rem] font-bold">Je découvre mes résultats !</h1>
        <div className="mb-8 flex flex-row items-center justify-between gap-6">
          <div className="text-[1.375rem] font-bold">
            Analyse simplifiée de la surchauffe au sein de mon espace, à l’état initial.
          </div>
          <div>
            <Link
              href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(currentProjet.id)}
              className="fr-btn fr-btn--secondary rounded-3xl"
            >
              Modifier la saisie
            </Link>
          </div>
        </div>
        <div className="rounded-2xl bg-dsfr-background-alt-blue-france p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4 font-bold">Indicateurs majeurs</div>
              <IndienResultRange
                coefficientValue={diagnosticResults.coeffRafraichissementUrbain}
                coefficient={INDIEN_RAFRAICHISSEMENT_URBAIN}
                large
              />
            </div>
            <div>
              <div className="mb-4 font-bold">Autres indicateurs</div>
              <IndienResultRange
                className="mb-3"
                coefficientValue={diagnosticResults.coeffPermeabilite}
                coefficient={INDIEN_PERMEABILITE}
              />
              <IndienResultRange
                className="mb-3"
                coefficientValue={diagnosticResults.coeffBiodiversite}
                coefficient={INDIEN_BIODIVERSITE}
              />
              <div className="mb-6 rounded-2xl bg-white px-4 py-2">
                <IndienCoeffExplanationModal coefficient={INDIEN_CANOPEE} />
                <div className="mr-10 flex flex-row items-center justify-between gap-4">
                  <div className="flex flex-row items-center gap-6">
                    <Image src={INDIEN_CANOPEE.icone} width={51} height={51} alt="" className="h-10" />
                    <div className={clsx("text-lg font-bold", INDIEN_CANOPEE.textColor)}>{INDIEN_CANOPEE.label}</div>
                  </div>
                  <div className="text-2xl font-bold">{diagnosticResults.partCanopee} %</div>
                </div>
              </div>
            </div>
          </div>
          <IndienResultPieChartSurface results={diagnosticResults} className="" />
          <div className="mx-2 mt-8 flex flex-row items-center gap-4 rounded-2xl bg-white p-4">
            <Image
              src="/images/fiches-diagnostic/indicateurs-environnementaux/ampoule-idee.svg"
              height={39}
              width={34}
              alt="Point d'attention"
              className="mb-2 h-10"
            />
            <div className="text-sm">
              {"Si vous souhaitez faire un"} <strong>{"diagnostic approfondi"}</strong>
              {", de nombreuses expertises peuvent vous éclairer : vous pouvez cartographier l’îlot de chaleur urbain" +
                " ou encore évaluer le confort thermique de vos usagers. Nous vous aidons à choisir les "}
              <Link href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(currentProjet.id)}>
                {"méthodes adaptées à votre projet."}
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-10 text-[1.375rem] font-bold">
          Que puis-je faire pour rafraîchir mon espace ? Combiner différents types de solutions !
        </div>
        <div className="flex flex-col gap-6 rounded-2xl bg-dsfr-background-alt-blue-france p-6">
          <IndienResultCombinaisonAdvice projetId={currentProjet.id} typeSolution={TYPE_SOLUTION_VERTE} />
          <IndienResultCombinaisonAdvice projetId={currentProjet.id} typeSolution={TYPE_SOLUTION_BLEUE} />
          <IndienResultCombinaisonAdvice projetId={currentProjet.id} typeSolution={TYPE_SOLUTION_GRISE} />
          <IndienResultCombinaisonAdvice projetId={currentProjet.id} typeSolution={TYPE_SOLUTION_DOUCE} />
        </div>
      </div>
    </>
  );
}
