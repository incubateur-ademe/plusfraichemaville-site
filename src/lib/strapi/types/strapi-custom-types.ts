import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export interface APIResponseCollectionMetadata {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface APIResponseCollection<T> {
  data: T[];
  meta: APIResponseCollectionMetadata;
}
