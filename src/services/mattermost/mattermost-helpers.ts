/* eslint-disable max-len */
import { SimplePublicObject } from "@hubspot/api-client/lib/codegen/crm/companies";

export const makeHubspotMattermostWebhookData = (ticket: SimplePublicObject) => {
  const hubspotUrl = process.env.HUBSPOT_APP_BASE_URL ?? "";
  const hubspotAccountId = process.env.HUBSPOT_ACCOUNT_ID ?? "";
  const ticketUrl = `${hubspotUrl}/contacts/${hubspotAccountId}/record/0-5/${ticket.id}`;

  return {
    text: `**[Nouveau ticket]** - [voir sur Hubspot](${ticketUrl})
    
**Contact :**
${ticket.properties.prenom_de_l_utilisateur} ${ticket.properties.nom_de_l_utilisateur} - ${
      ticket.properties.email_de_l_utilisateur
    } ${ticket.properties.telephone_de_l_utilisateur ? `- ${ticket.properties.telephone_de_l_utilisateur}` : ""}

**Objet :** 
${ticket.properties.subject}

**Message :** 
${ticket.properties.content}`,
  };
};
