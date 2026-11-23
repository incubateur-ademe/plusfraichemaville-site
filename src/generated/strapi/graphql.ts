/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type BooleanFilterInput = {
  and?: Array<boolean | null | undefined> | null | undefined;
  between?: Array<boolean | null | undefined> | null | undefined;
  contains?: boolean | null | undefined;
  containsi?: boolean | null | undefined;
  endsWith?: boolean | null | undefined;
  eq?: boolean | null | undefined;
  eqi?: boolean | null | undefined;
  gt?: boolean | null | undefined;
  gte?: boolean | null | undefined;
  in?: Array<boolean | null | undefined> | null | undefined;
  lt?: boolean | null | undefined;
  lte?: boolean | null | undefined;
  ne?: boolean | null | undefined;
  nei?: boolean | null | undefined;
  not?: BooleanFilterInput | null | undefined;
  notContains?: boolean | null | undefined;
  notContainsi?: boolean | null | undefined;
  notIn?: Array<boolean | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<boolean | null | undefined> | null | undefined;
  startsWith?: boolean | null | undefined;
};

export type CharteFiltersInput = {
  and?: Array<CharteFiltersInput | null | undefined> | null | undefined;
  annee_signature?: StringFilterInput | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  departement?: DepartementFiltersInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  nom_collectivite?: StringFilterInput | null | undefined;
  not?: CharteFiltersInput | null | undefined;
  or?: Array<CharteFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  retour_experiences?: RetourExperienceFiltersInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type CobeneficeFiltersInput = {
  and?: Array<CobeneficeFiltersInput | null | undefined> | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  fiches_solutions?: FicheSolutionFiltersInput | null | undefined;
  icone?: StringFilterInput | null | undefined;
  not?: CobeneficeFiltersInput | null | undefined;
  or?: Array<CobeneficeFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type ComponentCommonCitationFiltersInput = {
  and?: Array<ComponentCommonCitationFiltersInput | null | undefined> | null | undefined;
  auteur?: StringFilterInput | null | undefined;
  not?: ComponentCommonCitationFiltersInput | null | undefined;
  or?: Array<ComponentCommonCitationFiltersInput | null | undefined> | null | undefined;
  texte?: StringFilterInput | null | undefined;
};

export type ComponentFicheSolutionEtapeDiagnosticFiltersInput = {
  and?: Array<ComponentFicheSolutionEtapeDiagnosticFiltersInput | null | undefined> | null | undefined;
  description?: StringFilterInput | null | undefined;
  not?: ComponentFicheSolutionEtapeDiagnosticFiltersInput | null | undefined;
  or?: Array<ComponentFicheSolutionEtapeDiagnosticFiltersInput | null | undefined> | null | undefined;
  titre?: StringFilterInput | null | undefined;
};

export type ComponentFicheSolutionEtapeEntretienFiltersInput = {
  and?: Array<ComponentFicheSolutionEtapeEntretienFiltersInput | null | undefined> | null | undefined;
  description?: StringFilterInput | null | undefined;
  not?: ComponentFicheSolutionEtapeEntretienFiltersInput | null | undefined;
  or?: Array<ComponentFicheSolutionEtapeEntretienFiltersInput | null | undefined> | null | undefined;
  titre?: StringFilterInput | null | undefined;
};

export type ComponentFicheSolutionEtapeMiseEnOeuvreFiltersInput = {
  and?: Array<ComponentFicheSolutionEtapeMiseEnOeuvreFiltersInput | null | undefined> | null | undefined;
  description?: StringFilterInput | null | undefined;
  not?: ComponentFicheSolutionEtapeMiseEnOeuvreFiltersInput | null | undefined;
  or?: Array<ComponentFicheSolutionEtapeMiseEnOeuvreFiltersInput | null | undefined> | null | undefined;
  titre?: StringFilterInput | null | undefined;
};

export type ComponentFicheSolutionOupsFiltersInput = {
  and?: Array<ComponentFicheSolutionOupsFiltersInput | null | undefined> | null | undefined;
  description?: StringFilterInput | null | undefined;
  not?: ComponentFicheSolutionOupsFiltersInput | null | undefined;
  or?: Array<ComponentFicheSolutionOupsFiltersInput | null | undefined> | null | undefined;
  solutions_reparatrices?: FicheSolutionFiltersInput | null | undefined;
  titre?: StringFilterInput | null | undefined;
};

export type ComponentRetourExperienceCalendrierFiltersInput = {
  and?: Array<ComponentRetourExperienceCalendrierFiltersInput | null | undefined> | null | undefined;
  date?: StringFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  not?: ComponentRetourExperienceCalendrierFiltersInput | null | undefined;
  or?: Array<ComponentRetourExperienceCalendrierFiltersInput | null | undefined> | null | undefined;
  titre?: StringFilterInput | null | undefined;
};

export type ComponentRetourExperienceContactFiltersInput = {
  and?: Array<ComponentRetourExperienceContactFiltersInput | null | undefined> | null | undefined;
  email?: StringFilterInput | null | undefined;
  label?: StringFilterInput | null | undefined;
  nom?: StringFilterInput | null | undefined;
  not?: ComponentRetourExperienceContactFiltersInput | null | undefined;
  or?: Array<ComponentRetourExperienceContactFiltersInput | null | undefined> | null | undefined;
  site_internet?: StringFilterInput | null | undefined;
  sous_type_de_contact?: StringFilterInput | null | undefined;
  telephone?: StringFilterInput | null | undefined;
  type_de_contact?: StringFilterInput | null | undefined;
};

export type ComponentRetourExperienceSituationFiltersInput = {
  and?: Array<ComponentRetourExperienceSituationFiltersInput | null | undefined> | null | undefined;
  description?: StringFilterInput | null | undefined;
  not?: ComponentRetourExperienceSituationFiltersInput | null | undefined;
  or?: Array<ComponentRetourExperienceSituationFiltersInput | null | undefined> | null | undefined;
};

export type DateTimeFilterInput = {
  and?: Array<string | null | undefined> | null | undefined;
  between?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  containsi?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  eqi?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  ne?: string | null | undefined;
  nei?: string | null | undefined;
  not?: DateTimeFilterInput | null | undefined;
  notContains?: string | null | undefined;
  notContainsi?: string | null | undefined;
  notIn?: Array<string | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<string | null | undefined> | null | undefined;
  startsWith?: string | null | undefined;
};

export type DepartementFiltersInput = {
  and?: Array<DepartementFiltersInput | null | undefined> | null | undefined;
  code?: StringFilterInput | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  nom?: StringFilterInput | null | undefined;
  not?: DepartementFiltersInput | null | undefined;
  or?: Array<DepartementFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type FicheSolutionFiltersInput = {
  aides_territoires_mots_cles?: StringFilterInput | null | undefined;
  and?: Array<FicheSolutionFiltersInput | null | undefined> | null | undefined;
  baisse_temperature?: FloatFilterInput | null | undefined;
  cobenefices?: CobeneficeFiltersInput | null | undefined;
  contexte_description?: StringFilterInput | null | undefined;
  contexte_titre?: StringFilterInput | null | undefined;
  cout_entretien_description?: StringFilterInput | null | undefined;
  cout_entretien_unite?: StringFilterInput | null | undefined;
  cout_maximum?: IntFilterInput | null | undefined;
  cout_maximum_entretien?: IntFilterInput | null | undefined;
  cout_minimum?: IntFilterInput | null | undefined;
  cout_minimum_entretien?: IntFilterInput | null | undefined;
  cout_unite?: StringFilterInput | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  credits?: StringFilterInput | null | undefined;
  delai_travaux_maximum?: IntFilterInput | null | undefined;
  delai_travaux_minimum?: IntFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  description_courte?: StringFilterInput | null | undefined;
  description_estimation?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  en_savoir_plus?: StringFilterInput | null | undefined;
  etapes_diagnostic?: ComponentFicheSolutionEtapeDiagnosticFiltersInput | null | undefined;
  etapes_entretien?: ComponentFicheSolutionEtapeEntretienFiltersInput | null | undefined;
  etapes_mise_en_oeuvre?: ComponentFicheSolutionEtapeMiseEnOeuvreFiltersInput | null | undefined;
  fiches_solutions_complementaires?: FicheSolutionFiltersInput | null | undefined;
  libelle_avantage_solution?: StringFilterInput | null | undefined;
  lien_fond_vert?: StringFilterInput | null | undefined;
  materiaux?: MateriauFiltersInput | null | undefined;
  not?: FicheSolutionFiltersInput | null | undefined;
  or?: Array<FicheSolutionFiltersInput | null | undefined> | null | undefined;
  oups?: ComponentFicheSolutionOupsFiltersInput | null | undefined;
  point_vigilance?: StringFilterInput | null | undefined;
  portee_baisse_temperature?: StringFilterInput | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  rafraichissement_attendu_description?: StringFilterInput | null | undefined;
  rank?: IntFilterInput | null | undefined;
  slug?: StringFilterInput | null | undefined;
  solution_retour_experiences?: SolutionRetourExperienceFiltersInput | null | undefined;
  titre?: StringFilterInput | null | undefined;
  type_solution?: StringFilterInput | null | undefined;
  types_espace?: JsonFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type FloatFilterInput = {
  and?: Array<number | null | undefined> | null | undefined;
  between?: Array<number | null | undefined> | null | undefined;
  contains?: number | null | undefined;
  containsi?: number | null | undefined;
  endsWith?: number | null | undefined;
  eq?: number | null | undefined;
  eqi?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number | null | undefined> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  ne?: number | null | undefined;
  nei?: number | null | undefined;
  not?: FloatFilterInput | null | undefined;
  notContains?: number | null | undefined;
  notContainsi?: number | null | undefined;
  notIn?: Array<number | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<number | null | undefined> | null | undefined;
  startsWith?: number | null | undefined;
};

export type IdFilterInput = {
  and?: Array<string | null | undefined> | null | undefined;
  between?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  containsi?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  eqi?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  ne?: string | null | undefined;
  nei?: string | null | undefined;
  not?: IdFilterInput | null | undefined;
  notContains?: string | null | undefined;
  notContainsi?: string | null | undefined;
  notIn?: Array<string | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<string | null | undefined> | null | undefined;
  startsWith?: string | null | undefined;
};

export type IntFilterInput = {
  and?: Array<number | null | undefined> | null | undefined;
  between?: Array<number | null | undefined> | null | undefined;
  contains?: number | null | undefined;
  containsi?: number | null | undefined;
  endsWith?: number | null | undefined;
  eq?: number | null | undefined;
  eqi?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number | null | undefined> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  ne?: number | null | undefined;
  nei?: number | null | undefined;
  not?: IntFilterInput | null | undefined;
  notContains?: number | null | undefined;
  notContainsi?: number | null | undefined;
  notIn?: Array<number | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<number | null | undefined> | null | undefined;
  startsWith?: number | null | undefined;
};

export type JsonFilterInput = {
  and?: Array<unknown> | null | undefined;
  between?: Array<unknown> | null | undefined;
  contains?: unknown;
  containsi?: unknown;
  endsWith?: unknown;
  eq?: unknown;
  eqi?: unknown;
  gt?: unknown;
  gte?: unknown;
  in?: Array<unknown> | null | undefined;
  lt?: unknown;
  lte?: unknown;
  ne?: unknown;
  nei?: unknown;
  not?: JsonFilterInput | null | undefined;
  notContains?: unknown;
  notContainsi?: unknown;
  notIn?: Array<unknown> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<unknown> | null | undefined;
  startsWith?: unknown;
};

export type MateriauFiltersInput = {
  and?: Array<MateriauFiltersInput | null | undefined> | null | undefined;
  cout_maximum_entretien?: IntFilterInput | null | undefined;
  cout_maximum_fourniture?: IntFilterInput | null | undefined;
  cout_minimum_entretien?: IntFilterInput | null | undefined;
  cout_minimum_fourniture?: IntFilterInput | null | undefined;
  cout_unite?: StringFilterInput | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  fiches_solution?: FicheSolutionFiltersInput | null | undefined;
  not?: MateriauFiltersInput | null | undefined;
  or?: Array<MateriauFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  titre?: StringFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type ObjectifDeveloppementDurableFiltersInput = {
  and?: Array<ObjectifDeveloppementDurableFiltersInput | null | undefined> | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  not?: ObjectifDeveloppementDurableFiltersInput | null | undefined;
  numero?: IntFilterInput | null | undefined;
  or?: Array<ObjectifDeveloppementDurableFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type PublicationStatus =
  | 'DRAFT'
  | 'PUBLISHED';

export type RegionFiltersInput = {
  and?: Array<RegionFiltersInput | null | undefined> | null | undefined;
  code?: StringFilterInput | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  nom?: StringFilterInput | null | undefined;
  not?: RegionFiltersInput | null | undefined;
  or?: Array<RegionFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type RetourExperienceFiltersInput = {
  and?: Array<RetourExperienceFiltersInput | null | undefined> | null | undefined;
  calendrier?: ComponentRetourExperienceCalendrierFiltersInput | null | undefined;
  charte?: CharteFiltersInput | null | undefined;
  citations?: ComponentCommonCitationFiltersInput | null | undefined;
  climat_actuel?: StringFilterInput | null | undefined;
  climat_futur?: StringFilterInput | null | undefined;
  contact?: StringFilterInput | null | undefined;
  contacts?: ComponentRetourExperienceContactFiltersInput | null | undefined;
  cout?: StringFilterInput | null | undefined;
  cout_euro?: IntFilterInput | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  credits?: StringFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  difficultes?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  echelle?: StringFilterInput | null | undefined;
  export_aquagir?: BooleanFilterInput | null | undefined;
  financement?: StringFilterInput | null | undefined;
  location?: JsonFilterInput | null | undefined;
  not?: RetourExperienceFiltersInput | null | undefined;
  odds?: ObjectifDeveloppementDurableFiltersInput | null | undefined;
  or?: Array<RetourExperienceFiltersInput | null | undefined> | null | undefined;
  partenaires?: StringFilterInput | null | undefined;
  porteur?: StringFilterInput | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  rank?: IntFilterInput | null | undefined;
  region?: RegionFiltersInput | null | undefined;
  ressources?: StringFilterInput | null | undefined;
  retour_experiences?: RetourExperienceFiltersInput | null | undefined;
  situation_apres?: ComponentRetourExperienceSituationFiltersInput | null | undefined;
  situation_avant?: ComponentRetourExperienceSituationFiltersInput | null | undefined;
  slug?: StringFilterInput | null | undefined;
  solution_retour_experiences?: SolutionRetourExperienceFiltersInput | null | undefined;
  temporalite?: StringFilterInput | null | undefined;
  titre?: StringFilterInput | null | undefined;
  types_espaces?: JsonFilterInput | null | undefined;
  types_solutions?: JsonFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type SolutionRetourExperienceFiltersInput = {
  and?: Array<SolutionRetourExperienceFiltersInput | null | undefined> | null | undefined;
  createdAt?: DateTimeFilterInput | null | undefined;
  description?: StringFilterInput | null | undefined;
  documentId?: IdFilterInput | null | undefined;
  fiche_solution?: FicheSolutionFiltersInput | null | undefined;
  not?: SolutionRetourExperienceFiltersInput | null | undefined;
  or?: Array<SolutionRetourExperienceFiltersInput | null | undefined> | null | undefined;
  publishedAt?: DateTimeFilterInput | null | undefined;
  retour_experience?: RetourExperienceFiltersInput | null | undefined;
  titre?: StringFilterInput | null | undefined;
  updatedAt?: DateTimeFilterInput | null | undefined;
};

export type StringFilterInput = {
  and?: Array<string | null | undefined> | null | undefined;
  between?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  containsi?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  eqi?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  ne?: string | null | undefined;
  nei?: string | null | undefined;
  not?: StringFilterInput | null | undefined;
  notContains?: string | null | undefined;
  notContainsi?: string | null | undefined;
  notIn?: Array<string | null | undefined> | null | undefined;
  notNull?: boolean | null | undefined;
  null?: boolean | null | undefined;
  or?: Array<string | null | undefined> | null | undefined;
  startsWith?: string | null | undefined;
};

export type GetAllChartesQueryVariables = Exact<{
  status?: PublicationStatus | null | undefined;
  retourExperienceFilters?: RetourExperienceFiltersInput | null | undefined;
}>;


export type GetAllChartesQuery = { chartes: Array<{ documentId: string, nom_collectivite: string | null, annee_signature: string, departement: { code: string, nom: string | null }, retour_experiences: Array<{ slug: string, titre: string } | null> } | null> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetAllChartesDocument = new TypedDocumentString(`
    query GetAllChartes($status: PublicationStatus, $retourExperienceFilters: RetourExperienceFiltersInput) {
  chartes(status: $status) {
    documentId
    nom_collectivite
    annee_signature
    departement {
      code
      nom
    }
    retour_experiences(filters: $retourExperienceFilters) {
      slug
      titre
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllChartesQuery, GetAllChartesQueryVariables>;