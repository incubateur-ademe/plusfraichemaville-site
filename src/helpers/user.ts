import { UserInfos } from "@/src/stores/user/store";
import { UserPublicInfos, UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { collectivite } from "@/src/generated/prisma/client";
import capitalize from "lodash/capitalize";

export const hasAllRequiredFieldsSet = (user: UserInfos) =>
  user && user.nom && user.prenom && user.email && user.poste;

export const getPrimaryCollectiviteForUser = (user: UserWithCollectivite): collectivite =>
  user.collectivites[0].collectivite;

export const hasDiscardedInformation = (user: UserInfos, informationId: string): boolean =>
  user?.discardedInformation.includes(informationId) ?? false;

export const prettyUserName = (user: UserPublicInfos) =>
  [capitalize(user?.prenom || ""), capitalize(user?.nom || "")].join(" ");
