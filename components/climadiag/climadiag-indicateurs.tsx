"use client";

import { ClimadiagIndicateursTabs } from "./climadiag-indicateurs-tabs";
import { Climadiag } from "./types";

export const ClimadiagIndicateurs = ({ climadiagInfo }: { climadiagInfo: Climadiag }) => {
  return (
    <div className="bg-dsfr-background-open-blue-france">
      <ClimadiagIndicateursTabs data={climadiagInfo} />
    </div>
  );
};
