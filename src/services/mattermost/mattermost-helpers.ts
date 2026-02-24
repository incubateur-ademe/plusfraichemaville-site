import { User } from "@/src/generated/prisma/client";

type CsmBatchWebhookData = {
  nbMailRemindModuleDiagnostic: number;
  nbMailsInactiveUser1: number;
  nbMailsInactiveUser2: number;
  nbMailsInactiveUser3: number;
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

**Nb de mails d'utilisateurs sans projet à J+45 : ** ${data.nbMailsInactiveUser3} 

**Nb de mails de projet terminés pour aller chercher des REX : ** ${data.nbMailsGetRexFromFinishedProjet} 

**Nb de mails de projet terminés pour envoyer le questionnaire : ** ${data.nbMailsSendQuestionnaireForFinishedProjet} 

**Nb de mails de diagnostics non finalisés : ** ${data.nbMailsUnfinishedDiag} 
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

export const makeNoSirenUserWebhookData = (user: User) => {
  return {
    text: `:alert:**[Un utilisateur sans SIREN vient de s'inscrire]**:alert:
User Id : ${user.id}
Email : ${user.email}
Collectivité renseignée manuellement : ${user.nom_etablissement}
@raphael.taieb  
`,
  };
};
