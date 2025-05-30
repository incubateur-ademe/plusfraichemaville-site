import { ProjetWithAdminUser, UserWithAdminProjets, UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { ConnectContact, ConnectProjet } from "./types";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { selectEspaceByCode } from "@/src/helpers/type-espace-filter";
import { getNiveauMaturiteByCode } from "@/src/helpers/maturite-projet";

const PFMV_SOURCE = "PFMV";
export const mapUserToConnectContact = (
  user: UserWithCollectivite | UserWithAdminProjets,
  abonnementNewsletter?: boolean,
): ConnectContact => {
  const agentconnectInfo = user.agentconnect_info as {
    siret: string;
    phone_number: string;
  };

  return {
    email: user.email,
    source: PFMV_SOURCE,
    nom: user.nom,
    prenom: user.prenom,
    fonction: user.poste,
    siret: agentconnectInfo.siret,
    dateCreation: dateToStringWithoutTime(user.created_at, "iso"),
    dateModification: dateToStringWithoutTime(user.updated_at, "iso"),
    telephone: agentconnectInfo.phone_number,
    ...(abonnementNewsletter ? { abonnementNewsletter } : {}),
  };
};

export const mapProjetToConnectProjet = (projet: ProjetWithAdminUser): ConnectProjet => ({
  idProjet: `${projet.id}`,
  typeProjet: PFMV_SOURCE,
  nomProjet: projet.nom,
  etape: getNiveauMaturiteByCode(projet.niveau_maturite)?.crmConnectLabel ?? "",
  dateCloture: dateToStringWithoutTime(projet.date_echeance, "iso") ?? "2100-01-01",
  codeCommuneInsee: projet.collectivite.code_insee ?? "",
  typeEspace: selectEspaceByCode(projet.type_espace) ?? "",
  projetVisible: projet.is_public ?? false,
  localisation: projet.adresse || projet.collectivite.nom,
});
