import { Client } from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";

export const createHubspotTicket = async (data: ContactFormData) => {
  const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
  const properties = {
    subject: data.objetMessage,
    content: data.message,
    hs_pipeline_stage: "1",
  };
  const SimplePublicObjectInputForCreate = {
    associations: [
      {
        to: { id: "1807936765" },
      },
    ],
    properties,
  };

  await hubspotClient.crm.tickets.basicApi.create(SimplePublicObjectInputForCreate);
};
