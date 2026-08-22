import { APIResponseCollection } from "@/src/lib/strapi/types/strapi-custom-types";

function removeIncompleteEntity<T extends { documentId: string }>(value: T): value is T {
  return !!value?.documentId;
}

export function safeReturnStrapiEntities<T extends { documentId: string }>(apiResponse: APIResponseCollection<T>) {
  return apiResponse?.filter(removeIncompleteEntity) || [];
}

export function safeReturnStrapiEntity<T extends { documentId: string }>(apiResponse: APIResponseCollection<T>) {
  const notNullEntities = safeReturnStrapiEntities(apiResponse);
  return notNullEntities.length > 0 ? notNullEntities[0] : null;
}
