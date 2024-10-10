import { ProjetWithAdminUser, ProjetWithRelations, UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import { User } from "@prisma/client";
import { SimplePublicObjectBatchInputUpsert } from "@hubspot/api-client/lib/codegen/crm/companies";
import { getHubspotPipelineDealStageCode, HubspotPipelineDealStageKey } from "@/src/helpers/maturite-projet";

export const makeBatchUpsertContactProperties = (users: User[]): SimplePublicObjectBatchInputUpsert[] =>
  users.map((user) => ({
    idProperty: "email",
    email: user.email,
    id: user.email,
    email_unique: user.email,
    properties: {
      email_unique: user.email,
      email: user.email,
      firstname: user.prenom ?? "",
      lastname: user.nom ?? "",
      jobtitle: user.poste ?? "",
      lifecyclestage: "opportunity",
      canal_d_acquisition: user.canal_acquisition ?? "",
      date_d_inscription_pfmv: new Date(user.created_at).setUTCHours(0, 0, 0, 0).toString(),
    },
  }));

export const makeBatchUpsertProjectsByContactProperties = (
  projets: ProjetWithAdminUser[],
): SimplePublicObjectBatchInputUpsert[] =>
  projets.map((projet) => ({
    idProperty: "projet_id_unique",
    id: projet.id.toString(),
    projet_id_unique: projet.id.toString(),
    properties: {
      dealname: projet.nom,
      dealstage: getHubspotPipelineDealStageCode(projet.niveau_maturite as HubspotPipelineDealStageKey) ?? "",
      niveau_de_maturite: projet.niveau_maturite ?? "",
      createdate: new Date(projet.created_at).getTime().toString(),
      projet_id_unique: projet.id.toString(),
      type_d_espace_pfmv: projet.type_espace ?? "",
      closedate: new Date(projet.date_echeance!)?.setUTCHours(0, 0, 0, 0).toString(),
    },
  }));
