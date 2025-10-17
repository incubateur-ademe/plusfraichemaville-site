type CsmBatchWebhookData = {
  nbMailCreationProjet: number;
  nbMailsInactiveUser: number;
  nbMailsUnfinishedDiag: number;
};

export const makeCsmBatchWebhookData = (data: CsmBatchWebhookData) => {
  return {
    text: `**[Fin de traitement d'envoi des mails CSM]**
    
**Nb de mails de création de projets : ** ${data.nbMailCreationProjet}

**Nb de mails d'utilisateurs inactifs : ** ${data.nbMailCreationProjet} 

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
