import { IApiAidesTerritoiresResponse } from "@/src/lib/aidesTerritoires/types";

export type AidesTerritoiresAidesResponse = {
  count: number;
  previous: string | null;
  next: string | null;
  results: AidesTerritoiresAide[];
};

export interface AidesTerritoiresAide extends IApiAidesTerritoiresResponse {
  id: number;
  slug: string | null;
  url: string | null;
  name: string | null;
  name_initial: string | null;
  short_title: string | null;
  financers: string[];
  financers_full: {
    id: number;
    name: string;
    logo: string;
  }[];
  instructors: string[];
  instructors_full: {
    id: number;
    name: string;
    logo: string;
  }[];
  programs: string[];
  description: string | null;
  eligibility: string | null;
  perimeter: string | null;
  perimeter_scale: string | null;
  mobilization_steps: string[];
  origin_url: string | null;
  categories: string[];
  is_call_for_project: boolean;
  application_url: string | null;
  targeted_audiences: string[];
  aid_types: AidesTerritoiresAideName[];
  aid_types_full: {
    id: number;
    name: string;
    group: {
      id: number;
      name: AidesTerritoiresAideType;
    };
  }[];
  is_charged: boolean;
  destinations: string[];
  start_date: string | null;
  predeposit_date: string | null;
  submission_deadline: Date | null;
  subvention_comment: string | null;
  subvention_rate_lower_bound: number | null;
  subvention_rate_upper_bound: number | null;
  loan_amount: number | null;
  recoverable_advance_amount: number | null;
  contact: string | null;
  recurrence: string | null;
  project_examples: string | null;
  import_data_url: string | null;
  import_data_mention: string | null;
  import_share_licence: string | null;
  date_created: string | null;
  date_updated: string | null;
  project_references: string[];
}

export enum TypeAidesTerritoiresAide {
  // eslint-disable-next-line no-unused-vars
  financement = "financement",
  // eslint-disable-next-line no-unused-vars
  ingenierie = "ingenierie",
}
export type AidesTerritoiresAideType = "Aide financière" | "Aide en ingénierie";

export type AidesTerritoiresAideNameKey = keyof typeof aidesTerritoiresAideName;
export type AidesTerritoiresAideName = (typeof aidesTerritoiresAideName)[AidesTerritoiresAideNameKey];

const aidesTerritoiresAideName = {
  Subvention: "Subvention",
  Pret: "Prêt",
  AvanceRecuperable: "Avance récupérable",
  CertificatEconomieEnergie: "Certificat d'économie d'énergie (CEE)",
  AutreAideFinanciere: "Autre aide financière",
  IngenierieTechnique: "Ingénierie technique",
  IngenierieFinanciere: "Ingénierie financière",
  IngenierieJuridiqueAdministrative: "Ingénierie Juridique / administrative",
} as const;
