/* eslint-disable */
import * as types from './graphql';
import { GetAllChartesDocument } from "./graphql";



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetAllChartes($status: PublicationStatus, $retourExperienceFilters: RetourExperienceFiltersInput) {\n    chartes(status: $status) {\n      documentId\n      nom_collectivite\n      annee_signature\n      departement {\n        documentId\n        code\n        nom\n      }\n      retour_experiences(filters: $retourExperienceFilters) {\n        documentId\n        slug\n        titre\n      }\n    }\n  }\n": typeof types.GetAllChartesDocument,
};
const documents: Documents = {
    "\n  query GetAllChartes($status: PublicationStatus, $retourExperienceFilters: RetourExperienceFiltersInput) {\n    chartes(status: $status) {\n      documentId\n      nom_collectivite\n      annee_signature\n      departement {\n        documentId\n        code\n        nom\n      }\n      retour_experiences(filters: $retourExperienceFilters) {\n        documentId\n        slug\n        titre\n      }\n    }\n  }\n": types.GetAllChartesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: string): typeof import('./graphql').GetAllChartesDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
