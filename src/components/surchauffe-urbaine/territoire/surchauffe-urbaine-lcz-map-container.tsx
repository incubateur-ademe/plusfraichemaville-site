"use client";

import dynamic from "next/dynamic";

import { Climadiag } from "@/src/components/climadiag/types";
import clsx from "clsx";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Image from "next/image";
import { SurchauffeUrbaineMapLczLegend } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-map-lcz-legend";
import { SurchauffeUrbaineMapLczExplanation } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-map-lcz-explanation";
import { LczMapSkeleton } from "@/src/components/surchauffe-urbaine/territoire/lcz-map-skeleton";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

const LazyLCZMapClient = dynamic(() => import("./surchauffe-urbaine-lcz-map"), {
  ssr: false,
  loading: () => <LczMapSkeleton />,
});

type LCZMapContainerProps = {
  climadiagInfo: Climadiag;
  className?: string;
};

const LCZMapContainer = ({ climadiagInfo, className }: LCZMapContainerProps) => {
  return (
    <div className={clsx("pfmv-strong-card mt-8 px-4 py-10 text-left md:px-12", className)}>
      <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row">
        <div>
          <Badge className="!mb-3 !bg-dsfr-background-open-blue-france !text-pfmv-navy">climat actuel</Badge>
          <div className="mb-2 mt-2 text-xl font-bold text-dsfr-text-label-blue-france">
            <i className="ri-map-pin-line mr-1  " />
            {climadiagInfo.nom} - {climadiagInfo.code_postal}
          </div>
          <div className="mb-2 text-[1.375rem] font-bold text-pfmv-navy">
            Consultez la cartographie des zones climatiques locales (LCZ)
          </div>
        </div>
        <LinkWithoutPrefetch
          className={clsx(
            "flex h-24 items-center justify-center gap-8 after:!hidden",
            "!bg-none hover:!bg-dsfr-background-default-grey-hover",
          )}
          target="_blank"
          href="https://www.cerema.fr/fr/actualites/cerema-publie-nouvelles-donnees-surchauffe-urbaine"
        >
          <div>
            <Image
              src="/images/logo-rf.svg"
              width={100}
              height={48}
              alt="Cerema, Climat et territoires de demain"
              className="h-24 w-fit"
            />
          </div>
          <div>
            <Image
              src="/images/lcz/logo-cerema.svg"
              width={100}
              height={48}
              alt="Cerema, Climat et territoires de demain"
              className="h-24 w-fit"
            />
          </div>
        </LinkWithoutPrefetch>
      </div>
      <p className="!mb-2">
        Le Cerema met à disposition gratuitement l’outil « Zones climatiques locales » (LCZ), qui classe les quartiers
        selon leurs caractéristiques urbaines influençant leur degré d’exposition à la surchauffe urbaine. Cet outil
        couvre 12 000 communes réparties sur 88 aires urbaines les plus densément peuplées de France, soit 44 millions
        d’habitants.
      </p>
      <p className="!mb-8">
        <span className="text-dsfr-text-default-grey">
          Pour en savoir plus sur l’utilisation de cette donnée, rendez-vous sur le{" "}
          <LinkWithoutPrefetch
            href="https://www.cerema.fr/fr/actualites/cerema-publie-nouvelles-donnees-surchauffe-urbaine"
            target="_blank"
            className="font-bold"
          >
            site du Cerema
          </LinkWithoutPrefetch>
          .
        </span>
      </p>
      <div className="flex flex-col-reverse gap-6 md:flex-row">
        <SurchauffeUrbaineMapLczLegend className="w-full md:h-[37.5rem] md:w-60 md:overflow-auto" />
        <div className="h-[30rem] w-full md:h-[37.5rem]">
          <LazyLCZMapClient climadiagInfo={climadiagInfo} />
        </div>
      </div>
      <SurchauffeUrbaineMapLczExplanation className="mt-6" />
    </div>
  );
};

export default LCZMapContainer;
