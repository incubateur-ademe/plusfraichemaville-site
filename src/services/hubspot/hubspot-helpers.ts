import { ProjetWithRelations, UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import { projet, User } from "@prisma/client";
import { SimplePublicObjectBatchInputUpsert } from "@hubspot/api-client/lib/codegen/crm/companies";

export const hubspotsObjectsType = {
  TRANSACTIONS: "transactions",
};

export const makeBatchUpsertContactProperties = (users: User[]): SimplePublicObjectBatchInputUpsert[] =>
  users.map((user) => ({
    idProperty: "email",
    email: user.email,
    id: user.email,
    properties: {
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
  projets: ProjetWithRelations[],
): SimplePublicObjectBatchInputUpsert[] =>
  projets.map((projet) => ({
    idProperty: "email",
    email: "user.user?.email",
    id: projet.users[0].user?.nom ?? "", //
    properties: {
      dealname: projet.nom,
      dealstage: projet.niveau_maturite ?? "",
      createdate: projet.created_at.toDateString(),
      type_d_espace: projet.type_espace ?? "",
      closedate: projet.date_echeance?.toDateString() ?? "",
    },
  }));
