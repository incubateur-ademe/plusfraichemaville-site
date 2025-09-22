export type ConnectContact = {
  email: string;
  source: string;
  siret?: string | null;
  nom?: string | null;
  prenom?: string | null;
  fonction?: string | null;
  telephone?: string | null;
  dateCreation?: string | null;
  dateModification?: string | null;
  abonnementNewsletter?: boolean | null;
};

export type ConnectProjet = {
  idProjet: string;
  typeProjet: string;
  nomProjet: string;
  etape: string;
  dateCloture: string;
  codeCommuneInsee: string;
  typeEspace: string;
  projetVisible: boolean;
  localisation?: string | null;
  projetTest?: boolean;
  projetAnnule?: boolean;
  dateAnnulation?: string | null;
};

export type ConnectResponse = {
  correlationId: string;
  success: boolean;
  timestamp: string;
  message: string;
  errorMessage?: string;
  mail: string;
};
