import { UserInfos } from "@/stores/user/store";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { collectivite } from "@prisma/client";

export const hasAllRequiredFieldsSet = (user: UserInfos) =>
  user && user.nom && user.prenom && user.email && user.collectivites[0]?.collectivite_id && user.poste;

export const getPrimaryCollectiviteForUser = (user: UserWithCollectivite): collectivite =>
  user.collectivites[0].collectivite;

export const hasDiscardedInformation = (user: UserInfos, informationId: string): boolean =>
  user?.discardedInformation.includes(informationId) ?? false;
