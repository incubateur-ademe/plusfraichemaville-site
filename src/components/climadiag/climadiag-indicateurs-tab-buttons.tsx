import Image from "next/image";
import { PropsWithChildren } from "react";

export const ClimadiagIndicateursTabButtons = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        {children}
        <span className="text-base text-pfmv-grey">
          horizons (TRACC, 2024)<sup>*</sup>
        </span>
      </div>
      <div
        className="flex cursor-pointer items-center justify-center gap-4 hover:bg-dsfr-background-alt-blue-france-hover"
        onClick={() => window.open("https://climadiag-commune.meteofrance.com/", "_blank")}
      >
        <Image
          src="/images/climadiag/climadiag-meteo-france.png"
          width={136}
          height={48}
          alt="Logo Météo France Climadiag"
        />
        <Image src="/images/climadiag/meteo-france.svg" width={48} height={48} alt="Logo Météo France" />
      </div>
    </div>
  );
};
