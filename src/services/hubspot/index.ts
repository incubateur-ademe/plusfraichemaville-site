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

export const hubspotBatchSync = async (usersWithAdminProjets: UserWithAdminProjets[]) => {
  const contactProperties = makeBatchUpsertContactProperties(usersWithAdminProjets);

  const contactBatch = await hubspotClient.crm.contacts.batchApi.upsert({
    inputs: contactProperties,
  });

  const projets = getProjetsWithAdminUser(usersWithAdminProjets);
  const projectProperties = makeBatchUpsertProjectsByContactProperties(projets);
  const projectBatch = await hubspotClient.crm.deals.batchApi.upsert({
    inputs: projectProperties,
  });

  const contactIds = await getHubspotUsersFromAdminProjets(usersWithAdminProjets);

  const associations = usersWithAdminProjets
    .flatMap((user) =>
      user.projets.map((userProjet) => {
        const contactResult = contactIds.find((contact) => contact.email === user.email)?.hubspotId;
        const dealResult = projectBatch.results.find(
          (result) => result.properties.projet_id_unique === userProjet.projet.id.toString(),
        );
        return {
          contactId: contactResult ?? "",
          dealId: dealResult?.id ?? "",
        };
      }),
    )
    .filter((assocaition) => assocaition.contactId && assocaition.dealId);

  const associationsBatch = await createBidirectionalAssociations(associations);

  return {
    contactBatch,
    projectBatch,
    associationsBatch,
  };
};
