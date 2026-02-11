"use client";

import { ClimadiagIndicateursTabs } from "./climadiag-indicateurs-tabs";
import { ClimadiagDownloader } from "@/src/components/climadiag/climadiag-downloader";
import { ClimadiagDto } from "@/src/types/dto";

export const ClimadiagIndicateurs = ({ climadiagInfo }: { climadiagInfo: ClimadiagDto }) => {
  return (
    <div className="bg-dsfr-background-open-blue-france">
      <ClimadiagIndicateursTabs data={climadiagInfo} />
      <div className="float-right text-xs text-pfmv-grey">
        Les données Climadiag sont la propriété exclusive de Météo-France.
      </div>
      <div className="mt-10 text-dsfr-text-mention-grey">
        * Ces projections tiennent compte de la Trajectoire de Réchauffement et d’Adaptation au Changement Climatique
        (TRACC) correspondant à une hausse des températures en France métropolitaine de +2°C en 2030.
        <br />
        Climadiag commune n’est pas encore disponible pour les territoires d’Outre mer.
      </div>
      <ClimadiagDownloader data={climadiagInfo} />
    </div>
  );
};
