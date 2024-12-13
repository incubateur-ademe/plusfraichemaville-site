import { APIResponseCollection } from "@/src/lib/strapi/types/strapi-custom-types";

function removeNullAttributesEntity<T extends { attributes: any }>(
  value: T,
): value is T {
  return !!value.attributes;
}

export function safeReturnStrapiEntities<T extends { attributes: any }>(apiResponse: APIResponseCollection<T>) {
  return apiResponse?.data.filter(removeNullAttributesEntity) || [];
}

export function safeReturnStrapiEntity<T extends { attributes: any }>(apiResponse: APIResponseCollection<T>) {
  const notNullEntities = safeReturnStrapiEntities(apiResponse);
  return notNullEntities.length > 0 ? notNullEntities[0] : null;
}
