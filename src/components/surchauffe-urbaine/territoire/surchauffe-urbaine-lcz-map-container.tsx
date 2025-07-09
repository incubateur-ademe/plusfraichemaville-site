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
      <div className="mb-4 flex flex-col-reverse items-start justify-between gap-4 md:flex-row">
        <div>
          <Badge className="!mb-3 !bg-dsfr-background-open-blue-france !text-pfmv-navy">climat actuel</Badge>
          <div className="mb-2 mt-2 text-xl font-bold text-dsfr-text-label-blue-france">
            <i className="ri-map-pin-line mr-1  " />
            {climadiagInfo.nom} - {climadiagInfo.code_postal}
          </div>
          <div className="mb-4 text-[1.375rem] font-bold text-pfmv-navy">
            Consultez la cartographie des zones climatiques locales (LCZ)
          </div>
        </div>
        <LinkWithoutPrefetch
          className={clsx("flex cursor-pointer items-center justify-center gap-4 bg-none after:hidden")}
          target="_blank"
          href="https://climadiag-commune.meteofrance.com/"
        >
          <Image
            src="/images/lcz/logo-cerema.svg"
            width={200}
            height={48}
            alt="Cerema, Climat et territoires de demain"
          />
        </LinkWithoutPrefetch>
      </div>
      <div className="flex flex-col-reverse gap-6 md:flex-row">
        <SurchauffeUrbaineMapLczLegend className="w-full overflow-auto md:h-[37.5rem] md:w-60" />
        <LazyLCZMapClient climadiagInfo={climadiagInfo} />
      </div>
      <SurchauffeUrbaineMapLczExplanation className="mt-6" />
    </div>
  );
};

export default LCZMapContainer;
