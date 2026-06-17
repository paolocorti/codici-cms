import type { Schema, Struct } from '@strapi/strapi';

export interface CodiciSectionCodiciSection extends Struct.ComponentSchema {
  collectionName: 'components_codici_section_codici_sections';
  info: {
    displayName: 'Codici-section';
    icon: 'bulletList';
  };
  attributes: {
    picture: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface CollaborationCollaboration extends Struct.ComponentSchema {
  collectionName: 'components_collaboration_collaborations';
  info: {
    displayName: 'collaboration';
    icon: 'book';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface DiarioDiario extends Struct.ComponentSchema {
  collectionName: 'components_diario_diarios';
  info: {
    displayName: 'Diario';
    icon: 'book';
  };
  attributes: {};
}

export interface EventiSectionEventiSection extends Struct.ComponentSchema {
  collectionName: 'components_eventi_section_eventi_sections';
  info: {
    displayName: 'Eventi-section';
    icon: 'bulletList';
  };
  attributes: {};
}

export interface FeaturedEventsFeaturedEvents extends Struct.ComponentSchema {
  collectionName: 'components_featured_events_featured_events';
  info: {
    displayName: 'Featured-events';
  };
  attributes: {
    eventi: Schema.Attribute.Relation<'oneToMany', 'api::evento.evento'>;
  };
}

export interface FeaturedProjectsFeaturedProjects
  extends Struct.ComponentSchema {
  collectionName: 'components_featured_projects_featured_projects';
  info: {
    displayName: 'Featured-projects';
    icon: 'bulletList';
  };
  attributes: {};
}

export interface HowSectionHowSection extends Struct.ComponentSchema {
  collectionName: 'components_how_section_how_sections';
  info: {
    displayName: 'how-section';
    icon: 'book';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    picture: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface LinksCta extends Struct.ComponentSchema {
  collectionName: 'components_links_ctas';
  info: {
    displayName: 'cta';
  };
  attributes: {
    title: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface LinksLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    displayName: 'links';
  };
  attributes: {
    title: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ListList extends Struct.ComponentSchema {
  collectionName: 'components_list_lists';
  info: {
    displayName: 'list';
  };
  attributes: {};
}

export interface OrganizationOrganization extends Struct.ComponentSchema {
  collectionName: 'components_organization_organizations';
  info: {
    displayName: 'organization';
    icon: 'book';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ProdottiSectionProdottiSection extends Struct.ComponentSchema {
  collectionName: 'components_prodotti_section_prodotti_sections';
  info: {
    displayName: 'Prodotti-section';
    icon: 'bulletList';
  };
  attributes: {
    picture: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface ProjectSectionProjectSection extends Struct.ComponentSchema {
  collectionName: 'components_project_section_project_sections';
  info: {
    displayName: 'Project-section';
    icon: 'bulletList';
  };
  attributes: {
    picture: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface RicercheSectionRicercheSection extends Struct.ComponentSchema {
  collectionName: 'components_ricerche_section_ricerche_sections';
  info: {
    displayName: 'Ricerche-section';
  };
  attributes: {};
}

export interface SectionSection extends Struct.ComponentSchema {
  collectionName: 'components_section_sections';
  info: {
    displayName: 'section';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    picture: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ServiceService extends Struct.ComponentSchema {
  collectionName: 'components_service_services';
  info: {
    displayName: 'Service';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface SuggestionSuggestion extends Struct.ComponentSchema {
  collectionName: 'components_suggestion_suggestions';
  info: {
    displayName: 'Suggestion';
    icon: 'attachment';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface WhatSectionWhatSection extends Struct.ComponentSchema {
  collectionName: 'components_what_section_what_sections';
  info: {
    displayName: 'what-section';
    icon: 'book';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    picture: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'codici-section.codici-section': CodiciSectionCodiciSection;
      'collaboration.collaboration': CollaborationCollaboration;
      'diario.diario': DiarioDiario;
      'eventi-section.eventi-section': EventiSectionEventiSection;
      'featured-events.featured-events': FeaturedEventsFeaturedEvents;
      'featured-projects.featured-projects': FeaturedProjectsFeaturedProjects;
      'how-section.how-section': HowSectionHowSection;
      'links.cta': LinksCta;
      'links.links': LinksLinks;
      'list.list': ListList;
      'organization.organization': OrganizationOrganization;
      'prodotti-section.prodotti-section': ProdottiSectionProdottiSection;
      'project-section.project-section': ProjectSectionProjectSection;
      'ricerche-section.ricerche-section': RicercheSectionRicercheSection;
      'section.section': SectionSection;
      'service.service': ServiceService;
      'suggestion.suggestion': SuggestionSuggestion;
      'what-section.what-section': WhatSectionWhatSection;
    }
  }
}
