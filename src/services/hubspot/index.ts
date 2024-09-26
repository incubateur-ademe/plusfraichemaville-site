import * as hubspot from "@hubspot/api-client";
import { ContactFormData } from "@/src/forms/contact/contact-form-schema";

const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

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
