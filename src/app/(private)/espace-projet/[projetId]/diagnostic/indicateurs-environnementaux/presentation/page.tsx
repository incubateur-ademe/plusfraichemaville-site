import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import React from "react";
import { Separator } from "@/src/components/common/separator";
import Image from "next/image";

export default async function IndicateursEnvironnementauxPresentationPage(props: {
  params: Promise<{ projetId: number }>;
}) {
  const params = await props.params;
  if (!params.projetId) {
    return null;
  }
  return (
    <div className="fr-container pt-8 text-black">
      <h1 className="mb-4 text-2xl font-bold">
        Je calcule les indicateurs environnementaux de mon espace à l’état initial
      </h1>
      <div className={"mb-8 text-lg"}>
        {"Les indicateurs environnementaux sont des valeurs simplifiées et relatives. Ils offrent une première " +
          "compréhension de l’lecture climatique d’un espace à rafraîchir et permettent d’analyser les impacts " +
          "théoriques de différents scénarios. Pour un diagnostic plus poussé de la surchauffe urbaine, " +
          "l’accompagnement d’un bureau d’études est recommandé."}
      </div>
      <div>
        <Link
          className="fr-btn rounded-3xl"
          href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(params.projetId)}
        >
          Commencer le calcul
        </Link>
        <i className={clsx("ri-timer-line", "fr-icon--sm ml-4 mr-1 text-dsfr-text-mention-grey")} />
        <span className="text-sm text-dsfr-text-mention-grey">Environ 10 minutes</span>
      </div>
      <div className="mb-12 mt-10 flex flex-row items-center gap-4">
        <span className="text-lg font-bold">Les indicateurs environnementaux</span>
        <span>
          <Link
            className="!text-dsfr-text-mention-grey after:hidden"
            download
            target="_blank"
            href="/documents/diagnostic/indicateurs-environnementaux/pfmv-calcul-indicateurs-environnementaux.pdf"
          >
            Télécharger la notice de calcul
            <i className="ri-download-2-line size-4 before:!mb-1 before:ml-2 before:!size-4" />
          </Link>
        </span>
      </div>
      <Separator className="!opacity-80" />
      <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:gap-16">
        <div className="flex basis-1/4 flex-row items-center  gap-6">
          <Image
            src="/images/fiches-diagnostic/indicateurs-environnementaux/rafraichissement-urbain.svg"
            width={28}
            height={51}
            alt=""
            className="h-16"
          />
          <div>
            <div className="text-dsfr-text-mention-grey">Le coefficient de</div>
            <div className="text-lg font-bold text-coeff-rafraichissement-urbain">Rafraîchissement urbain</div>
          </div>
        </div>
        <div className="max-w-[41rem]">
          {"Il quantifie l’impact potentiel des surfaces sur la surchauffe urbaine (îlot de chaleur et confort " +
            "extérieur en été) au regard de plusieurs critères cumulés : l’albédo, facteur de réflexion liés aux " +
            "propriétés radiatives d’une surface, l’inertie thermique des surfaces, l’évaporation des sols et " +
            "surfaces en eau, la transpiration des végétaux."}
        </div>
      </div>
      <Separator className="!opacity-80" />
      <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:gap-16">
        <div className="flex basis-1/4 flex-row items-center gap-6">
          <Image
            src="/images/fiches-diagnostic/indicateurs-environnementaux/permeabilite.svg"
            width={50}
            height={46}
            alt=""
            className="h-16"
          />
          <div>
            <div className="text-dsfr-text-mention-grey">Le coefficient de</div>
            <div className="text-lg font-bold text-coeff-permeabilite">Perméabilité</div>
          </div>
        </div>
        <div className="max-w-[41rem]">
          {"Il correspond à la part de ruissellement de l’eau de pluie sur les surfaces. Le coefficient de" +
            " ruissellement TRIBU propose une approche simplifiée de la définition classique du coefficient" +
            " de ruissellement : il ne dépend pas de l’événement pluvieux et ne prend pas en compte l’effet" +
            " de la pente."}
        </div>
      </div>
      <Separator className="!opacity-80" />
      <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:gap-16">
        <div className="flex basis-1/4 flex-row items-center gap-6">
          <Image
            src="/images/fiches-diagnostic/indicateurs-environnementaux/biodiversite.svg"
            width={45}
            height={49}
            alt=""
            className="h-16"
          />
          <div>
            <div className="text-dsfr-text-mention-grey">Le coefficient de</div>
            <div className="text-lg font-bold text-coeff-biodiversite">Biodiversité</div>
          </div>
        </div>
        <div className="max-w-[41rem]">
          {"Le coefficient de biodiversité d’un espace où 0 est un espace totalement minéral et le 1 un espace " +
            "végétal (parc). L’indicateur prend en compte le type d’espaces verts avec sa capacité à accueillir " +
            "la biodiversité (prairie, espace buissonnant, noue, végétation sur dalle, canopée). La présence " +
            "d’arbres vient augmenter le coefficient."}
        </div>
      </div>
      <Separator className="!opacity-80" />
      <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:gap-16">
        <div className="flex basis-1/4 flex-row items-center gap-6">
          <Image
            src="/images/fiches-diagnostic/indicateurs-environnementaux/canopee.svg"
            width={35}
            height={35}
            alt=""
            className="h-16"
          />
          <div className="text-lg font-bold text-coeff-canopee">La part de Canopée</div>
        </div>
        <div className="max-w-[41rem]">{"Texte décrivant ce qu'est la part de Canopée."}</div>
      </div>
      <Separator className="!opacity-80" />
      <div className="mt-20 flex items-center gap-2">
        Qui est{" "}
        <Link href={"https://www.tribu.coop/"} target="_blank">
          TRIBU
        </Link>
        <Image
          src="/images/fiches-diagnostic/indicateurs-environnementaux/logo-tribu.jpg"
          width={250}
          height={222}
          alt="Logo du bureau d'étude TRIBU"
          className="ml-4 w-10"
        />
      </div>
    </div>
  );
}
