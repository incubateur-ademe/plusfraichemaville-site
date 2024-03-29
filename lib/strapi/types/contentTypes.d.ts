import type { Schema, Attribute } from "@strapi/strapi";

export interface AdminPermission extends Schema.CollectionType {
  collectionName: "admin_permissions";
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<"admin::permission", "manyToOne", "admin::role">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: "admin_users";
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<"admin::user", "manyToMany", "admin::role"> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: "admin_roles";
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<"admin::role", "manyToMany", "admin::user">;
    permissions: Attribute.Relation<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: "strapi_api_tokens";
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<"">;
    type: Attribute.Enumeration<["read-only", "full-access", "custom"]> &
      Attribute.Required &
      Attribute.DefaultTo<"read-only">;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      "admin::api-token",
      "oneToMany",
      "admin::api-token-permission"
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: "strapi_api_token_permissions";
  info: {
    name: "API Token Permission";
    description: "";
    singularName: "api-token-permission";
    pluralName: "api-token-permissions";
    displayName: "API Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      "admin::api-token-permission",
      "manyToOne",
      "admin::api-token"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: "strapi_transfer_tokens";
  info: {
    name: "Transfer Token";
    singularName: "transfer-token";
    pluralName: "transfer-tokens";
    displayName: "Transfer Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<"">;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      "admin::transfer-token",
      "oneToMany",
      "admin::transfer-token-permission"
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::transfer-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::transfer-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: "strapi_transfer_token_permissions";
  info: {
    name: "Transfer Token Permission";
    description: "";
    singularName: "transfer-token-permission";
    pluralName: "transfer-token-permissions";
    displayName: "Transfer Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      "admin::transfer-token-permission",
      "manyToOne",
      "admin::transfer-token"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::transfer-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::transfer-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: "files";
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<"plugin::upload.file", "morphToMany">;
    folder: Attribute.Relation<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: "upload_folders";
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >;
    children: Attribute.Relation<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >;
    files: Attribute.Relation<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: "strapi_releases";
  info: {
    singularName: "release";
    pluralName: "releases";
    displayName: "Release";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      "plugin::content-releases.release",
      "oneToMany",
      "plugin::content-releases.release-action"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::content-releases.release",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::content-releases.release",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: "strapi_release_actions";
  info: {
    singularName: "release-action";
    pluralName: "release-actions";
    displayName: "Release Action";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<["publish", "unpublish"]> & Attribute.Required;
    entry: Attribute.Relation<
      "plugin::content-releases.release-action",
      "morphToOne"
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      "plugin::content-releases.release-action",
      "manyToOne",
      "plugin::content-releases.release"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::content-releases.release-action",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::content-releases.release-action",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: "i18n_locale";
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: "up_permissions";
  info: {
    name: "permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      "plugin::users-permissions.permission",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: "up_roles";
  info: {
    name: "role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.user"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: "up_users";
  info: {
    name: "user";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      "plugin::users-permissions.user",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiAideDecisionEtapeAideDecisionEtape
  extends Schema.CollectionType {
  collectionName: "aide_decision_etapes";
  info: {
    singularName: "aide-decision-etape";
    pluralName: "aide-decision-etapes";
    displayName: "Aide D\u00E9cision Etape";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    description: Attribute.String;
    question_suivante: Attribute.String;
    image: Attribute.Media;
    slug: Attribute.String & Attribute.Required & Attribute.Unique;
    fiches_solutions: Attribute.Relation<
      "api::aide-decision-etape.aide-decision-etape",
      "oneToMany",
      "api::fiche-solution.fiche-solution"
    >;
    etapes_suivantes: Attribute.Relation<
      "api::aide-decision-etape.aide-decision-etape",
      "oneToMany",
      "api::aide-decision-etape.aide-decision-etape"
    >;
    etape_precedente: Attribute.Relation<
      "api::aide-decision-etape.aide-decision-etape",
      "manyToOne",
      "api::aide-decision-etape.aide-decision-etape"
    >;
    rank: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::aide-decision-etape.aide-decision-etape",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::aide-decision-etape.aide-decision-etape",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiCobeneficeCobenefice extends Schema.CollectionType {
  collectionName: "cobenefices";
  info: {
    singularName: "cobenefice";
    pluralName: "cobenefices";
    displayName: "Cobenefice";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    icone: Attribute.Enumeration<
      [
        "abriter_biodiversite",
        "ameliorer_bien_etre_sante",
        "ameliorer_qualite_air",
        "creer_lien_social",
        "faire_economies_eau_potable",
        "filtrer_pollutions_preserver_qualite_eaux",
        "gerer_eaux_pluviales",
        "prevenir_risques_innondation",
        "prolongee_durabilite_equipement",
        "reduide_place_voiture_en_ville",
        "reduire_consommations_energetiques",
        "reduire_nuisances_sonores",
        "rendre_espaces_publics_plus_accueillants",
        "rendre_ville_plus_ludique",
        "sensibiliser_vivant_nature",
        "sequestrer_du_carbone"
      ]
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    fiches_solutions: Attribute.Relation<
      "api::cobenefice.cobenefice",
      "manyToMany",
      "api::fiche-solution.fiche-solution"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::cobenefice.cobenefice",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::cobenefice.cobenefice",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiFicheDiagnosticFicheDiagnostic
  extends Schema.CollectionType {
  collectionName: "fiche_diagnostics";
  info: {
    singularName: "fiche-diagnostic";
    pluralName: "fiche-diagnostics";
    displayName: "Fiche Diagnostic";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description_courte: Attribute.String & Attribute.Required;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    etapes_mise_en_oeuvre: Attribute.Component<
      "fiche-diagnostic.etape-mise-en-oeuvre",
      true
    >;
    rank: Attribute.Integer;
    image_principale: Attribute.Media;
    echelle: Attribute.Enumeration<["territoire", "espace"]>;
    methode: Attribute.Enumeration<
      [
        "observation",
        "enquete",
        "simulation_numerique",
        "analyse_spatiale",
        "modelisation_spatiale"
      ]
    >;
    slug: Attribute.String & Attribute.Required & Attribute.Unique;
    besoin: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    indicateurs: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    delai_min: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    delai_max: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_min: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_max: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    explication_source: Attribute.String;
    avantage_description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    vigilance_description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    en_savoir_plus_description: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    fiches_diagnostics_associees: Attribute.Relation<
      "api::fiche-diagnostic.fiche-diagnostic",
      "oneToMany",
      "api::fiche-diagnostic.fiche-diagnostic"
    >;
    materiel: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    partenaire: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::fiche-diagnostic.fiche-diagnostic",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::fiche-diagnostic.fiche-diagnostic",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiFicheSolutionFicheSolution extends Schema.CollectionType {
  collectionName: "fiche_solutions";
  info: {
    singularName: "fiche-solution";
    pluralName: "fiche-solutions";
    displayName: "Fiche Solution";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    image_principale: Attribute.Media &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    solution_retour_experiences: Attribute.Relation<
      "api::fiche-solution.fiche-solution",
      "oneToMany",
      "api::solution-retour-experience.solution-retour-experience"
    >;
    cout_minimum: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_maximum: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    type_solution: Attribute.Enumeration<["bleue", "verte", "grise", "douce"]> &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    description_courte: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    baisse_temperature: Attribute.Decimal &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    contexte_titre: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.DefaultTo<"Pourquoi choisir cette solution ?">;
    contexte_description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    rafraichissement_attendu_description: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    logo_partenaire: Attribute.Media &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    cout_minimum_entretien: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_maximum_entretien: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    etapes_mise_en_oeuvre: Attribute.Component<
      "fiche-solution.etape-mise-en-oeuvre",
      true
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    etapes_entretien: Attribute.Component<
      "fiche-solution.etape-entretien",
      true
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    point_vigilance: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    lien_aide_territoire: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    lien_fond_vert: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    types_espace: Attribute.JSON &
      Attribute.CustomField<
        "plugin::multi-select.multi-select",
        [
          "Rond-point:rondpoint",
          "B\u00E2timent:batiment",
          "Parking:parking",
          "Rue:rue",
          "Place:place",
          "Cour d'\u00E9cole:ecole",
          "Parc et jardin:parc"
        ]
      >;
    etapes_diagnostic: Attribute.Component<
      "fiche-solution.etape-diagnostic",
      true
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    aides_regionales: Attribute.Component<
      "fiche-solution.aide-regionale",
      true
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    rank: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    materiaux: Attribute.Relation<
      "api::fiche-solution.fiche-solution",
      "manyToMany",
      "api::materiau.materiau"
    >;
    fiches_solutions_complementaires: Attribute.Relation<
      "api::fiche-solution.fiche-solution",
      "oneToMany",
      "api::fiche-solution.fiche-solution"
    >;
    cobenefices: Attribute.Relation<
      "api::fiche-solution.fiche-solution",
      "manyToMany",
      "api::cobenefice.cobenefice"
    >;
    oups: Attribute.Component<"fiche-solution.oups", true> &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    cout_entretien_description: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    delai_travaux_minimum: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    delai_travaux_maximum: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    portee_baisse_temperature: Attribute.Enumeration<
      ["air", "surface", "interieur"]
    >;
    cout_entretien_unite: Attribute.Enumeration<
      ["metreCarre", "lineaire", "metreCube", "unite"]
    >;
    en_savoir_plus: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    libelle_avantage_solution: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::fiche-solution.fiche-solution",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::fiche-solution.fiche-solution",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiMateriauMateriau extends Schema.CollectionType {
  collectionName: "materiaux";
  info: {
    singularName: "materiau";
    pluralName: "materiaux";
    displayName: "Materiau";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    titre: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    cout_minimum_fourniture: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_maximum_fourniture: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_minimum_entretien: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_maximum_entretien: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    cout_unite: Attribute.Enumeration<
      ["metreCarre", "lineaire", "metreCube", "unite"]
    > &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    fiches_solution: Attribute.Relation<
      "api::materiau.materiau",
      "manyToMany",
      "api::fiche-solution.fiche-solution"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::materiau.materiau",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::materiau.materiau",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiObjectifDeveloppementDurableObjectifDeveloppementDurable
  extends Schema.CollectionType {
  collectionName: "objectif_developpement_durables";
  info: {
    singularName: "objectif-developpement-durable";
    pluralName: "objectif-developpement-durables";
    displayName: "Objectif Developpement Durable";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    numero: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMax<{
        min: 1;
        max: 17;
      }>;
    description: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::objectif-developpement-durable.objectif-developpement-durable",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::objectif-developpement-durable.objectif-developpement-durable",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiRegionRegion extends Schema.CollectionType {
  collectionName: "regions";
  info: {
    singularName: "region";
    pluralName: "regions";
    displayName: "region";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Attribute.String & Attribute.Required & Attribute.Unique;
    nom: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::region.region",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::region.region",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiRetourExperienceRetourExperience
  extends Schema.CollectionType {
  collectionName: "retour_experiences";
  info: {
    singularName: "retour-experience";
    pluralName: "retour-experiences";
    displayName: "Retour experience";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    image_principale: Attribute.Media &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    types_solutions: Attribute.JSON &
      Attribute.CustomField<
        "plugin::multi-select.multi-select",
        ["bleue", "douce", "verte", "grise"]
      >;
    citations: Attribute.Component<"common.citation", true> &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    region: Attribute.Relation<
      "api::retour-experience.retour-experience",
      "oneToOne",
      "api::region.region"
    >;
    climat_actuel: Attribute.Enumeration<
      [
        "oceanique",
        "mediterraneen",
        "semi_aride",
        "semi_continental",
        "equatorial"
      ]
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    climat_futur: Attribute.Enumeration<
      [
        "oceanique",
        "mediterraneen",
        "semi_aride",
        "semi_continental",
        "equatorial"
      ]
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    echelle: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    temporalite: Attribute.Enumeration<
      ["court_terme", "moyen_terme", "long_terme"]
    > &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    cout: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    types_espaces: Attribute.JSON &
      Attribute.CustomField<
        "plugin::multi-select.multi-select",
        [
          "Rond-point:rondpoint",
          "B\u00E2timent:batiment",
          "Parking:parking",
          "Rue:rue",
          "Place:place",
          "Cour d'\u00E9cole:ecole",
          "Parc et jardin:parc"
        ]
      >;
    retour_experiences: Attribute.Relation<
      "api::retour-experience.retour-experience",
      "oneToMany",
      "api::retour-experience.retour-experience"
    >;
    odds: Attribute.Relation<
      "api::retour-experience.retour-experience",
      "oneToMany",
      "api::objectif-developpement-durable.objectif-developpement-durable"
    >;
    situation_avant: Attribute.Component<"retour-experience.situation"> &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    situation_apres: Attribute.Component<"retour-experience.situation"> &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    calendrier: Attribute.Component<"retour-experience.calendrier", true> &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    solution_retour_experiences: Attribute.Relation<
      "api::retour-experience.retour-experience",
      "oneToMany",
      "api::solution-retour-experience.solution-retour-experience"
    >;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    porteur: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    contact: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    financement: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    difficultes: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    partenaires: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    ressources: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    credits: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    rank: Attribute.Integer &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::retour-experience.retour-experience",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::retour-experience.retour-experience",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiSolutionRetourExperienceSolutionRetourExperience
  extends Schema.CollectionType {
  collectionName: "solution_retour_experiences";
  info: {
    singularName: "solution-retour-experience";
    pluralName: "solution-retour-experiences";
    displayName: "Solution Retour Experience";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    fiche_solution: Attribute.Relation<
      "api::solution-retour-experience.solution-retour-experience",
      "manyToOne",
      "api::fiche-solution.fiche-solution"
    >;
    retour_experience: Attribute.Relation<
      "api::solution-retour-experience.solution-retour-experience",
      "manyToOne",
      "api::retour-experience.retour-experience"
    >;
    description: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::solution-retour-experience.solution-retour-experience",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::solution-retour-experience.solution-retour-experience",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface ContentTypes {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "admin::api-token-permission": AdminApiTokenPermission;
      "admin::transfer-token": AdminTransferToken;
      "admin::transfer-token-permission": AdminTransferTokenPermission;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::content-releases.release": PluginContentReleasesRelease;
      "plugin::content-releases.release-action": PluginContentReleasesReleaseAction;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "api::aide-decision-etape.aide-decision-etape": ApiAideDecisionEtapeAideDecisionEtape;
      "api::cobenefice.cobenefice": ApiCobeneficeCobenefice;
      "api::fiche-diagnostic.fiche-diagnostic": ApiFicheDiagnosticFicheDiagnostic;
      "api::fiche-solution.fiche-solution": ApiFicheSolutionFicheSolution;
      "api::materiau.materiau": ApiMateriauMateriau;
      // eslint-disable-next-line max-len
      "api::objectif-developpement-durable.objectif-developpement-durable": ApiObjectifDeveloppementDurableObjectifDeveloppementDurable;
      "api::region.region": ApiRegionRegion;
      "api::retour-experience.retour-experience": ApiRetourExperienceRetourExperience;
      "api::solution-retour-experience.solution-retour-experience": ApiSolutionRetourExperienceSolutionRetourExperience;
    }
  }
}
