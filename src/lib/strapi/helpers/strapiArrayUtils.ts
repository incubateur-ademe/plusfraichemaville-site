import { APIResponseCollection } from "@/src/lib/strapi/types/strapi-custom-types";

type MaybeStrapiCollection<T> = APIResponseCollection<T | null | undefined> | null | undefined;

function removeIncompleteEntity<T extends { documentId: string }>(value: T | null | undefined): value is T {
  return !!value?.documentId;
}

export function safeReturnStrapiEntities<T extends { documentId: string }>(apiResponse: MaybeStrapiCollection<T>): T[] {
  return apiResponse?.filter(removeIncompleteEntity) || [];
}

export function safeReturnStrapiEntity<T extends { documentId: string }>(apiResponse: MaybeStrapiCollection<T>) {
  const notNullEntities = safeReturnStrapiEntities(apiResponse);
  return notNullEntities.length > 0 ? notNullEntities[0] : null;
}
