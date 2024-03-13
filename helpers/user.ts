import { UserInfos } from "@/stores/user/store";

export const hasAllRequiredFieldsSet = (user: UserInfos) =>
  user && user.nom && user.prenom && user.email && user.collectivites[0]?.collectivite_id && user.poste;
