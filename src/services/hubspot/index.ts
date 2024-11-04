import { Client } from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import {
  createBidirectionalAssociations,
  getHubspotUsersFromAdminProjets,
  makeBatchUpsertContactProperties,
  makeBatchUpsertProjectsByContactProperties,
} from "./hubspot-helpers";
import { getProjetsWithAdminUser } from "@/src/components/liste-projets/helpers";
import { UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
import chunk from "lodash/chunk";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
// eslint-disable-next-line max-len
import { BatchResponseSimplePublicUpsertObjectWithErrors as ContactBatchWithErrors } from "@hubspot/api-client/lib/codegen/crm/contacts";
// eslint-disable-next-line max-len
import { BatchResponseSimplePublicUpsertObjectWithErrors as DealBatchWithErrors } from "@hubspot/api-client/lib/codegen/crm/deals";
// eslint-disable-next-line max-len
import { BatchResponseLabelsBetweenObjectPairWithErrors } from "@hubspot/api-client/lib/codegen/crm/associations/v4/models/BatchResponseLabelsBetweenObjectPairWithErrors";

export const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

export const createHubspotTicket = async (data: ContactFormData) => {
  const properties = {
    subject: data.objetMessage,
    content: data.message,
    hs_pipeline_stage: "1",
    nom_de_l_utilisateur: data.nom,
    prenom_de_l_utilisateur: data.prenom,
    email_de_l_utilisateur: data.email,
    telephone_de_l_utilisateur: data.telephone,
  };

  const SimplePublicObjectInputForCreate = {
    properties,
  };
  await hubspotClient.crm.tickets.basicApi.create(SimplePublicObjectInputForCreate);
};
const HUBSPOT_BATCH_LIMIT = 99;

export const hubspotBatchSync = async (
  usersWithAdminProjets: UserWithAdminProjets[],
): Promise<{
  status: "COMPLETE" | "ERROR";
}> => {
  const userBatches = chunk(usersWithAdminProjets, HUBSPOT_BATCH_LIMIT);
  let allContactResults = [];
  let allProjectResults = [];
  let allAssociationResults = [];

  for (const batchUsers of userBatches) {
    // contacts
    const contactProperties = makeBatchUpsertContactProperties(batchUsers);
    const contactBatch = await hubspotClient.crm.contacts.batchApi.upsert({
      inputs: contactProperties,
    });
    allContactResults.push(contactBatch);
    const contactIds = await getHubspotUsersFromAdminProjets(batchUsers);

    // projets
    const allProjets = getProjetsWithAdminUser(batchUsers);
    const projetBatches = chunk(allProjets, HUBSPOT_BATCH_LIMIT);

    for (const projetBatch of projetBatches) {
      const projectProperties = makeBatchUpsertProjectsByContactProperties(projetBatch);
      const projectBatch = await hubspotClient.crm.deals.batchApi.upsert({
        inputs: projectProperties,
      });
      allProjectResults.push(projectBatch);

      // associations
      const associations = batchUsers
        .flatMap((user) =>
          user.projets
            .filter((userProjet) => projetBatch.some((p) => p.id === userProjet.projet.id))
            .map((userProjet) => ({
              contactId: contactIds.find((contact) => contact.email === user.email)?.hubspotId ?? "",
              dealId:
                projectBatch.results.find(
                  (result) => result.properties.projet_id_unique === userProjet.projet.id.toString(),
                )?.id ?? "",
            })),
        )
        .filter((association) => association.contactId && association.dealId);

      const associationBatch = await createBidirectionalAssociations(associations);
      allAssociationResults.push(associationBatch);
    }
  }

  const isSuccess =
    allContactResults.every((batch) => batch.status === "COMPLETE") &&
    allProjectResults.every((batch) => batch.status === "COMPLETE") &&
    allAssociationResults.every((batch) => batch.status === "COMPLETE");

  if (!isSuccess) {
    allContactResults.map(
      (batch) =>
        batch instanceof ContactBatchWithErrors &&
        captureError("Batch Hubspot sur les contacts en erreur", batch.errors),
    );
    allProjectResults.map(
      (batch) =>
        batch instanceof DealBatchWithErrors && captureError("Batch Hubspot sur les projets en erreur", batch.errors),
    );
    allAssociationResults.map(
      (batch) =>
        batch instanceof BatchResponseLabelsBetweenObjectPairWithErrors &&
        captureError("Batch Hubspot sur les associations contacts / projets en erreur", batch.errors),
    );
  }

  return {
    status: isSuccess ? "COMPLETE" : "ERROR",
  };
};
