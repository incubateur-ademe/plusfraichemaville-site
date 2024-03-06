import { Prisma, collectivite, projet, estimation } from "@prisma/client";

export type UserWithCollectivite = Prisma.UserGetPayload<{
  include: { collectivites: { include: { collectivite: true } } };
}>;

export interface ProjetWithRelations extends projet {
  collectivite: collectivite;
  estimations: estimation[];
}

export type AgentConnectInfo = { siret: string };
