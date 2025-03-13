import { UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { ConnectContact } from "./types";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";

export const mapUserToConnectContact = (user: UserWithAdminProjets): ConnectContact => {
  const agentconnectInfo = user.agentconnect_info as {
    siret: string;
    phone_number: string;
  };

  const collectivite = user.collectivites[0].collectivite;

  return {
    email: user.email,
    source: "PFMV",
    nom: user.nom,
    prenom: user.prenom,
    fonction: user.poste,
    siret: agentconnectInfo.siret,
    dateCreation: dateToStringWithoutTime(user.created_at, "iso"),
    dateModification: dateToStringWithoutTime(user.updated_at, "iso"),
    telephone: agentconnectInfo.phone_number,
    codePostal: collectivite.code_postal,
  };
};
