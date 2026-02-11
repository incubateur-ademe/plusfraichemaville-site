import {
  AssociationSpecAssociationCategoryEnum,
  BatchResponseSimplePublicUpsertObject,
  BatchResponseSimplePublicUpsertObjectWithErrors,
  SimplePublicObjectBatchInputUpsert,
} from "@hubspot/api-client/lib/codegen/crm/companies";
import { hubspotClient } from ".";
import { ALL_CANAL_ACQUISITION, CUSTOM_CANAL_ACQUISITION } from "@/src/helpers/canalAcquisition";
import chunk from "lodash/chunk";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/deals";
import { ProjetWithAdminUserDto, UserDto } from "@/src/types/dto";

type HubspotPipelineDealStageKey = keyof typeof pipelineDealStage;
const HUBSPOT_CONTACT_BATCH_LIMIT = 50;

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
  const canalExists = ALL_CANAL_ACQUISITION.find((item) => item.label === canal);
  return canalExists ? canalExists.hubspotLabel || canalExists.label : CUSTOM_CANAL_ACQUISITION.label;
};

export const makeBatchUpsertContactProperties = (users: UserDto[]): SimplePublicObjectBatchInputUpsert[] =>
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
      canal_d_acquisition: formatCanalAcquisition(user?.canalAcquisition),
      date_d_inscription_pfmv: new Date(user.createdAt).setUTCHours(0, 0, 0, 0).toString(),
    },
  }));

export const makeBatchUpsertProjectsByContactProperties = (
  projets: ProjetWithAdminUserDto[],
): SimplePublicObjectBatchInputUpsert[] =>
  projets.map((projet) => ({
    idProperty: "projet_id_unique",
    id: projet.id.toString(),
    projet_id_unique: projet.id.toString(),
    properties: {
      dealname: projet.nom,
      dealstage: pipelineDealStage[projet.niveauMaturite as HubspotPipelineDealStageKey] ?? "",
      niveau_de_maturite: projet.niveauMaturite ?? "",
      createdate: new Date(projet.createdAt).getTime().toString(),
      projet_id_unique: projet.id.toString(),
      type_d_espace_pfmv: projet.typeEspace ?? "",
      closedate: new Date(projet.dateEcheance!).getTime().toString(),
      amount: projet.budget?.toString() ?? "",
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

export const archiveHubspotDeals = async (projectIds: number[]) => {
  const searchResponse = await hubspotClient.crm.deals.searchApi.doSearch({
    filterGroups: [
      {
        filters: [
          {
            propertyName: "projet_id_unique",
            operator: FilterOperatorEnum.In,
            values: projectIds.map((id) => id.toString()),
          },
        ],
      },
    ],
  });

  const dealIds = searchResponse.results.map((deal) => deal.id);

  if (dealIds.length > 0) {
    const dealIdsSimplePublicObject = dealIds.map((id) => ({ id }));
    await hubspotClient.crm.deals.batchApi.archive({ inputs: dealIdsSimplePublicObject });
  }

  return dealIds.length;
};

export const getHubspotContactIds = async (
  contactBatch: BatchResponseSimplePublicUpsertObjectWithErrors | BatchResponseSimplePublicUpsertObject,
) => {
  const contactResults = [];
  const contactBatches = chunk(contactBatch.results, HUBSPOT_CONTACT_BATCH_LIMIT);

  for (const batch of contactBatches) {
    const batchDetails = await hubspotClient.crm.contacts.batchApi.read({
      inputs: batch.map((result) => ({ id: result.id })),
      properties: ["email"],
      propertiesWithHistory: ["email"],
    });
    contactResults.push(...batchDetails.results);
  }

  const contactIds = contactResults.map((contact) => ({
    email: contact.properties.email as string,
    hubspotId: contact.id,
  }));

  return contactIds;
};
