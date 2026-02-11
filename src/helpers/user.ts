import { UserInfos } from "@/src/stores/user/store";
import { UserPublicInfosDto } from "@/src/types/dto";
import capitalize from "lodash/capitalize";

export const hasAllRequiredFieldsSet = (user: UserInfos) =>
  user && user.nom && user.prenom && user.email && user.poste && user.nomEtablissement;

export const hasDiscardedInformation = (user: UserInfos, informationId: string): boolean =>
  user?.discardedInformation.includes(informationId) ?? false;

export const prettyUserName = (user: UserPublicInfosDto) =>
  [capitalize(user?.prenom || ""), capitalize(user?.nom || "")].join(" ");
