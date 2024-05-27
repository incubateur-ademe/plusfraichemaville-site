"use client";

import { ClimadiagIndicateursTabs } from "./climadiag-indicateurs-tabs";
import { Climadiag } from "./types";

export const ClimadiagIndicateurs = ({ climadiagInfo }: { climadiagInfo: Climadiag }) => {
  return (
    <div className="bg-dsfr-background-open-blue-france">
      <ClimadiagIndicateursTabs data={climadiagInfo} />
      <div className="float-right text-xs text-pfmv-grey">
        Les données Climadiag sont la propriété exclusive de Météo-France.
      </div>
    </div>
  );
};
