// Strapi v5 GraphQL flat responses: a collection query returns the array of entities directly,
// with no `data`/`meta` wrapper (see https://docs.strapi.io/cms/api/graphql).
export type APIResponseCollection<T> = T[];
