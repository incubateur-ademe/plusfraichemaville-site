import { Client } from "@hubspot/api-client";
import {
  createBidirectionalAssociations,
  getHubspotContactIds,
  makeBatchUpsertContactProperties,
  makeBatchUpsertProjectsByContactProperties,
} from "./hubspot-helpers";
import { flattenUsersProjectsToProjects } from "@/src/components/liste-projets/helpers";
import chunk from "lodash/chunk";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { BatchResponseSimplePublicUpsertObjectWithErrors as ContactBatchWithErrors } from "@hubspot/api-client/lib/codegen/crm/contacts";
import { BatchResponseSimplePublicUpsertObjectWithErrors as DealBatchWithErrors } from "@hubspot/api-client/lib/codegen/crm/deals";
import { BatchResponseLabelsBetweenObjectPairWithErrors } from "@hubspot/api-client/lib/codegen/crm/associations/v4/models/BatchResponseLabelsBetweenObjectPairWithErrors";
import { UserWithAdminProjetsDto } from "@/src/types/dto";

export const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

const HUBSPOT_BATCH_LIMIT = 99;

export const hubspotBatchSync = async (
  usersWithAdminProjets: UserWithAdminProjetsDto[],
): Promise<{
  status: "COMPLETE" | "ERROR";
  message: string;
}> => {
  const userBatches = chunk(usersWithAdminProjets, HUBSPOT_BATCH_LIMIT);
  const allContactResults = [];
  const allProjectResults = [];
  const allAssociationResults = [];

  for (const batchUsers of userBatches) {
    // Contacts
    const contactProperties = makeBatchUpsertContactProperties(batchUsers);
    const contactBatch = await hubspotClient.crm.contacts.batchApi.upsert({
      inputs: contactProperties,
    });
    allContactResults.push(contactBatch);

    // Projets
    const allProjets = flattenUsersProjectsToProjects(batchUsers);
    const projetBatches = chunk(allProjets, HUBSPOT_BATCH_LIMIT);

    for (const projetBatch of projetBatches) {
      const projectProperties = makeBatchUpsertProjectsByContactProperties(projetBatch);
      const projectBatch = await hubspotClient.crm.deals.batchApi.upsert({
        inputs: projectProperties,
      });
      allProjectResults.push(projectBatch);

      // Associations
      const contactIds = await getHubspotContactIds(contactBatch);
      const associations = batchUsers.flatMap((user) => {
        const contactId = contactIds.find((contact) => contact.email === user.email)?.hubspotId ?? "";
        return user.projets
          .filter((projet) => projetBatch.some((p) => p.id === projet.id))
          .map((projet) => ({
            contactId,
            dealId:
              projectBatch.results.find((result) => result.properties.projet_id_unique === projet.id.toString())?.id ??
              "",
          }))
          .filter((association) => association.contactId && association.dealId);
      });

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

  const totalContacts = allContactResults.reduce((acc, batch) => acc + (batch.results?.length ?? 0), 0);
  const totalProjects = allProjectResults.reduce((acc, batch) => acc + (batch.results?.length ?? 0), 0);
  const totalAssociations = allAssociationResults.reduce((acc, batch) => acc + (batch.results?.length ?? 0), 0);

  const message = `Contact(s): ${totalContacts} | Projet(s): ${totalProjects} | Association(s): ${totalAssociations}`;

  return {
    status: isSuccess ? "COMPLETE" : "ERROR",
    message,
  };
};
