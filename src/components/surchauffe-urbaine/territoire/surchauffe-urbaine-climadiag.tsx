"use client";
import clsx from "clsx";
import { Climadiag } from "@/src/components/climadiag/types";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Image from "next/image";
import { ClimadiagIndicateursLine } from "@/src/components/climadiag/climadiag-indicateurs-line";
import { getYearlyClimadiagData } from "@/src/components/climadiag/helpers";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const SurchauffeUrbaineClimadiag = ({
  climadiagInfo,
  className,
}: {
  climadiagInfo: Climadiag;
  className?: string;
}) => {
  const yearlyData = getYearlyClimadiagData(climadiagInfo, 2030);
  return (
    <div className={clsx("pfmv-strong-card px-4 py-10 text-left md:px-12", className)}>
      <div className="mb-4 flex flex-col-reverse items-start justify-between gap-4 md:flex-row">
        <div>
          <Badge className="!mb-3 !bg-dsfr-background-open-blue-france !text-pfmv-navy">climat futur (TRACC*)</Badge>
          <div className="mb-4 mt-2 text-xl font-bold text-dsfr-text-label-blue-france">
            <i className="ri-map-pin-line mr-1  " />
            {climadiagInfo.nom} - {climadiagInfo.code_postal}
          </div>
          <h2 className="text-[1.375rem] font-bold text-pfmv-navy">En 2030, voici les projections de Météo-France</h2>
        </div>
        <LinkWithoutPrefetch
          className="flex gap-4 !bg-none after:!hidden hover:!bg-dsfr-background-default-grey-hover"
          target="_blank"
          href="https://climadiag-commune.meteofrance.com/"
        >
          <Image
            src="/images/climadiag/climadiag-meteo-france.png"
            width={136}
            height={48}
            alt="Logo Météo France Climadiag"
          />
          <Image src="/images/climadiag/meteo-france.svg" width={48} height={48} alt="Logo Météo France" />
        </LinkWithoutPrefetch>
      </div>
      <ClimadiagIndicateursLine
        year={2030}
        temperature={yearlyData.jours_tres_chauds}
        type="jours_chauds"
        classname="border border-dsfr-border-default-grey"
        titleHeadingLevel="h3"
      />
      <ClimadiagIndicateursLine
        year={2030}
        temperature={yearlyData.nuits_chaudes}
        type="nuits_chaudes"
        classname="border border-dsfr-border-default-grey"
        titleHeadingLevel="h3"
      />
      <ClimadiagIndicateursLine
        year={2030}
        temperature={yearlyData.jours_vdc}
        type="jours_vdc"
        classname="border border-dsfr-border-default-grey"
        titleHeadingLevel="h3"
      />
      <div className="mt-6 text-dsfr-text-mention-grey">
        * Ces projections tiennent compte de la Trajectoire de Réchauffement et d’Adaptation au Changement Climatique
        (TRACC) correspondant à une hausse des températures en France métropolitaine de +2°C en 2030.
        <br />
        Climadiag commune n’est pas encore disponible pour les territoires d’Outre mer.
      </div>
      <div
        className="mt-8 flex w-full flex-wrap items-center justify-between gap-4
      rounded-2xl bg-dsfr-background-default-grey-hover px-6 py-4 text-xl font-bold text-black"
      >
        <div>Pour connaître les estimations pour 2050 et 2100, accédez à l’espace projet.</div>
        <Button className="rounded-3xl text-center" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}>
          {"Accéder à l'espace projet !"}
        </Button>
      </div>
    </div>
  );
};
