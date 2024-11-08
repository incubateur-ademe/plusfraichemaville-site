import { ProjetWithAdminUser, UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { User } from "@prisma/client";
import {
  AssociationSpecAssociationCategoryEnum,
  FilterOperatorEnum,
  SimplePublicObjectBatchInputUpsert,
} from "@hubspot/api-client/lib/codegen/crm/companies";
import { hubspotClient } from ".";
import { ALL_CANAL_ACQUISITION, CUSTOM_CANAL_ACQUISITION } from "@/src/helpers/canalAcquisition";

type HubspotPipelineDealStageKey = keyof typeof pipelineDealStage;

const pipelineDealStage = {
  questionnement: "appointmentscheduled",
  priorisationSolutions: "qualifiedtobuy",
  redactionCDC: "presentationscheduled",
  lancementTravaux: "decisionmakerboughtin",
  evaluationActions: "closedwon",
  projetAbandonne: "closedlost",
};

const formatCanalAcquisition = (canal: string | null) => {
  if (!canal) return "";
  const canalExists = ALL_CANAL_ACQUISITION.some((item) => item.label === canal);
  return canalExists ? canal : CUSTOM_CANAL_ACQUISITION.label;
};

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
      canal_d_acquisition: formatCanalAcquisition(user?.canal_acquisition),
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
      dealstage: pipelineDealStage[projet.niveau_maturite as HubspotPipelineDealStageKey] ?? "",
      niveau_de_maturite: projet.niveau_maturite ?? "",
      createdate: new Date(projet.created_at).getTime().toString(),
      projet_id_unique: projet.id.toString(),
      type_d_espace_pfmv: projet.type_espace ?? "",
      closedate: new Date(projet.date_echeance!).getTime().toString(),
    },
  }));

export const createBidirectionalAssociations = async (associations: { dealId: string; contactId: string }[]) =>
  await hubspotClient.crm.associations.v4.batchApi.create("deal", "contact", {
    inputs: associations.map((association) => ({
      _from: { id: association.dealId },
      to: { id: association.contactId },
      types: [
        {
          associationCategory: AssociationSpecAssociationCategoryEnum.HubspotDefined,
          associationTypeId: 3,
        },
      ],
    })),
  });

export const getHubspotUsersFromAdminProjets = async (usersWithAdminProjets: UserWithAdminProjets[]) => {
  const emails = usersWithAdminProjets.map((user) => user.email);
  const response = await hubspotClient.crm.contacts.searchApi.doSearch({
    filterGroups: [
      {
        filters: [
          {
            propertyName: "email",
            operator: FilterOperatorEnum.In,
            values: emails,
          },
        ],
      },
    ],
  });

  return response.results.map((result) => ({
    email: result.properties.email,
    hubspotId: result.id,
  }));
};
