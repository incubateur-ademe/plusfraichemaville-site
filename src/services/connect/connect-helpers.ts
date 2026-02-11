import { ConnectContact, ConnectProjet } from "./types";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";
import { getNiveauMaturiteByCode } from "@/src/helpers/maturite-projet";
import { ProjetWithAdminUserDto, UserDto } from "@/src/types/dto";

const PFMV_SOURCE = "PFMV";
export const mapUserToConnectContact = (user: UserDto, abonnementNewsletter?: boolean): ConnectContact => {
  return {
    email: user.email,
    source: PFMV_SOURCE,
    nom: user.nom,
    prenom: user.prenom,
    fonction: user.poste,
    siret: user.agentconnectInfo?.siret,
    dateCreation: dateToStringWithoutTime(new Date(user.createdAt), "iso"),
    dateModification: user.updatedAt ? dateToStringWithoutTime(new Date(user.updatedAt), "iso") : null,
    ...(abonnementNewsletter ? { abonnementNewsletter } : {}),
  };
};

export const mapProjetToConnectProjet = (projet: ProjetWithAdminUserDto): ConnectProjet => ({
  idProjet: `${projet.id}`,
  typeProjet: PFMV_SOURCE,
  nomProjet: projet.nom,
  etape: getNiveauMaturiteByCode(projet.niveauMaturite)?.crmConnectLabel ?? "",
  dateCloture: projet.dateEcheance
    ? dateToStringWithoutTime(new Date(projet.dateEcheance), "iso") ?? "2100-01-01"
    : "2100-01-01",
  codeCommuneInsee: mapCodeInseeForConnect(projet.collectivite.codeInsee),
  typeEspace: selectEspaceLabelByCode(projet.typeEspace) ?? "",
  projetVisible: projet.isPublic ?? false,
  localisation: projet.adresse || projet.collectivite.nom,
  ...(projet.deletedAt
    ? { projetAnnule: true, dateAnnulation: dateToStringWithoutTime(new Date(projet.deletedAt), "iso") }
    : {}),
});

const mapCodeInseeForConnect = (codeInsee: string | null): string => {
  return (
    EXECPTIONS_CODE_INSEE_CONNECT.find((commune) => commune.codeInseeCommune === codeInsee)?.codeInseeMairie ??
    codeInsee ??
    ""
  );
};

const EXECPTIONS_CODE_INSEE_CONNECT = [
  {
    nomCommune: "Paris",
    codeInseeCommune: "75056",
    codeInseeMairie: "75104",
  },
  {
    nomCommune: "Lyon",
    codeInseeCommune: "69123",
    codeInseeMairie: "69385",
  },
  {
    nomCommune: "Marseille",
    codeInseeCommune: "13055",
    codeInseeMairie: "13202",
  },
];
