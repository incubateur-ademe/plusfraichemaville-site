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
  nbMailsInactiveUser1: number;
  nbMailsInactiveUser2: number;
  nbMailsGetRexFromFinishedProjet: number;
  nbMailsSendQuestionnaireForFinishedProjet: number;
  nbMailsUnfinishedDiag: number;
  nbMailsRemindSolution: number;
  nbMailsRemindEstimation: number;
  nbMailsRemindFinancement: number;
  nbMailsInactiveProjet1: number;
  nbMailsInactiveProjet2: number;
};

export const makeCsmBatchWebhookData = (data: CsmBatchWebhookData) => {
  return {
    text: `**[Fin de traitement d'envoi des mails CSM]**
    
**Nb de mails de rappel pour le module diagnostic : ** ${data.nbMailRemindModuleDiagnostic}

**Nb de mails de rappel pour choisir une solution : ** ${data.nbMailsRemindSolution}

**Nb de mails de rappel pour faire une estimation : ** ${data.nbMailsRemindEstimation}

**Nb de mails de rappel pour trouver une aide : ** ${data.nbMailsRemindFinancement}

**Nb de mails de projets inactifs depuis 14 jours : ** ${data.nbMailsInactiveProjet1}

**Nb de mails de projets inactifs depuis 2 mois: ** ${data.nbMailsInactiveProjet2}

**Nb de mails d'utilisateurs sans projet à J+2 : ** ${data.nbMailsInactiveUser1} 

**Nb de mails d'utilisateurs sans projet à J+14 : ** ${data.nbMailsInactiveUser2} 

**Nb de mails de projet terminés pour aller chercher des REX : ** ${data.nbMailsGetRexFromFinishedProjet} 

**Nb de mails de projet terminés pour envoyer le questionnaire : ** ${data.nbMailsSendQuestionnaireForFinishedProjet} 

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
