import { UserInfos } from "@/src/stores/user/store";
import { UserPublicInfos, UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { collectivite, User } from "@prisma/client";
import { capitalize } from "lodash";

export const hasAllRequiredFieldsSet = (user: UserInfos) =>
  user && user.nom && user.prenom && user.email && user.collectivites[0]?.collectivite_id && user.poste;

export const getPrimaryCollectiviteForUser = (user: UserWithCollectivite): collectivite =>
  user.collectivites[0].collectivite;

export const hasDiscardedInformation = (user: UserInfos, informationId: string): boolean =>
  user?.discardedInformation.includes(informationId) ?? false;

export const prettyUserName = (user: UserPublicInfos) =>
  [capitalize(user?.prenom || ""), capitalize(user?.nom || "")].join(" ");