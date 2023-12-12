import { CitationRetourExperience, EtapeCalendrierRetourExperience } from "@/lib/directus/directusCustomModels";

export type AideDecisionEtape = {
  date_created?: string | null;
  date_updated?: string | null;
  description?: string | null;
  etape_parente_id?: (number & AideDecisionEtape) | null;
  fiche_technique_id: any[] & AideDecisionEtapeFicheTechnique[];
  fiches_solutions: any[] & AideDecisionEtapeFicheSolution[];
  id: number;
  image?: (string & DirectusFiles) | null;
  nom?: string | null;
  question_suivante?: string | null;
  slug: string;
  sort?: number | null;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type AideDecisionEtapeFicheSolution = {
  aide_decision_etape_id?: (number & AideDecisionEtape) | null;
  fiche_solution_id?: (number & FicheSolution) | null;
  id: number;
  sort?: number | null;
};

export type AideDecisionEtapeFicheTechnique = {
  aide_decision_etape_id?: (number & AideDecisionEtape) | null;
  fiche_technique_id?: (number & FicheTechnique) | null;
  id: number;
  ordre?: number | null;
};

export type Cobenefice = {
  date_created?: string | null;
  date_updated?: string | null;
  description: string;
  fiches_solutions: any[] & FicheSolutionCobenefice[];
  icone?: string | null;
  id: number;
  status: string;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type DirectusActivity = {
  action: string;
  collection: string;
  comment?: string | null;
  id: number;
  ip?: string | null;
  item: string;
  origin?: string | null;
  revisions: any[] & DirectusRevisions[];
  timestamp: string;
  user?: (string & DirectusUsers) | null;
  user_agent?: string | null;
};

export type DirectusCollections = {
  accountability?: string | null;
  archive_app_filter: boolean;
  archive_field?: string | null;
  archive_value?: string | null;
  collapse: string;
  collection: string;
  color?: string | null;
  display_template?: string | null;
  group?: (string & DirectusCollections) | null;
  hidden: boolean;
  icon?: string | null;
  item_duplication_fields?: unknown | null;
  note?: string | null;
  preview_url?: string | null;
  singleton: boolean;
  sort?: number | null;
  sort_field?: string | null;
  translations?: unknown | null;
  unarchive_value?: string | null;
  versioning: boolean;
};

export type DirectusDashboards = {
  color?: string | null;
  date_created?: string | null;
  icon: string;
  id: string;
  name: string;
  note?: string | null;
  panels: any[] & DirectusPanels[];
  user_created?: (string & DirectusUsers) | null;
};

export type DirectusExtensions = {
  enabled: boolean;
  name: string;
};

export type DirectusFields = {
  collection: string & DirectusCollections;
  conditions?: unknown | null;
  display?: string | null;
  display_options?: unknown | null;
  field: string;
  group?: (string & DirectusFields) | null;
  hidden: boolean;
  id: number;
  interface?: string | null;
  note?: string | null;
  options?: unknown | null;
  readonly: boolean;
  required?: boolean | null;
  sort?: number | null;
  special?: unknown | null;
  translations?: unknown | null;
  validation?: unknown | null;
  validation_message?: string | null;
  width?: string | null;
};

export type DirectusFiles = {
  charset?: string | null;
  description?: string | null;
  duration?: number | null;
  embed?: string | null;
  filename_disk?: string | null;
  filename_download: string;
  filesize?: number | null;
  folder?: (string & DirectusFolders) | null;
  height?: number | null;
  id: string;
  location?: string | null;
  metadata?: unknown | null;
  modified_by?: (string & DirectusUsers) | null;
  modified_on: string;
  storage: string;
  tags?: unknown | null;
  title?: string | null;
  type?: string | null;
  uploaded_by?: (string & DirectusUsers) | null;
  uploaded_on: string;
  width?: number | null;
};

export type DirectusFlows = {
  accountability?: string | null;
  color?: string | null;
  date_created?: string | null;
  description?: string | null;
  icon?: string | null;
  id: string;
  name: string;
  operation?: (string & DirectusOperations) | null;
  operations: any[] & DirectusOperations[];
  options?: unknown | null;
  status: string;
  trigger?: string | null;
  user_created?: (string & DirectusUsers) | null;
};

export type DirectusFolders = {
  id: string;
  name: string;
  parent?: (string & DirectusFolders) | null;
};

export type DirectusMigrations = {
  name: string;
  timestamp?: string | null;
  version: string;
};

export type DirectusNotifications = {
  collection?: string | null;
  id: number;
  item?: string | null;
  message?: string | null;
  recipient: string & DirectusUsers;
  sender?: (string & DirectusUsers) | null;
  status?: string | null;
  subject: string;
  timestamp?: string | null;
};

export type DirectusOperations = {
  date_created?: string | null;
  flow: string & DirectusFlows;
  id: string;
  key: string;
  name?: string | null;
  options?: unknown | null;
  position_x: number;
  position_y: number;
  reject?: (string & DirectusOperations) | null;
  resolve?: (string & DirectusOperations) | null;
  type: string;
  user_created?: (string & DirectusUsers) | null;
};

export type DirectusPanels = {
  color?: string | null;
  dashboard: string & DirectusDashboards;
  date_created?: string | null;
  height: number;
  icon?: string | null;
  id: string;
  name?: string | null;
  note?: string | null;
  options?: unknown | null;
  position_x: number;
  position_y: number;
  show_header: boolean;
  type: string;
  user_created?: (string & DirectusUsers) | null;
  width: number;
};

export type DirectusPermissions = {
  action: string;
  collection: string;
  fields?: unknown | null;
  id: number;
  permissions?: unknown | null;
  presets?: unknown | null;
  role?: (string & DirectusRoles) | null;
  validation?: unknown | null;
};

export type DirectusPresets = {
  bookmark?: string | null;
  collection?: string | null;
  color?: string | null;
  filter?: unknown | null;
  icon?: string | null;
  id: number;
  layout?: string | null;
  layout_options?: unknown | null;
  layout_query?: unknown | null;
  refresh_interval?: number | null;
  role?: (string & DirectusRoles) | null;
  search?: string | null;
  user?: (string & DirectusUsers) | null;
};

export type DirectusRelations = {
  id: number;
  junction_field?: string | null;
  many_collection: string;
  many_field: string;
  one_allowed_collections?: unknown | null;
  one_collection?: string | null;
  one_collection_field?: string | null;
  one_deselect_action: string;
  one_field?: string | null;
  sort_field?: string | null;
};

export type DirectusRevisions = {
  activity: number & DirectusActivity;
  collection: string;
  data?: unknown | null;
  delta?: unknown | null;
  id: number;
  item: string;
  parent?: (number & DirectusRevisions) | null;
  version?: (string & DirectusVersions) | null;
};

export type DirectusRoles = {
  admin_access: boolean;
  app_access: boolean;
  description?: string | null;
  enforce_tfa: boolean;
  icon: string;
  id: string;
  ip_access?: unknown | null;
  name: string;
  users: any[] & DirectusUsers[];
};

export type DirectusSessions = {
  expires: string;
  ip?: string | null;
  origin?: string | null;
  share?: (string & DirectusShares) | null;
  token: string;
  user?: (string & DirectusUsers) | null;
  user_agent?: string | null;
};

export type DirectusSettings = {
  auth_login_attempts?: number | null;
  auth_password_policy?: string | null;
  basemaps?: unknown | null;
  custom_aspect_ratios?: unknown | null;
  custom_css?: string | null;
  default_appearance: string;
  default_language: string;
  default_theme_dark?: string | null;
  default_theme_light?: string | null;
  id: number;
  mapbox_key?: string | null;
  module_bar?: unknown | null;
  project_color: string;
  project_descriptor?: string | null;
  project_logo?: (string & DirectusFiles) | null;
  project_name: string;
  project_url?: string | null;
  public_background?: (string & DirectusFiles) | null;
  public_favicon?: string | null;
  public_foreground?: (string & DirectusFiles) | null;
  public_note?: string | null;
  storage_asset_presets?: unknown | null;
  storage_asset_transform?: string | null;
  storage_default_folder?: (string & DirectusFolders) | null;
  theme_dark_overrides?: unknown | null;
  theme_light_overrides?: unknown | null;
  theming_group: string;
};

export type DirectusShares = {
  collection: string & DirectusCollections;
  date_created?: string | null;
  date_end?: string | null;
  date_start?: string | null;
  id: string;
  item: string;
  max_uses?: number | null;
  name?: string | null;
  password?: string | null;
  role?: (string & DirectusRoles) | null;
  times_used?: number | null;
  user_created?: (string & DirectusUsers) | null;
};

export type DirectusTranslations = {
  id: string;
  key: string;
  language: string;
  value: string;
};

export type DirectusUsers = {
  appearance?: string | null;
  auth_data?: unknown | null;
  avatar?: (string & DirectusFiles) | null;
  description?: string | null;
  email?: string | null;
  email_notifications?: boolean | null;
  external_identifier?: string | null;
  first_name?: string | null;
  id: string;
  language?: string | null;
  last_access?: string | null;
  last_name?: string | null;
  last_page?: string | null;
  location?: string | null;
  password?: string | null;
  provider: string;
  role?: (string & DirectusRoles) | null;
  status: string;
  tags?: unknown | null;
  tfa_secret?: string | null;
  theme_dark?: string | null;
  theme_dark_overrides?: unknown | null;
  theme_light?: string | null;
  theme_light_overrides?: unknown | null;
  title?: string | null;
  token?: string | null;
};

export type DirectusVersions = {
  collection: string & DirectusCollections;
  date_created?: string | null;
  date_updated?: string | null;
  hash?: string | null;
  id: string;
  item: string;
  key: string;
  name?: string | null;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type DirectusWebhooks = {
  actions: unknown;
  collections: unknown;
  data: boolean;
  headers?: unknown | null;
  id: number;
  method: string;
  name: string;
  status: string;
  url: string;
};

export type EtapeMiseEnOeuvre = {
  description?: string | null;
  id: number;
  titre?: string | null;
};

export type FicheSolution = {
  baisse_temperature: number;
  cobenefices: any[] & FicheSolutionCobenefice[];
  contexte_description?: string | null;
  contexte_titre?: string | null;
  cout_maximum: number;
  cout_maximum_entretien?: number | null;
  cout_minimum: number;
  cout_minimum_entretien?: number | null;
  date_created?: string | null;
  date_updated?: string | null;
  delai_travaux?: number | null;
  description: string;
  description_courte: string;
  etapes_diagnostic?: unknown | null;
  etapes_entretien?: unknown | null;
  etapes_mise_en_oeuvre?: unknown | null;
  fiches_solutions_complementaires: any[] & FicheSolutionFicheSolution[];
  id: number;
  image_principale?: (string & DirectusFiles) | null;
  lien_aide_territoire?: string | null;
  lien_fond_vert?: string | null;
  logo_partenaire?: (string & DirectusFiles) | null;
  materiaux: any[] & FicheSolutionMateriau[];
  oups: any[] & Oups[];
  point_vigilance?: string | null;
  rafraichissement_attendu_description?: string | null;
  slug: string;
  solution_retour_experience: any[] & SolutionRetourExperience[];
  sort?: number | null;
  status: string;
  titre: string;
  type_solution?: string | null;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type FicheSolutionCobenefice = {
  cobenefice_id?: (number & Cobenefice) | null;
  fiche_solution_id?: (number & FicheSolution) | null;
  id: number;
  sort?: number | null;
};

export type FicheSolutionFicheSolution = {
  fiche_solution_id?: (number & FicheSolution) | null;
  id: number;
  related_fiche_solution_id?: (number & FicheSolution) | null;
  sort?: number | null;
};

export type FicheSolutionMateriau = {
  fiche_solution_id?: (number & FicheSolution) | null;
  id: number;
  materiau_id?: (number & Materiau) | null;
  sort?: number | null;
};

export type FicheTechnique = {
  date_created?: string | null;
  date_updated?: string | null;
  description?: string | null;
  description_courte?: string | null;
  etapes_mise_en_oeuvre: any[] & FicheTechniqueEtapeMiseEnOeuvre[];
  id: number;
  image_principale?: (string & DirectusFiles) | null;
  odd: any[] & FicheTechniqueObjectifDeveloppementDurable[];
  potentiel_rafraichissement?: number | null;
  slug: string;
  sort?: number | null;
  status: string;
  titre?: string | null;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type FicheTechniqueEtapeMiseEnOeuvre = {
  etape_mise_en_oeuvre_id?: (number & EtapeMiseEnOeuvre) | null;
  fiche_technique_id?: (number & FicheTechnique) | null;
  id: number;
  order_etape_mise_en_oeuvre?: number | null;
};

export type FicheTechniqueObjectifDeveloppementDurable = {
  fiche_technique_id?: (number & FicheTechnique) | null;
  id: number;
  objectif_developpement_durable_id?: (number & ObjectifDeveloppementDurable) | null;
};

export type Materiau = {
  cout_maximum_fourniture?: number | null;
  cout_minimum_fourniture?: number | null;
  cout_unite?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  description: string;
  fiche_solution: any[] & FicheSolutionMateriau[];
  id: number;
  sort?: number | null;
  status: string;
  titre: string;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type ObjectifDeveloppementDurable = {
  description?: string | null;
  id: number;
  numero_odd?: number | null;
  sort?: number | null;
};

export type Oups = {
  date_created?: string | null;
  date_updated?: string | null;
  description: string;
  fiche_solution?: (number & FicheSolution) | null;
  id: number;
  solutions_reparatrices: any[] & OupsFicheSolution[];
  status: string;
  titre: string;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type OupsFicheSolution = {
  fiche_solution_id?: (number & FicheSolution) | null;
  id: number;
  oups_id?: (number & Oups) | null;
  sort?: number | null;
};

export type RetourExperience = {
  aides_regionales?: unknown | null;
  calendrier?: EtapeCalendrierRetourExperience[] | null;
  citation?: CitationRetourExperience[] | null;
  climat_actuel?: string | null;
  climat_futur?: string | null;
  contact?: string | null;
  cout?: string | null;
  credits?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  description: string;
  difficultes?: string | null;
  echelle?: string | null;
  financement?: string | null;
  id: number;
  image_principale?: (string & DirectusFiles) | null;
  odd: any[] & RetourExperienceObjectifDeveloppementDurable[];
  partenaires?: string | null;
  porteur?: string | null;
  region?: string | null;
  ressources?: string | null;
  retours_experience_lies: any[] & RetourExperienceRetourExperience[];
  situation_apres?: (number & SituationRetourExperience) | null;
  situation_avant?: (number & SituationRetourExperience) | null;
  slug?: string | null;
  solutions: any[] & SolutionRetourExperience[];
  sort?: number | null;
  status: string;
  temporalite?: string | null;
  titre: string;
  types_espace?: string[] | null;
  types_solution?: string[] | null;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type RetourExperienceObjectifDeveloppementDurable = {
  id: number;
  objectif_developpement_durable_id?: (number & ObjectifDeveloppementDurable) | null;
  retour_experience_id?: (number & RetourExperience) | null;
};

export type RetourExperienceRetourExperience = {
  id: number;
  related_retour_experience_id?: (number & RetourExperience) | null;
  retour_experience_id?: (number & RetourExperience) | null;
  sort?: number | null;
};

export type RetourExperienceSolutionRetourExperience = {
  id: number;
  retour_experience_id?: (number & RetourExperience) | null;
  solution_retour_experience_id?: (number & SolutionRetourExperience) | null;
  sort?: number | null;
};

export type SituationRetourExperience = {
  date_created?: string | null;
  date_updated?: string | null;
  description: string;
  id: number;
  image?: (string & DirectusFiles) | null;
  sort?: number | null;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type SolutionRetourExperience = {
  date_created?: string | null;
  date_updated?: string | null;
  description: string;
  fiche_solution: number & FicheSolution;
  id: number;
  image?: (string & DirectusFiles) | null;
  retour_experience: number & RetourExperience;
  sort?: number | null;
  titre: string;
  user_created?: (string & DirectusUsers) | null;
  user_updated?: (string & DirectusUsers) | null;
};

export type CustomDirectusTypes = {
  aide_decision_etape: AideDecisionEtape[];
  aide_decision_etape_fiche_solution: AideDecisionEtapeFicheSolution[];
  aide_decision_etape_fiche_technique: AideDecisionEtapeFicheTechnique[];
  cobenefice: Cobenefice[];
  directus_activity: DirectusActivity[];
  directus_collections: DirectusCollections[];
  directus_dashboards: DirectusDashboards[];
  directus_extensions: DirectusExtensions[];
  directus_fields: DirectusFields[];
  directus_files: DirectusFiles[];
  directus_flows: DirectusFlows[];
  directus_folders: DirectusFolders[];
  directus_migrations: DirectusMigrations[];
  directus_notifications: DirectusNotifications[];
  directus_operations: DirectusOperations[];
  directus_panels: DirectusPanels[];
  directus_permissions: DirectusPermissions[];
  directus_presets: DirectusPresets[];
  directus_relations: DirectusRelations[];
  directus_revisions: DirectusRevisions[];
  directus_roles: DirectusRoles[];
  directus_sessions: DirectusSessions[];
  directus_settings: DirectusSettings;
  directus_shares: DirectusShares[];
  directus_translations: DirectusTranslations[];
  directus_users: DirectusUsers[];
  directus_versions: DirectusVersions[];
  directus_webhooks: DirectusWebhooks[];
  etape_mise_en_oeuvre: EtapeMiseEnOeuvre[];
  fiche_solution: FicheSolution[];
  fiche_solution_cobenefice: FicheSolutionCobenefice[];
  fiche_solution_fiche_solution: FicheSolutionFicheSolution[];
  fiche_solution_materiau: FicheSolutionMateriau[];
  fiche_technique: FicheTechnique[];
  fiche_technique_etape_mise_en_oeuvre: FicheTechniqueEtapeMiseEnOeuvre[];
  fiche_technique_objectif_developpement_durable: FicheTechniqueObjectifDeveloppementDurable[];
  materiau: Materiau[];
  objectif_developpement_durable: ObjectifDeveloppementDurable[];
  oups: Oups[];
  oups_fiche_solution: OupsFicheSolution[];
  retour_experience: RetourExperience[];
  retour_experience_objectif_developpement_durable: RetourExperienceObjectifDeveloppementDurable[];
  retour_experience_retour_experience: RetourExperienceRetourExperience[];
  retour_experience_solution_retour_experience: RetourExperienceSolutionRetourExperience[];
  situation_retour_experience: SituationRetourExperience[];
  solution_retour_experience: SolutionRetourExperience[];
};
