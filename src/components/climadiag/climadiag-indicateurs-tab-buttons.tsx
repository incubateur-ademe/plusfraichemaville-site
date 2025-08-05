import Image from "next/image";
import { PropsWithChildren } from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const ClimadiagIndicateursTabButtons = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        {children}
        <span className="text-base text-pfmv-grey">
          horizons (TRACC, 2024)<sup>*</sup>
        </span>
      </div>
      <LinkWithoutPrefetch
        className="flex gap-4 !bg-none after:!hidden hover:!bg-dsfr-background-alt-blue-france-hover"
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
  );
};
