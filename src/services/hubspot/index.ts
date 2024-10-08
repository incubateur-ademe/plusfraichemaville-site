import { Client } from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import { hubspotsObjectsType, makeBatchUpsertContactProperties } from "./hubspot-helpers";
import { User } from "@prisma/client";

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

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

export const batchUpdateHubspotContacts = async (users: User[]) => {
  const properties = makeBatchUpsertContactProperties(users);
  return await hubspotClient.crm.contacts.batchApi.upsert({
    inputs: properties,
  });
};

export const batchUpdateHubspotProjectsByUser = async () => {
  const properties = {
    id: "",
    properties: {},
  };
  return await hubspotClient.crm.objects.batchApi.upsert(hubspotsObjectsType.TRANSACTIONS, {
    inputs: [properties],
  });
};
