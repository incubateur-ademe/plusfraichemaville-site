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

type CsmBatchWebhookData = {
  nbMailRemindModuleDiagnostic: number;
  nbMailsInactiveUser: number;
  nbMailsUnfinishedDiag: number;
  nbMailsRemindSolution: number;
};

export const makeCsmBatchWebhookData = (data: CsmBatchWebhookData) => {
  return {
    text: `**[Fin de traitement d'envoi des mails CSM]**
    
**Nb de mails de rappel pour le module diagnostic : ** ${data.nbMailRemindModuleDiagnostic}

**Nb de mails de rappel pour choisir une solution : ** ${data.nbMailsRemindSolution}

**Nb de mails d'utilisateurs inactifs : ** ${data.nbMailRemindModuleDiagnostic} 

**Nb de mails de diagnostics non finalisés : ** ${data.nbMailsUnfinishedDiag} 
`,
  };
};

export const makeHubspotSyncBatchWebhookData = (message: string) => {
  return {
    text: `**[Fin de traitement de synchronisation Hubspot]**
    
**Détail du traitement :**
${message}
`,
  };
};
export const makeConnectSyncBatchWebhookData = (message: string) => {
  return {
    text: `**[Fin de traitement de synchronisation Connect]**
    
**Détail du traitement :**
${message}
`,
  };
};
export const makeConnectSyncBatchErrorWebhookData = (message: string) => {
  return {
    text: `:alert:**[Batch en erreur]**:alert:
    
${message}
@raphael.taieb 
`,
  };
};

export const makeBatchErrorWebhookData = (message: string) => {
  return {
    text: `:alert:**[Batch en erreur]**:alert:
${message}
@raphael.taieb  
`,
  };
};
