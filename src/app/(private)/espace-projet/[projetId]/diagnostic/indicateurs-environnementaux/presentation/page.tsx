import Link from "next/link";
import clsx from "clsx";
import React from "react";
import { Separator } from "@/src/components/common/separator";
import Image from "next/image";
import {
  INDIEN_BIODIVERSITE,
  INDIEN_CANOPEE,
  INDIEN_PERMEABILITE,
  INDIEN_RAFRAICHISSEMENT_URBAIN,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import IndienReminderModal from "@/src/components/diagnostic-indien/indien-reminder-modal";

export default async function IndicateursEnvironnementauxPresentationPage(props: {
  params: Promise<{ projetId: number }>;
}) {
  const params = await props.params;
  if (!params.projetId) {
    return null;
  }

  return (
    <div className="fr-container pt-8 text-black">
      <h1 className="mb-4 text-[1.75rem] font-normal">
        <strong>Je fais une analyse simplifiée de la surchauffe sur mon espace</strong> à l’état initial.
      </h1>
      <div className="mb-8 text-lg">
        {"Les indicateurs environnementaux sont des valeurs simplifiées et relatives. Ils offrent une première " +
          "compréhension de l’lecture climatique d’un espace à rafraîchir et permettent d’analyser les impacts " +
          "théoriques de différents scénarios. Pour un diagnostic plus poussé de la surchauffe urbaine, " +
          "l’accompagnement d’un bureau d’études est recommandé."}
      </div>
      <div>
        <IndienReminderModal projetId={params.projetId} />
        <i className={clsx("ri-timer-line", "fr-icon--sm ml-4 mr-1 text-dsfr-text-mention-grey")} />
        <span className="text-sm text-dsfr-text-mention-grey">Environ 10 minutes</span>
      </div>
      <div className="mb-4 mt-10 flex flex-row items-center gap-4">
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
        <div className="flex basis-1/4 flex-row items-center gap-6">
          <Image src={INDIEN_RAFRAICHISSEMENT_URBAIN.icone} width={51} height={51} alt="" className="h-16" />
          <div>
            <div className="text-dsfr-text-mention-grey">Le coefficient de</div>
            <div className={clsx("text-xl font-bold", INDIEN_RAFRAICHISSEMENT_URBAIN.textColor)}>
              {INDIEN_RAFRAICHISSEMENT_URBAIN.label}
            </div>
          </div>
        </div>
        <div className="max-w-[41rem]">{INDIEN_RAFRAICHISSEMENT_URBAIN.explanation}</div>
      </div>
      <Separator className="!opacity-80" />
      <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:gap-16">
        <div className="flex basis-1/4 flex-row items-center gap-6">
          <Image src={INDIEN_PERMEABILITE.icone} width={51} height={51} alt="" className="h-16" />
          <div>
            <div className="text-dsfr-text-mention-grey">Le coefficient de</div>
            <div className={clsx("text-xl font-bold", INDIEN_PERMEABILITE.textColor)}>{INDIEN_PERMEABILITE.label}</div>
          </div>
        </div>
        <div className="max-w-[41rem]">{INDIEN_PERMEABILITE.explanation}</div>
      </div>
      <Separator className="!opacity-80" />
      <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:gap-16">
        <div className="flex basis-1/4 flex-row items-center gap-6">
          <Image src={INDIEN_BIODIVERSITE.icone} width={51} height={51} alt="" className="h-16" />
          <div>
            <div className="text-dsfr-text-mention-grey">Le coefficient de</div>
            <div className={clsx("text-xl font-bold", INDIEN_BIODIVERSITE.textColor)}>{INDIEN_BIODIVERSITE.label}</div>
          </div>
        </div>
        <div className="max-w-[41rem]">{INDIEN_BIODIVERSITE.explanation}</div>
      </div>
      <Separator className="!opacity-80" />
      <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:gap-16">
        <div className="flex basis-1/4 flex-row items-center gap-6">
          <Image src={INDIEN_CANOPEE.icone} width={51} height={51} alt="" className="h-16" />
          <div className={clsx("text-xl font-bold", INDIEN_CANOPEE.textColor)}>{INDIEN_CANOPEE.label}</div>
        </div>
        <div className="max-w-[41rem]">{INDIEN_CANOPEE.explanation}</div>
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
