"use client";

import dynamic from "next/dynamic";

import { Climadiag } from "@/src/components/climadiag/types";
import clsx from "clsx";
import { AnnuaireMapSkeleton } from "@/src/components/annuaire/map/annuaire-map-skeleton";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Image from "next/image";
import { SurchauffeUrbaineMapLczLegend } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-map-lcz-legend";
import Link from "next/link";

const LazyLCZMapClient = dynamic(() => import("./surchauffe-urbaine-lcz-map"), {
  ssr: false,
  loading: () => <AnnuaireMapSkeleton />,
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
          <div className="mb-4 mt-2 text-xl font-bold text-dsfr-text-label-blue-france">
            <i className="ri-map-pin-line mr-1  " />
            {climadiagInfo.nom} - {climadiagInfo.code_postal}
          </div>
          <div className="text-[1.375rem] font-bold text-pfmv-navy">
            Consultez la cartographie des zones climatiques locales (LCZ) pour repérer les secteurs potentiellement
            sensibles à la surchauffe urbaine.
          </div>
        </div>
        <Link
          className={clsx("flex cursor-pointer items-center justify-center gap-4 bg-none after:hidden")}
          target="_blank"
          href="https://climadiag-commune.meteofrance.com/"
        >
          <Image
            src="/images/lcz/logo-cerema.svg"
            width={240}
            height={48}
            alt="Cerema, Climat et territoires de demain"
          />
        </Link>
      </div>
      <div className="flex flex-row">
        <SurchauffeUrbaineMapLczLegend />
        <LazyLCZMapClient climadiagInfo={climadiagInfo} />
      </div>
    </div>
  );
};

export default LCZMapContainer;
