import { collectivite, Prisma, projet, RoleProjet, User } from "@prisma/client";

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

export type UserWithAdminProjets = Prisma.UserGetPayload<{
  include: {
    projets: {
      where: { role: "ADMIN" };
      include: { projet: true };
    };
  };
}>;

export type UserProjetWithPublicUser = Prisma.user_projetGetPayload<{
  select: {
    id;
    user: { select: { id: true; nom: true; prenom: true; email: true; agentconnect_info: true; poste: true } };
    created_at: true;
    role: true;
    invitation_status: true;
    user_id: true;
    nb_views: true;
  };
}>;

export type UserPublicInfos = Prisma.UserGetPayload<{
  select: { id: true; nom: true; prenom: true; email: true; agentconnect_info: true; poste: true };
}>;

export type UserProjetWithRelations = Prisma.user_projetGetPayload<{
  include: {
    projet: { include: { collectivite: true } };
    user: { include: { collectivites: { include: { collectivite } } } };
  };
}>;

export type ProjetSourcingContact = Prisma.projet_sourcing_contactGetPayload<{
  include: { sourced_user_projet: { include: { user: true } } };
}>;

export type EstimationAide = EstimationWithAides["estimations_aides"][number];

export interface ProjetWithRelations extends projet {
  collectivite: collectivite;
  estimations: EstimationWithAides[];
  creator: User;
  users: UserProjetWithUser[];
  sourcing_user_projets: ProjetSourcingContact[];
}

export interface ProjetWithPublicRelations
  extends Pick<projet, "id" | "nom" | "collectiviteId" | "type_espace" | "niveau_maturite" | "adresse_info"> {
  collectivite: collectivite;
  users: UserProjetWithPublicUser[];
}

type ProjectUserAndAdmin = {
  user: {
    email: string;
  } | null;
  role: RoleProjet;
};

export type ProjetWithAdminUser = projet & {
  users: ProjectUserAndAdmin[];
};

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
