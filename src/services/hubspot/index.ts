import { Client } from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import { makeBatchUpsertContactProperties, makeBatchUpsertProjectsByContactProperties } from "./hubspot-helpers";
import { ProjetWithAdminUser, UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
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

// export const batchUpdateHubspotContacts = async (users: User[]) => {
//   const properties = makeBatchUpsertContactProperties(users);
//   const batch = await hubspotClient.crm.contacts.batchApi.upsert({
//     inputs: properties,
//   });
//   return batch;
// };

// export const batchUpdateHubspotProjectsByUser = async (projets: ProjetWithAdminUser[]) => {
//   const properties = makeBatchUpsertProjectsByContactProperties(projets);
//   const batch = await hubspotClient.crm.deals.batchApi.upsert({
//     inputs: properties,
//   });

//   return batch;
// };

const searchHubspotUserByEmail = async (email: string) =>
  await hubspotClient.crm.contacts.searchApi.doSearch({
    filterGroups: [
      {
        filters: [
          {
            propertyName: "email",
            operator: FilterOperatorEnum.Eq,
            value: email,
          },
        ],
      },
    ],
  });

const getProjetsWithAdminUser = (usersWithProjects: UserWithAdminProjets[]): ProjetWithAdminUser[] => {
  return usersWithProjects
    .map((user) =>
      user.projets.map((userProjet) => ({
        ...userProjet.projet,
        users: [{ user: { email: user.email }, role: userProjet.role }],
      })),
    )
    .flat();
};

export const batchUpdate = async (usersWithAdminProjets: UserWithAdminProjets[]) => {
  const contactProperties = makeBatchUpsertContactProperties(usersWithAdminProjets);
  const contactBatch = await hubspotClient.crm.contacts.batchApi.upsert({
    inputs: contactProperties,
  });

  const projets = getProjetsWithAdminUser(usersWithAdminProjets);
  const projectProperties = makeBatchUpsertProjectsByContactProperties(projets);
  const projectBatch = await hubspotClient.crm.deals.batchApi.upsert({
    inputs: projectProperties,
  });

  const contactIds = await Promise.all(
    usersWithAdminProjets.map(async (user) => {
      const hubspotUser = await searchHubspotUserByEmail(user.email);
      return { email: user.email, hubspotId: hubspotUser.results[0]?.id };
    }),
  );

  const associations = usersWithAdminProjets
    .map((user) =>
      user.projets.map((userProjet) => {
        const contactResult = contactIds.find((contact) => contact.email === user.email)?.hubspotId;
        const dealResult = projectBatch.results.find(
          (result) => result.properties.projet_id_unique === userProjet.projet.id.toString(),
        );
        return {
          contactId: contactResult,
          dealId: dealResult?.id,
        };
      }),
    )
    .flat()
    .filter((assocaition) => assocaition.contactId && assocaition.dealId);

  const contactToDealAssociations = associations.map((associaition) => ({
    _from: { id: associaition.contactId ?? "" },
    to: { id: associaition.dealId ?? "" },
    type: "4",
  }));

  const dealToContactAssociations = associations.map((association) => ({
    _from: { id: association.dealId ?? "" },
    to: { id: association.contactId ?? "" },
    type: "3",
  }));

  const contactToDealBatch = await hubspotClient.crm.associations.batchApi.create("contact", "deal", {
    inputs: contactToDealAssociations,
  });

  const dealToContactBatch = await hubspotClient.crm.associations.batchApi.create("deal", "contact", {
    inputs: dealToContactAssociations,
  });

  return {
    contactBatch,
    projectBatch,
    contactToDealBatch,
    dealToContactBatch,
  };
};

const createBidirectionalAssociation = async (dealId: string, contactId: string) => {
  const result = await hubspotClient.crm.associations.v4.batchApi.create("deal", "contact", {
    inputs: [
      {
        _from: { id: dealId },
        to: { id: contactId },
        types: [
          {
            associationCategory: AssociationSpecAssociationCategoryEnum.HubspotDefined,
            associationTypeId: 3, // ou 4, il faut check sur la map de HS
          },
        ],
      },
    ],
  });
};
