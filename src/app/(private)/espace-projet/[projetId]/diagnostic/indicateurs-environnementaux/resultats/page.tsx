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
      <div className="flex flex-row items-center justify-between gap-6">
        <div className="mb-8 text-lg">Analyse simplifiée de la surchauffe au sein de mon espace, à l’état initial.</div>
        <div>
          <Link
            href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(currentProjet.id)}
            className="fr-btn fr-btn--secondary rounded-3xl"
          >
            Modifier la saisie
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 rounded-2xl bg-dsfr-background-alt-blue-france p-8">
        <IndienResultRange
          coefficientValue={diagnosticResults.coeffRafraichissementUrbain}
          coefficient={INDIEN_RAFRAICHISSEMENT_URBAIN}
        />
        <IndienResultRange coefficientValue={diagnosticResults.coeffPermeabilite} coefficient={INDIEN_PERMEABILITE} />
        <IndienResultRange coefficientValue={diagnosticResults.coeffBiodiversite} coefficient={INDIEN_BIODIVERSITE} />
        <div className="rounded-2xl bg-white p-6">
          <i className={clsx("ri-information-2-line float-right", INDIEN_CANOPEE.textColor)} />
          <div className="mr-10 mt-4 flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-6">
              <Image src={INDIEN_CANOPEE.icone} width={51} height={51} alt="" className="h-16" />
              <div className={clsx("text-xl font-bold", INDIEN_CANOPEE.textColor)}>{INDIEN_CANOPEE.label}</div>
            </div>
            <div className="text-2xl font-bold">{diagnosticResults.partCanopee} %</div>
          </div>
        </div>
      </div>
    </div>
  );
}
