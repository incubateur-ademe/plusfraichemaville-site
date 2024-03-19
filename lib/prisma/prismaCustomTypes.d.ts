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
  estimationMateriaux: { materiauId: string; quantite: number }[];
  coutMinInvestissement: number;
  coutMaxInvestissement: number;
  coutMinEntretien: number;
  coutMaxEntretien: number;
};

export type AgentConnectInfo = { siret: string };
