import { Prisma, collectivite, projet } from "@prisma/client";

export type UserWithCollectivite = Prisma.UserGetPayload<{
  include: { collectivites: { include: { collectivite: true } } };
}>;

export interface ProjetWithNomCollectivite extends projet {
  collectivite: { nom: collectivite["nom"] };
}

export interface ProjetWithCollectivite extends projet {
  collectivite: collectivite;
}

export type AgentConnectInfo = { siret: string };
