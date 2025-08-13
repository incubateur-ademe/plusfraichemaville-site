import clsx from "clsx";
import { Separator } from "@/src/components/common/separator";
import Image from "next/image";
import {
  INDIEN_BIODIVERSITE,
  INDIEN_CANOPEE,
  INDIEN_PERMEABILITE,
  INDIEN_RAFRAICHISSEMENT_URBAIN,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import IndienReminderModal from "@/src/components/diagnostic-indien/indien-reminder-modal";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
// eslint-disable-next-line max-len
import { BREADCRUMB_DIAG_INDICATEURS_PRESENTATION } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-diag";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default async function IndicateursEnvironnementauxPresentationPage(props: {
  params: Promise<{ projetId: number }>;
}) {
  const params = await props.params;
  if (!params.projetId) {
    return null;
  }

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_INDICATEURS_PRESENTATION} />
      <div className="fr-container pt-8 text-black">
        <h1 className="mb-4 text-[1.75rem] font-normal">
          <strong>Je fais une analyse simplifiée de la surchauffe sur mon espace</strong> à l’état initial.
        </h1>
        <div className="mb-8 text-lg">
          {"Les indicateurs proposés ici fournissent une lecture simplifiée et relative du climat d’un espace à " +
            "rafraîchir. Ils permettent d’obtenir un premier aperçu et d’identifier des pistes d’action. Pour une " +
            "analyse plus approfondie de la surchauffe urbaine sur votre territoire, il est conseillé de faire " +
            "appel à une expertise. Quel diagnostic pour quel besoin ?"}
        </div>
        <IndienReminderModal projetId={params.projetId} />
        <div className="mb-2 mt-12 flex flex-row items-center gap-4">
          <span className="text-lg font-bold">Définition des indicateurs qui vont être calculés</span>
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
              <div className={clsx("text-xl font-bold", INDIEN_PERMEABILITE.textColor)}>
                {INDIEN_PERMEABILITE.label}
              </div>
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
              <div className={clsx("text-xl font-bold", INDIEN_BIODIVERSITE.textColor)}>
                {INDIEN_BIODIVERSITE.label}
              </div>
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
        <div className="mt-20 flex flex-col items-center gap-2 text-dsfr-text-mention-grey md:flex-row">
          <span>
            Indicateurs créés par{" "}
            <LinkWithoutPrefetch href={"https://www.tribu.coop/"} target="_blank">
              TRIBU
            </LinkWithoutPrefetch>
          </span>
          <Image
            src="/images/fiches-diagnostic/indicateurs-environnementaux/logo-tribu.jpg"
            width={250}
            height={222}
            alt="Logo du bureau d'étude TRIBU"
            className="ml-2 w-10"
          />
          <LinkWithoutPrefetch
            className="ml-5 !text-dsfr-text-mention-grey after:hidden"
            download
            target="_blank"
            href="/documents/diagnostic/indicateurs-environnementaux/pfmv-calcul-indicateurs-environnementaux.pdf"
          >
            Télécharger la notice de calcul
            <i className="ri-download-2-line size-4 before:!mb-1 before:ml-2 before:!size-4" />
          </LinkWithoutPrefetch>
        </div>
      </div>
    </>
  );
}
