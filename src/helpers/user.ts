import { UserInfos } from "@/src/stores/user/store";
import { UserPublicInfos } from "@/src/lib/prisma/prismaCustomTypes";
import capitalize from "lodash/capitalize";

export const hasAllRequiredFieldsSet = (user: UserInfos) => user && user.nom && user.prenom && user.email && user.poste;

export const hasDiscardedInformation = (user: UserInfos, informationId: string): boolean =>
  user?.discardedInformation.includes(informationId) ?? false;

export const prettyUserName = (user: UserPublicInfos) =>
  [capitalize(user?.prenom || ""), capitalize(user?.nom || "")].join(" ");
