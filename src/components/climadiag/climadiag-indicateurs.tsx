"use client";

import { ClimadiagIndicateursTabs } from "./climadiag-indicateurs-tabs";
import { Climadiag } from "./types";
import { ClimadiagDownloader } from "@/src/components/climadiag/climadiag-downloader";

export const ClimadiagIndicateurs = ({ climadiagInfo }: { climadiagInfo: Climadiag }) => {
  return (
    <div className="bg-dsfr-background-open-blue-france">
      <ClimadiagIndicateursTabs data={climadiagInfo} />
      <div className="float-right text-xs text-pfmv-grey">
        Les données Climadiag sont la propriété exclusive de Météo-France.
      </div>
      <div className="mt-10 text-dsfr-text-mention-grey">
        * Ces projections tiennent compte de la Trajectoire de Réchauffement et d’Adaptation au Changement Climatique
        (TRACC) correspondant à une hausse des températures moyennes en France hexgonale et en Corse de +4°C en 2100.
      </div>
      <ClimadiagDownloader data={climadiagInfo} />
    </div>
  );
};
