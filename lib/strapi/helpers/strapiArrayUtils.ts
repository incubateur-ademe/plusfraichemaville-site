import { APIResponseCollection, APIResponseData } from "@/lib/strapi/types/types";
import type { Common } from "@strapi/strapi";

function removeNullAttributesEntity<K extends Common.UID.ContentType>(
  value: APIResponseData<K>,
): value is APIResponseData<K> {
  return !!value.attributes;
}

export function safeReturnStrapiEntities<T extends Common.UID.ContentType>(apiResponse: APIResponseCollection<T>) {
  return apiResponse?.data.filter(removeNullAttributesEntity) || [];
}

export function safeReturnStrapiEntity<T extends Common.UID.ContentType>(apiResponse: APIResponseCollection<T>) {
  return apiResponse?.data?.length > 0 ? apiResponse.data[0] : null;
}
