import { collectivite, estimation, Prisma, projet, User } from "@prisma/client";

export type UserWithCollectivite = Prisma.UserGetPayload<{
  include: { collectivites: { include: { collectivite: true } } };
}>;

export interface ProjetWithRelations extends projet {
  collectivite: collectivite;
  estimations: estimation[];
  creator: User;
}

export type EstimationMateriauxFicheSolution = {
  ficheSolutionId: number;
  estimationMateriaux?: { materiauId: string; quantite: number }[];
  coutMinInvestissement: number;
  coutMaxInvestissement: number;
  coutMinEntretien: number;
  coutMaxEntretien: number;
  quantite?: number;
};

export type AgentConnectInfo = { siret: string };

type ClimadiagTemperatureProjection = {
  min: number;
  max: number;
  median: number;
};
export type ProjectionsIndicateurClimadiag = {
  2030: ClimadiagTemperatureProjection;
  2050: ClimadiagTemperatureProjection;
  2100: ClimadiagTemperatureProjection;
};
