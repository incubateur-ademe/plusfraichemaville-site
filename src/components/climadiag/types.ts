import { ClimadiagTemperatureProjection, ProjectionsIndicateurClimadiag } from "@/src/lib/prisma/prismaCustomTypes";
import { climadiag } from "@/src/generated/prisma/client";

export interface Climadiag extends climadiag {
  nuits_chaudes_prevision: ProjectionsIndicateurClimadiag;
  jours_vdc_prevision: ProjectionsIndicateurClimadiag;
  jours_tres_chauds_prevision: ProjectionsIndicateurClimadiag;
}

export type ClimadiagYear = keyof ProjectionsIndicateurClimadiag;

export type ClimadiagTemperatureJour = {
  prevision: ClimadiagTemperatureProjection;
  ref: number | null;
};

export type ClimadiagTypeJour = "jours_chauds" | "nuits_chaudes" | "jours_vdc";

export type ClimadiagTemperatureJourMap = {
  jours_tres_chauds: ClimadiagTemperatureJour;
  nuits_chaudes: ClimadiagTemperatureJour;
  jours_vdc: ClimadiagTemperatureJour;
};

export type Option = {
  value: number;
  label: string;
};

export type GroupedOptions = {
  label: string;
  options: Option[];
};
