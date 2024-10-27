import type { Schema, Attribute } from "@strapi/strapi";

export interface CommonCitation extends Schema.Component {
  collectionName: "components_common_citations";
  info: {
    displayName: "citation";
    description: "";
  };
  attributes: {
    auteur: Attribute.String & Attribute.Required;
    texte: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
  };
}

export interface FicheDiagnosticEtapeMiseEnOeuvre extends Schema.Component {
  collectionName: "components_fiche_diagnostic_etape_mise_en_oeuvres";
  info: {
    displayName: "Etape_mise_en_oeuvre";
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
  };
}

export interface FicheSolutionAideRegionale extends Schema.Component {
  collectionName: "components_fiche_solution_aide_regionales";
  info: {
    displayName: "aide_regionale";
    description: "";
  };
  attributes: {
    region: Attribute.Relation<"fiche-solution.aide-regionale", "oneToOne", "api::region.region">;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    titre: Attribute.String;
  };
}

export interface FicheSolutionEtapeDiagnostic extends Schema.Component {
  collectionName: "components_fiche_solution_etape_diagnostics";
  info: {
    displayName: "etape_diagnostic";
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
  };
}

export interface FicheSolutionEtapeEntretien extends Schema.Component {
  collectionName: "components_fiche_solution_etape_entretiens";
  info: {
    displayName: "etape_entretien";
    description: "";
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
  };
}

export interface FicheSolutionEtapeMiseEnOeuvre extends Schema.Component {
  collectionName: "components_fiche_solution_etape_mise_en_oeuvres";
  info: {
    displayName: "etape_mise_en_oeuvre";
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
  };
}

export interface FicheSolutionOups extends Schema.Component {
  collectionName: "components_fiche_solution_oups";
  info: {
    displayName: "oups";
    description: "";
  };
  attributes: {
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
    titre: Attribute.Text & Attribute.Required;
    solutions_reparatrices: Attribute.Relation<
      "fiche-solution.oups",
      "oneToMany",
      "api::fiche-solution.fiche-solution"
    >;
  };
}

export interface RetourExperienceCalendrier extends Schema.Component {
  collectionName: "components_retour_experience_calendriers";
  info: {
    displayName: "Calendrier";
    description: "";
  };
  attributes: {
    date: Attribute.String & Attribute.Required;
    titre: Attribute.String & Attribute.Required;
    description: Attribute.RichText &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
  };
}

export interface RetourExperienceSituation extends Schema.Component {
  collectionName: "components_retour_experience_situations";
  info: {
    displayName: "Situation";
    description: "";
  };
  attributes: {
    image: Attribute.Media<"images" | "files" | "videos" | "audios">;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        "plugin::ckeditor.CKEditor",
        {
          output: "HTML";
          preset: "light";
        }
      >;
  };
}

export interface RetourExperienceSourcing extends Schema.Component {
  collectionName: "components_retour_experience_sourcings";
  info: {
    displayName: "Sourcing";
    icon: "phone";
    description: "";
  };
  attributes: {
    label: Attribute.String;
    telephone: Attribute.String;
    type_de_contact: Attribute.Enumeration<
      ["Public et parapublic", "Entreprises et agences", "Conseil", "Recherche et enseignement"]
    >;
    sous_type_de_contact: Attribute.Enumeration<
      [
        "Bureau d\u2019\u00E9tude",
        "Assistance \u00E0 maitrise d\u2019ouvrage",
        "Association",
        "P\u00F4le universitaire",
        "Laboratoire de recherche",
        "Agence d\u2019architecture",
        "Entreprise priv\u00E9e",
        "Agence paysagiste",
        "Syndicat mixte",
        "Collectif",
        "Am\u00E9nageur",
        "Agence de l\u2019eau",
        "CAUE",
        "Conseil en ing\u00E9nierie",
        "Agence de conception lumi\u00E8re",
        "Agence de communication",
        "Syndic de copropri\u00E9t\u00E9",
        "Soci\u00E9t\u00E9 d\u2019arboriculture",
        "Acteur public et parapublic",
        "Bailleur social",
        "Institut",
      ]
    >;
    email: Attribute.Email;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "common.citation": CommonCitation;
      "fiche-diagnostic.etape-mise-en-oeuvre": FicheDiagnosticEtapeMiseEnOeuvre;
      "fiche-solution.aide-regionale": FicheSolutionAideRegionale;
      "fiche-solution.etape-diagnostic": FicheSolutionEtapeDiagnostic;
      "fiche-solution.etape-entretien": FicheSolutionEtapeEntretien;
      "fiche-solution.etape-mise-en-oeuvre": FicheSolutionEtapeMiseEnOeuvre;
      "fiche-solution.oups": FicheSolutionOups;
      "retour-experience.calendrier": RetourExperienceCalendrier;
      "retour-experience.situation": RetourExperienceSituation;
      "retour-experience.sourcing": RetourExperienceSourcing;
    }
  }
}
