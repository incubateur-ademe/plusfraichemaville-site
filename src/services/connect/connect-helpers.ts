import { UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { ConnectContact } from "./types";

export const mapUserToConnectContact = (user: UserWithAdminProjets): ConnectContact => {
  return {
    email: user.email,
    source: "PFMV",
    nom: user.nom,
    prenom: user.prenom,
    fonction: user.poste,
    dateCreation: user.created_at,
    dateModification: user.updated_at,
    acceptationRGPD: true,
    actif: true,
  };
};
