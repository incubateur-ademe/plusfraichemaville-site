import type { Schema, Attribute } from '@strapi/strapi';

export interface CommonCitation extends Schema.Component {
  collectionName: 'components_common_citations';
  info: {
    displayName: 'citation';
    description: '';
  };
  attributes: {
    auteur: Attribute.String & Attribute.Required;
    texte: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface RetourExperienceCalendrier extends Schema.Component {
  collectionName: 'components_retour_experience_calendriers';
  info: {
    displayName: 'Calendrier';
    description: '';
  };
  attributes: {
    date: Attribute.String & Attribute.Required;
    titre: Attribute.String & Attribute.Required;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface RetourExperienceSituation extends Schema.Component {
  collectionName: 'components_retour_experience_situations';
  info: {
    displayName: 'Situation';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    description: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'common.citation': CommonCitation;
      'retour-experience.calendrier': RetourExperienceCalendrier;
      'retour-experience.situation': RetourExperienceSituation;
    }
  }
}
