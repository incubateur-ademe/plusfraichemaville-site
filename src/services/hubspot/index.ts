import { Client } from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import { makeBatchUpsertContactProperties, makeBatchUpsertProjectsByContactProperties } from "./hubspot-helpers";
import { User } from "@prisma/client";
import { ProjetWithAdminUser } from "@/src/lib/prisma/prismaCustomTypes";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/deals";
import { AssociationSpecAssociationCategoryEnum } from "@hubspot/api-client/lib/codegen/crm/associations/v4";

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
  const batch = await hubspotClient.crm.contacts.batchApi.upsert({
    inputs: properties,
  });
  return batch;
};

export const batchUpdateHubspotProjectsByUser = async (projets: ProjetWithAdminUser[]) => {
  // Contact: Si un contact est nouveau ou updaté, le mettre à jour.
  // Projet: Récupérer l'adresse mail de l'admin, trouver l'id puis l'associé au projet.
  // Puis updater le projet.
  const properties = makeBatchUpsertProjectsByContactProperties(projets);
  const batch = await hubspotClient.crm.deals.batchApi.upsert({
    inputs: properties,
  });
  return batch;
};

async function createBidirectionalAssociation(dealId: string, contactId: string) {
  const result = await hubspotClient.crm.associations.v4.batchApi.create("deal", "contact", {
    inputs: [
      {
        _from: { id: dealId },
        to: { id: contactId },
        types: [
          {
            associationCategory: AssociationSpecAssociationCategoryEnum.HubspotDefined,
            associationTypeId: 3, // ou 4
          },
        ],
      },
    ],
  });
}

const a = async () =>
  await hubspotClient.crm.associations.batchApi.create("contact", "deal", {
    inputs: [
      {
        _from: {
          id: "44244218043",
        },
        to: {
          id: "21866073589",
        },
        type: "4",
      },
    ],
  });

const b = async () =>
  await hubspotClient.crm.associations.batchApi.create("deal", "contact", {
    inputs: [
      {
        _from: {
          id: "21866073589",
        },
        to: {
          id: "44244218043",
        },
        type: "3",
      },
    ],
  });

const findHubspotContact = async (emails: string[]) => {
  const { results } = await hubspotClient.crm.contacts.searchApi.doSearch({
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

  const foundHubspotContacts = new Map(results.map((contact) => [contact.properties.email, contact.id]));
};
