import { Client } from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import {
  createBidirectionalAssociations,
  makeBatchUpsertContactProperties,
  makeBatchUpsertProjectsByContactProperties,
} from "./hubspot-helpers";
import { ProjetWithAdminUser, UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/deals";
import { getProjetsWithAdminUser } from "@/src/components/liste-projets/helpers";

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
