import type { CodegenConfig } from "@graphql-codegen/cli";

// Génère les types TypeScript des requêtes Strapi à partir du schéma GraphQL exporté du CMS.
// Seules les requêtes écrites avec la fonction `graphql(...)` de `@/src/generated/strapi/gql` sont prises en compte.
// Après une modification du CMS : mettre à jour `schema.graphql`, puis lancer `pnpm run strapi:codegen`.
const config: CodegenConfig = {
  overwrite: true,
  schema: "src/lib/strapi/types/schema.graphql",
  documents: ["src/lib/strapi/queries/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/generated/strapi/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
        skipIndexFile: true,
      },
      config: {
        // Les documents sont des chaînes typées (TypedDocumentString) : pas besoin de la lib `graphql` au runtime,
        // et compatibles avec `strapiGraphQLCall` qui envoie la requête sous forme de string.
        documentMode: "string",
        enumsAsTypes: true,
        useTypeImports: true,
        scalars: {
          ID: "string",
          Date: "string",
          DateTime: "string",
          Time: "string",
          Long: "number",
          I18NLocaleCode: "string",
          JSON: "unknown",
        },
      },
    },
  },
};

export default config;
