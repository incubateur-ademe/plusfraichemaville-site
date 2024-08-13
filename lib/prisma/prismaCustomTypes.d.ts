import { collectivite, Prisma, projet, User } from "@prisma/client";

export type UserWithCollectivite = Prisma.UserGetPayload<{
  include: { collectivites: { include: { collectivite: true } } };
}>;

export type UserWithProjets = Prisma.UserGetPayload<{
  include: { projets: { include: { projet: true } } };
}>;

export type EstimationWithAides = Prisma.estimationGetPayload<{
  include: {
    estimations_aides: {
      include: {
        aide: true;
      };
    };
  };
}>;

export type UserProjetWithUser = Prisma.user_projetGetPayload<{
  include: { user: true };
}>;

export type UserProjetWithRelations = Prisma.user_projetGetPayload<{
  include: {
    projet: { include: { collectivite: true } };
    user: { include: { collectivites: { include: { collectivite } } } };
  };
}>;

export type EstimationAide = EstimationWithAides["estimations_aides"][number];

export interface ProjetWithRelations extends projet {
  collectivite: collectivite;
  estimations: EstimationWithAides[];
  creator: User;
  users: UserProjetWithUser[];
}

export interface ProjetWithPublicRelations extends projet {
  collectivite: collectivite;
  users: UserProjetWithUser[];
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
