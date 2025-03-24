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
import { Separator } from "@/src/components/common/separator";
import IndienResultExplanation from "@/src/components/diagnostic-indien/indien-result-explanation";
import IndienCoeffExplanationModal from "@/src/components/diagnostic-indien/indien-coeff-explanation-modal";

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
    <div className="fr-container pt-8">
      <h1 className="mb-4 text-2xl font-bold">Je découvre mes résultats !</h1>
      <div className="mb-8 flex flex-row items-center justify-between gap-6">
        <div className="text-lg">Analyse simplifiée de la surchauffe au sein de mon espace, à l’état initial.</div>
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
            <div className="font-bold mb-4">Indicateurs majeurs</div>
            <IndienResultRange
              coefficientValue={diagnosticResults.coeffRafraichissementUrbain}
              coefficient={INDIEN_RAFRAICHISSEMENT_URBAIN}
              large
            />
          </div>
          <div>
            <div className="font-bold mb-4">Autres indicateurs</div>
            <IndienResultRange
              className="mb-6"
              coefficientValue={diagnosticResults.coeffPermeabilite}
              coefficient={INDIEN_PERMEABILITE}
            />
            <IndienResultRange
              className="mb-6"
              coefficientValue={diagnosticResults.coeffBiodiversite}
              coefficient={INDIEN_BIODIVERSITE}
            />
            <div className="rounded-2xl bg-white px-4 py-2 mb-6">
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
        <div>
          <div className="mb-2 mt-2 text-lg font-bold">Interprétation des résultats</div>
          <Separator className="mb-6" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <IndienResultExplanation
              coefficientValue={diagnosticResults.coeffRafraichissementUrbain}
              coefficient={INDIEN_RAFRAICHISSEMENT_URBAIN}
              large
            />
            <IndienResultExplanation
              coefficientValue={diagnosticResults.coeffPermeabilite}
              coefficient={INDIEN_PERMEABILITE}
            />
            <IndienResultExplanation coefficientValue={diagnosticResults.partCanopee} coefficient={INDIEN_CANOPEE} />
            <IndienResultExplanation
              coefficientValue={diagnosticResults.coeffBiodiversite}
              coefficient={INDIEN_BIODIVERSITE}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
