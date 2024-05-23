"use client";
import { climadiag } from "@prisma/client";

export const ClimadiagIndicateurs = ({ climadiagInfo }: { climadiagInfo: climadiag }) => {
  return <div className="bg-dsfr-background-open-blue-france">{JSON.stringify(climadiagInfo)}</div>;
};
