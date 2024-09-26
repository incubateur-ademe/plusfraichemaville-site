import { Client } from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/contacts";
import { AssociationSpecAssociationCategoryEnum } from "@hubspot/api-client/lib/codegen/crm/objects";

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

const searchHubspotContactByEmail = async (email: string): Promise<string | null> => {
  const PublicObjectSearchRequest = {
    filterGroups: [{ filters: [{ propertyName: "email", operator: FilterOperatorEnum.Eq, value: email }] }],
  };
  try {
    const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
    if (apiResponse.total > 0) {
      return apiResponse.results[0].id;
    }
    return null;
  } catch (e) {
    customCaptureException("Error in searchHubspotContactByEmail", e);
    return null;
  }
};

const createHubspotContactByEmail = async (data: ContactFormData): Promise<string | null> => {
  try {
    const SimplePublicObjectInputForCreate = {
      properties: { email: data.email, phone: data.telephone, lastname: data.nom, firstname: data.prenom },
    };
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInputForCreate);
    return apiResponse.id;
  } catch (e) {
    customCaptureException("Error in createHubspotContactByEmail", e);
    return null;
  }
};

const updateHubspotContact = async (hubspotId: string, data: ContactFormData): Promise<string | null> => {
  try {

    const SimplePublicObjectInputForCreate = {
      properties: { email: data.email, phone: data.telephone, lastname: data.nom, firstname: data.prenom },
    };
    const apiResponse = await hubspotClient.crm.contacts.basicApi.update(hubspotId, SimplePublicObjectInputForCreate);
    return apiResponse.id;
  } catch (e) {
    customCaptureException("Error in createHubspotContactByEmail", e);
    return null;
  }
};

export const createHubspotTicket = async (data: ContactFormData) => {
  const associations = [];

  let existingUserId = await searchHubspotContactByEmail(data.email);
  if (!existingUserId) {
    existingUserId = await createHubspotContactByEmail(data);
  }
  let message = data.message;
  if (existingUserId) {
    await updateHubspotContact(existingUserId, data);
    associations.push({
      to: { id: existingUserId },
      types: [{ associationCategory: AssociationSpecAssociationCategoryEnum.HubspotDefined, associationTypeId: 16 }],
    });
  } else {
    message = `Nom : ${data.nom} \nPrénom : ${data.prenom} \nEmail : ${data.email} \n
    Téléphone : ${data.telephone}\nMessage : ${data.message}`;
  }
  const properties = { subject: data.objetMessage, content: message, hs_pipeline_stage: "1" };

  const SimplePublicObjectInputForCreate = {
    associations,
    properties,
  };
  await hubspotClient.crm.tickets.basicApi.create(SimplePublicObjectInputForCreate);
};
